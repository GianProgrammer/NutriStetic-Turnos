import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// --- Helper para secretos ---
const BASE_SECRET_PATH = "/run/secrets";

function getSecret(secretName) {
  const secretPath = path.join(BASE_SECRET_PATH, secretName);
  if (fs.existsSync(secretPath)) {
    return fs.readFileSync(secretPath, "utf-8").trim();
  }
  return null;
}

// --- Funciones para pipeline modular ---
function setSecretConfig(values, prefix = "") {
  for (const key of Object.keys(values)) {
    const secretName = `${prefix}${key.toLowerCase()}`;
    const val = getSecret(secretName);
    if (val) values[key] = val;
  }
  console.log("Valores después de buscar secretos:", values);
}

function setEnvVars(values) {
  for (const key of Object.keys(values)) {
    if (process.env[key]) values[key] = process.env[key];
  }
  console.log("Valores después de variables de entorno:", values);
}

function setDotenvConfig(values, envMode = "dev") {
  const envFile = fs.existsSync(`.env.${envMode}`)
    ? `.env.${envMode}`
    : ".env";

  if (fs.existsSync(envFile)) {
    const envConfig = dotenv.parse(fs.readFileSync(envFile));
    for (const key of Object.keys(values)) {
      if (!values[key] && envConfig[key]) {
        values[key] = envConfig[key];
      }
    }
  }
  console.log("Valores después de dotenv:", values);
}

// --- Pipeline definido ---
const PIPELINES = {
  dev: ["env_file", "env_vars", "secrets"],
  default: ["secrets", "env_vars", "env_file"],
};

const FUNCTIONS = {
  secrets: setSecretConfig,
  env_vars: setEnvVars,
  env_file: setDotenvConfig,
};

// --- Loader ---
function loadSettings() {
  const values = {
    ENV: "",
    SECRET_PREFIX: "",
    API_HOST: "",
    API_PORT: "",
  };

  const envMode = (process.env.ENV || "dev").toLowerCase();
  const prefix = process.env.SECRET_PREFIX || "";

  for (const source of PIPELINES[envMode] || PIPELINES.default) {
    if (source === "secrets") {
      FUNCTIONS[source](values, prefix);
    } else if (source === "env_file") {
      FUNCTIONS[source](values, envMode);
    } else {
      FUNCTIONS[source](values);
    }
  }

  return values;
}

// --- Singleton cacheado ---
let cachedSettings = null;
export function getSettings() {
  if (!cachedSettings) {
    const loaded = loadSettings();
    cachedSettings = { ...loaded };
  }
  return cachedSettings;
}

// --- Ejemplo ---
// if (import.meta.url === `file://${process.argv[1]}`) {
//   console.log(getSettings());
// }
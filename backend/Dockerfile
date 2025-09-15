FROM node:22-alpine

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

RUN npm install -g nodemon

# Copiar el resto del código
COPY . .

# Exponer el puerto donde corre la API (ej: 5000)
EXPOSE 5000

# Comando por defecto
CMD ["nodemon", "server"]
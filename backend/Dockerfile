FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos
COPY . .

# Variables de entorno
ENV PORT=5000
ENV HOST=0.0.0.0

# Exponer puerto 5000
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]

FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install   # ✅ instalamos todas las dependencias (incluidas devDependencies)
COPY . .

EXPOSE 3000
CMD ["npm", "start"]   # ✅ arrancamos con start (node index.js), no con nodemon

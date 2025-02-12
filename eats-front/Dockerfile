# Etapa 1: Construção da aplicação
FROM node:22 AS build

WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src  # Copia a pasta src para dentro do container

# Compila a aplicação Angular
RUN npm run build --prod

# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:alpine

# Copia os arquivos de build para a pasta do Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando de entrada
CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN adduser -S -G wheel appuser
USER appuser

ENV PATH /app/node_modules/.bin:$PATH

RUN ls -l /app/node_modules/.bin/ng  # Verificação (Mantenha esta linha)
RUN which ng                      # Verificação (Mantenha esta linha)

RUN ng build

FROM nginx:alpine

COPY --from=build /app/dist/eats-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

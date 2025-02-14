# Etapa de build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa final (imagem mais leve)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/eats-payments-1.0.jar app.jar

EXPOSE 1099
CMD ["java", "-jar", "/app/app.jar"]

FROM eclipse-temurin:17-jdk-alpine AS build

COPY order-api/pom.xml ./
COPY order-api/mvnw ./
COPY order-api/.mvn .mvn

COPY order-api/src ./src

RUN chmod +x ./mvnw

RUN ./mvnw clean install -DskipTests

FROM eclipse-temurin:17-jdk-alpine

COPY --from=build /target/order-api-0.0.1.jar /target/order-api-0.0.1.jar

EXPOSE 9000

ENTRYPOINT ["java","-jar","target/order-api-0.0.1.jar"]
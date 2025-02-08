FROM eclipse-temurin:17-jdk-alpine AS build

COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn

COPY src ./src

RUN chmod +x ./mvnw

RUN ./mvnw clean install -DskipTests

FROM eclipse-temurin:17-jdk-alpine

COPY --from=build /target/demo-0.0.1.jar /target/demo-0.0.1.jar

EXPOSE 9000

ENTRYPOINT ["java","-jar","target/demo-0.0.1.jar"]
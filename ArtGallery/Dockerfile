FROM eclipse-temurin:25-jdk AS build

WORKDIR /app

COPY mvnw ./
COPY .mvn/ .mvn/
COPY pom.xml ./
COPY src/ src/

RUN chmod +x mvnw && ./mvnw -B clean package -DskipTests

FROM eclipse-temurin:25-jre

WORKDIR /app
COPY --from=build --chown=10001:10001 /app/target/*.jar app.jar

USER 10001:10001
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

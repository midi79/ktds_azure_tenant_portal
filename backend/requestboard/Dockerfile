# Use a Gradle base image with Java 21 for building the application
FROM gradle:8.13.0-jdk21-ubi AS builder

WORKDIR /app

# Copy build.gradle and settings.gradle for dependency resolution
COPY build.gradle settings.gradle ./

# Copy the source code
COPY src ./src

# Download dependencies and build the application
RUN gradle build -x test --no-daemon

# Use a lightweight Java runtime image with Java 21 for the final image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Copy the dev properties file
COPY src/main/resources/application-dev.properties /app/application-dev.properties

# Expose the application port
EXPOSE 8090

# Run the application with the dev profile
ENTRYPOINT ["java", "-jar", "/app/app.jar", "--spring.config.location=file:/app/application-dev.properties"]
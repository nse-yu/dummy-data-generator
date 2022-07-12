# syntax=docker/dockerfile:1
FROM amazoncorretto:18-alpine3.14-jdk
WORKDIR /back
COPY .mvn ./.mvn
COPY mvnw pom.xml ./
COPY src ./src
CMD ["./mvnw","spring-boot:run","-Dspring-boot.run.profiles=mysql","-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000'"]
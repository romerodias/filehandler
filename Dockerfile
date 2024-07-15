FROM openjdk:17-jdk-slim

RUN mkdir -p /opt/app/

COPY ./target/filehandler-*.jar /opt/app/app.jar
COPY ./src/main/resources/ /src/main/resources/

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar" , "/opt/app/app.jar"]
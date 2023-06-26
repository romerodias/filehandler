FROM centos
RUN yum -y update && yum install -y java-11 && yum install -y epel-release && yum groupinstall -y "fonts"
RUN mkdir -p /opt/app/

COPY ./target/filehandler-*.jar /opt/app/app.jar
COPY ./src/main/resources/ /src/main/resources/

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar" , "/opt/app/app.jar"]

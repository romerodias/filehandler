FROM centos
RUN yum -y update && yum install -y java-11 && yum install -y epel-release && yum groupinstall -y "fonts"
#RUN yum -y update && yum install -y wget && wget http://www.itzgeek.com/msttcore-fonts-2.0-3.noarch.rpm && rpm -Uvh msttcore-fonts-2.0-3.noarch.rpm

RUN mkdir -p /opt/app/
RUN mkdir -p /src/main/resources/relatorios

COPY ./target/filehandler-*.jar /opt/app/app.jar
COPY ./src/main/resources/ /src/main/resources/

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar" , "/opt/app/app.jar"]

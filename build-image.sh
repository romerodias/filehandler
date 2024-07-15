#!/bin/bash
set -x #echo on

#git tag -a 1.0.0 -m "descrição da versãogt"
#mvn versions:set -DnewVersion=$(git describe --tags --abbrev=0)
#mvn clean install -DskipTests
#docker build . -t romerodias/scd:$(git describe --tags --abbrev=0)
#docker login --username=romerodias --password=manuw2ktp
#docker push romerodias/scd:$(git describe --tags --abbrev=0)


export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
#mvn versions:set -DnewVersion=$(git describe --tags --abbrev=0)


project_version=$(mvn -q -Dexec.executable=echo -Dexec.args='${project.version}' --non-recursive exec:exec)
commit_message=$(git show -s --format=%s)
git tag -a "$project_version" -m "$commit_message"
mvn -Dproject.build.sourceEncoding=UTF-8 -Dproject.reporting.outputEncoding=UTF-8 clean install -DskipTests


docker rmi $(docker images  'romerodias/filehandler' -a -q)  -f
docker build . -t romerodias/filehandler:$project_version
docker login --username=romerodias --password=manuw2ktp
docker push romerodias/filehandler:$project_version
#!/bin/bash
set -x #echo on

#git tag -a 1.0.0 -m "descrição da versãogt"
#mvn versions:set -DnewVersion=$(git describe --tags --abbrev=0)
#mvn clean install -DskipTests
#docker build . -t romerodias/scd:$(git describe --tags --abbrev=0)
#docker login --username=romerodias --password=manuw2ktp
#docker push romerodias/scd:$(git describe --tags --abbrev=0)



#mvn versions:set -DnewVersion=$(git describe --tags --abbrev=0)


project_version=$(mvn -q -Dexec.executable=echo -Dexec.args='${project.version}' --non-recursive exec:exec)
commit_message=$(git show -s --format=%s)
git tag -a "$project_version" -m "$commit_message"
mvn -Dproject.build.sourceEncoding=UTF-8 -Dproject.reporting.outputEncoding=UTF-8 clean install -DskipTests
docker build . -t romerodias/rdged:$project_version
#docker login --username=romerodias --password=manuw2ktp
#docker push romerodias/rdged:$project_version
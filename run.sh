#!/bin/bash
set -x #echo on

export BASE_PATH=/home/dados/grupos/ENGENHARIA/
export DB_PASSWORD=sainfo123
export DB_URL=jdbc:mysql://127.0.0.1:3306/rdged
export DB_USERNAME=root
export LDAP_DN_PATTERNS=uid={0},ou=usuarios
export LDAP_SEARCH_BASE=dc\=id
  export LDAP_URL=ldap://10.10.10.29:389/dc\=id

java -jar filehandler.jar &
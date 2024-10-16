

Variáveis de Ambiente

DB_URL=jdbc:mysql://127.0.0.1:3306/documentos;
DB_USERNAME=scd
DB_PASSWORD=sa_info_123_scd

https://github.com/osixia/docker-openldap

https://gist.github.com/thomasdarimont/d22a616a74b45964106461efb948df9c
cn=admin,dc=example,dc=org
admin

# List all Users
ldapsearch -H ldap://localhost:389 -x -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w admin


# Request StartTLS
ldapsearch -H ldap://localhost:10389 -Z -x -b "ou=people,dc=planetexpress,dc=com" -D "cn=admin,dc=planetexpress,dc=com" -w GoodNewsEveryone "(objectClass=inetOrgPerson)"

# Enforce StartTLS
ldapsearch -H ldap://localhost:10389 -ZZ -x -b "ou=people,dc=planetexpress,dc=com" -D "cn=admin,dc=planetexpress,dc=com" -w GoodNewsEveryone "(objectClass=inetOrgPerson)"

# Enforce StartTLS with self-signed cert
LDAPTLS_REQCERT=never ldapsearch -H ldap://localhost:10389 -ZZ -x -b "ou=people,dc=planetexpress,dc=com" -D "cn=admin,dc=planetexpress,dc=com" -w GoodNewsEveryone "(objectClass=inetOrgPerson)"




# JDBC Authentication
-- Criar Perfil
INSERT IGNORE INTO LOGIN_PERFIL (NOME) VALUES ('Administrador');

-- Criar Papel (ROLE)
INSERT IGNORE INTO LOGIN_PAPEL (CODIGO, NOME) VALUES ('ADM', 'Administrador');

-- Vincular o Perfil ao Papel
INSERT IGNORE INTO LOGIN_PERFIL_PAPEL (IDPERFIL, IDPAPEL)
SELECT
(SELECT ID FROM LOGIN_PERFIL WHERE NOME = 'Administrador'),
ID
FROM LOGIN_PAPEL
;

-- Inserir usuárip
INSERT IGNORE INTO LOGIN_USUARIO (active, NOME, SENHA, IDPERFIL) VALUES
(1, 'carolayne', '{noop}pconsul1874', 
  (SELECT ID FROM LOGIN_PERFIL WHERE NOME = 'Administrador')
);



# Compile

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
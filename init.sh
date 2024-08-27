#!/bin/sh

envsubst < /docker-entrypoint-initdb.d/init.sql.template | mysql -u "$MARIADB_USER" -p"$MARIADB_PASSWORD"
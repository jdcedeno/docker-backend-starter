#!/bin/sh
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until mysql -u "$MARIADB_USER" -p"$MARIADB_PASSWORD" -h mariadb "$MARIADB_DATABASE" -e 'SELECT 1'; do
  >&2 echo "MariaDB is unavailable - sleeping"
  sleep 1
done

>&2 echo "MariaDB is up - executing command"
exec $cmd

#!/bin/sh

echo "Waiting for postgres..."

if [ "$POSTGRES_PORT" = "5432" ];
then
    while ! nc -z $SQL_HOST $SQL_PORT; do
    sleep 0.1
done
fi

echo "PostgreSQL started"

python manage.py migrate

exec "$@"
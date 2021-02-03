DB_CONTAINER=db
DB_NAME=test_db
DB_USER=root
LOCAL_DUMP_PATH="./db_dump"

docker-compose up -d "${DB_CONTAINER}"
docker-compose exec -T "${DB_CONTAINER}"  pg_restore --clean --no-acl --no-owner -U "${DB_USER}" -d "${DB_NAME}" < "${LOCAL_DUMP_PATH}"
# docker-compose stop "${DB_CONTAINER}"
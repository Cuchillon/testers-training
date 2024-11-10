CREATE TYPE IF NOT EXISTS "JSONB" as json;

CREATE TABLE IF NOT EXISTS user_data (
    id bigserial,
    created_at varchar(255),
    modified_at varchar(255),
    user_id varchar(255) UNIQUE NOT NULL,
    stats JSONB NOT NULL,
    primary key (id)
);
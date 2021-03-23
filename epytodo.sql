USE db;

CREATE TABLE user (
    id int,
    email varchar(255),
    password varchar(255),
    name varchar(255),
    firstname varchar(255),
    create_at varchar(255)
);

CREATE TABLE todo (
    id int,
    title varchar(255),
    descritpion varchar(1023),
    create_at varchar(255),
    due_time varchar(255),
    status varchar(255),
    user_id int
);

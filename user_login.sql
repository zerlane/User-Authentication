CREATE DATABASE if not exists user_login;

USE user_login;

CREATE TABLE if not exists user_info (
	user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
	email varchar(50) NOT NULL,
    username varchar(10) NOT NULL,
    password varchar(75) NOT NULL,
    created_at timestamp default CURRENT_TIMESTAMP NOT NULL
);

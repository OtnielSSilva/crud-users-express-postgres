create database mercurio;

create table if not exists users(
	id SERIAL primary key,
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

CREATE DATABASE admindashboard

CREATE TABLE "user"(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50) NOT NULL,
  gender VARCHAR(12),
  password VARCHAR(150),
  role VARCHAR(20),
  groupId VARCHAR REFERENCES groups(id),
  UNIQUE(email)
);

CREATE TABLE "groups" (
  id VARCHAR(150) PRIMARY KEY,
  groupName VARCHAR(255) NOT NULL,
  members JSONB[]
);

CREATE TABLE "resetpasswordid"(
  id VARCHAR(300) PRIMARY KEY,
  status VARCHAR(15)
)

CREATE TABLE "shops"(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC(4) NOT NULL
)

CREATE TABLE "transactions" (
  id BIGSERIAL PRIMARY KEY,
  itemId BIGINT REFERENCES shops(id),
  price NUMERIC(4) NOT NULL,
  userId BIGINT REFERENCES "user"(id),
  createdAt DATE
);
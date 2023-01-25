CREATE DATABASE IF NOT EXISTS `cmsexpressjs`;
CREATE USER IF NOT EXISTS 'cms-expressjs'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Exampledb#2023';
GRANT ALL ON `cms-expressjs`.* TO 'cms-expressjs'@'localhost';
USE `cmsexpressjs`;

/*
	Create Necesscary Table for your initial project!
*/
CREATE TABLE IF NOT EXISTS `categories` (
	`id` varchar(55) NOT NULL UNIQUE,
	`name` varchar(55) NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
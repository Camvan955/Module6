
CREATE DATABASE `sprint2`;

USE `sprint2`;

CREATE TABLE `sprint2`.`account` (
  `id_account` INT auto_increment NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `encrypt_password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `usename` VARCHAR(45) NOT NULL,
  `flag_delete` TINYINT NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_account`));
  
  CREATE TABLE `sprint2`.`role` (
  `id_role` INT auto_increment NOT NULL,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`));

CREATE TABLE  `sprint2`.`account_role` (
  `id_account_role` INT auto_increment NOT NULL,
  `id_role` INT,
  `id_account` INT,
  FOREIGN KEY(id_role) REFERENCES `role`(id_role),
  FOREIGN KEY(id_account) REFERENCES `account`(id_account),
  PRIMARY KEY (`id_account_role`));

  
  CREATE TABLE `sprint2`.`customer` (
  `id_customer` INT auto_increment NOT NULL,
  `address` VARCHAR(45),
  `email` VARCHAR(45),
  `flag_delete` BIT,
  `name_customer` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `id_account` int,
  foreign key(id_account) references account(id_account),
  PRIMARY KEY (`id_customer`));
  
  CREATE TABLE `sprint2`.`category` (
  `id_category` INT NOT NULL,
  `name_category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category`));
  
  CREATE TABLE `sprint2`.`unit` (
  `id_unit` INT NOT NULL,
  `name_unit` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_unit`));

  CREATE TABLE `sprint2`.`origin` (
  `id_origin` INT NOT NULL,
  `name_origin` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_origin`));
  
  CREATE TABLE `sprint2`.`product` (
  `id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `name_product` VARCHAR(45) NOT NULL,
  `origin` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `promotional_price` VARCHAR(45) NOT NULL,
  `image` varchar(45),
  `id_category` int,
  `id_unit` int,
  `id_origin` int ,
  foreign key(`id_category`) references category(`id_category`),
  foreign key(`id_unit`) references unit(`id_unit`),
  foreign key(`id_origin`) references origin(`id_origin`),
  PRIMARY KEY (`id`));
  
  CREATE TABLE `sprint2`.`order` (
  id_order INT auto_increment NOT NULL PRIMARY KEY,
  code_order varchar(45),
  day_order varchar(45),
  flag_delete BIT,
  id int,
  id_customer int,
  delivery_status varchar(45),
  foreign key(`id_customer`) references customer(`id_customer`)
  );
  
  CREATE TABLE `sprint2`.`order_detail`(
  id_order_detail int auto_increment primary key,
  amount int,
  id int,
  id_order int,
  foreign key(`id`) references product(`id`),
  foreign key(`id_order`) references `order`(`id_order`)
  );
  
  CREATE TABLE `sprint2`.`employee` (
  `id_employee` int auto_increment primary key,
  `name_employee` varchar(45),
  `gender` bit,
  `id_card`int,
  `phone_employee` varchar(45),
  `address_employee` varchar(45),
  `flag_delete` BIT,
  `date_of_birth` varchar(45),
  `id_account` int,
  foreign key(`id_account`) references account(`id_account`)
  );

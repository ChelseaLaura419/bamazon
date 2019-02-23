DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Shampoo', 'Cosmetics', 5.75, 500),
		    ('Conditioner', 'Cosmetics', 6.25, 627),
		    ('Trash Bags', 'Grocery', 5.99, 300),
		    ('Paper Towels', 'Grocery', 4.25, 400),
		    ('Zucchini', 'Produce', 0.85, 800),
		    ('Avacado', 'Produce', 1.20, 1000),
		    ('Chicken Breast', 'Meat', 4.45, 267),
		    ('Cream Cheese', 'Dairy', 1.75, 476),
		    ('Milk', 'Dairy', 2.50, 423),
		    ('Chocolate Cake', 'Bakery', 12.75, 50)
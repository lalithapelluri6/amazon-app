CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL UNIQUE,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL
);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1001,"Camera","electronics",1500.0,100);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1002,"Blenders","kitchen",180.0,75);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1003,"Aveeno baby","Baby",45.0,200);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1004,"Backpacks","Luggage&Handbags",70.0,100);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1005,"Notebooks&Notepads","Office products",1500.0,150);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1006,"Fragrances","Beauty",45.0,100);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1007,"Sofas","Living Room",2000.0,50);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1008,"Chandeliars","Home Improvement",130.0,75);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1009,"Dietary Supplements","Health",40.0,200);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES (1010,"Gift Baskets","Gifts",50.0,200);



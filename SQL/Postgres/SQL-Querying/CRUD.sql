INSERT INTO products (name, price, can_be_returned)
VALUES
('chair', 44.00, false);


INSERT INTO products (name, price, can_be_returned)
VALUES
('stool', 25.99, true);


INSERT INTO products (name, price, can_be_returned)
VALUES
('table', 124.00, false);


SELECT *
FROM products p;


SELECT p.name
FROM products p;


SELECT p.name, p.price 
FROM products p;


INSERT INTO products (name, price, can_be_returned)
VALUES
('ladder', 49.99, true);


SELECT *
FROM products p
WHERE p.can_be_returned;


SELECT *
FROM products p
WHERE p.price < 44.00;


SELECT *
FROM products p
WHERE p.price > 22.50 
AND p.price < 99.99;


UPDATE products
SET price = (price - 20.00));


DELETE FROM products
WHERE price < 25.00;


UPDATE products
SET price = price + 20.00;


UPDATE products
SET can_be_returned = true;
create database bamazon_db;

use bamazon_db;

create table products (
item_id integer auto_increment not null,
product_name varchar(111) not null,
department_name varchar(77) null,
price decimal(8,2) not null,
stock_quantity integer not null,
primary key(item_id)
)

select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values ("Gaming Chair", "Furniture", 200, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("Office Chair", "Furniture", 149.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("Kitchen Faucet", "Plumbing", 229.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("90-Degree ABS Elbow Fitting", "Plumbing", 1.79, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("Front Load Washer", "Appliances", 1149.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("Top Load Washer", "Appliances", 767.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("Natural Fiber Area Rug", "Flooring", 259.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("5-in Oak Hardwood", "Flooring", 3.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("21-in Gas Push Lawn Mower", "Outdoor", 199.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values ("10ft x 10ft Wood Storage Shed", "Outdoor", 1299.99, 100);

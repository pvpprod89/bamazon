var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showProducts();
  // connection.end();
});

function showProducts() {
  var query = "Select * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(
        "Product ID: " +
          res[i].item_id +
          " || Product Name: " +
          res[i].product_name +
          " || Department Name: " +
          res[i].department_name +
          " || Price: $" +
          res[i].price
      );
    }

    // User Requests for product and qty to purchase.
    requestProduct();
  });
}

// -----------------------------------------------

function requestProduct() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message:
          "\n\nPlease enter product ID of the product you want to purchase."
      },
      {
        name: "productUnits",
        type: "input",
        message: "Please enter Qty you needed."
      }
    ])
    .then(function(answer) {
      var query = "Select * FROM products WHERE ?";
      connection.query(query, { item_id: answer.productID }, function(
        err,
        res
      ) {
        if (err) throw err;
        // console.log(res[0]);
        var available_stock = res[0].stock_quantity;
        // console.log(available_stock);
        var price_per_unit = res[0].price;
        var productName = res[0].product_name;
        var productDepartment = res[0].department_name;

        // Checks if there is enough items in stock to process the order.
        if (available_stock >= answer.productUnits) {
          console.log(
            "\n\n--------------------------------\nYour Order is as below: " +
              "\nProduct ID: " +
              answer.productID,
            "\nProduct Name: " + productName,
            "\nDepartment: " + productDepartment,
            "\nUnit Price: $" + price_per_unit,
            "\nQty: " + answer.productUnits
            // "\nAvailable Stock: " + available_stock
          );

          var updatedStockQuantity = available_stock - answer.productUnits;
          var totalPrice = price_per_unit * answer.productUnits;
          var query = "UPDATE products SET ? WHERE ?";
          connection.query(
            query,
            [
              {
                stock_quantity: updatedStockQuantity
              },
              {
                item_id: answer.productID
              }
            ],
            function(err, res) {
              if (err) throw err;

              console.log("\n\nThank you, your purchase is complete.");

              console.log(
                "Total Amount: $" +
                  totalPrice +
                  "\n\n--------------------------------"
              );

              // shows products for user to make a new selection.
              showProducts();
              // connection.end();
            }
          );
        } else {
          // Tells user there isn't enough stock left.
          console.log(
            "\n\nSorry, Insufficient quantity! Please check different product."
          );

          // It will allow user to request a new product.
          requestProduct();
        }
      });
    });
}

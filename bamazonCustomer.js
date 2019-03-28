var mysql = require("mysql");

console.log("test");
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    user: "root",

    // password
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    productsonSale();
});

function productsonSale() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

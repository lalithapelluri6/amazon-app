var mysql = require("mysql");
var inquirer = require("inquirer");

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
    managerInput();
});

function managerInput() {
    inquirer.prompt([{
        type: 'list',
        name: 'input',
        message: 'What would you like to do?',
        choices:["1) View Products for Sale","2) View Low Inventory","3) Add to Inventory","4) Add New Product"]
    }]).then(function(answer){
        if(answer.input === '1) View Products for Sale'){
            connection.query('SELECT * FROM products', function(err,res){
                if(err) throw err;
                console.log('');
                console.log("-----------------ITEMS IN STORE------------------");
                for(var i=0; i<res.length; i++){
                    console.log("ITEM_ID:" + res[i].id);
                    console.log("Product_Nane:" + res[i].name);
                    console.log("price:" + '$' + res[i].price);
                    console.log("Quantity in Stock:" + res[i].stock_quantity);
                }
                console.log('');
                newTransaction();
            })
    }
        else if(answer.input === '2) View Low Inventory') {
            connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err,res){
                if(err) throw err;
                console.log('');
                console.log("-----------------ITEMS IN STORE------------------");
                for(var i=0; i<res.length; i++){
                    console.log("ITEM_ID:" + res[i].id);
                    console.log("Product_Nane:" + res[i].name);
                    console.log("price:" + '$' + res[i].price);
                    console.log("Quantity in Stock:" + res[i].stock_quantity);
                }
                console.log('');
                newTransaction();
            })
            }
        else if(answer.input === '3) Add to Inventory') {
            inquirer.prompt([{
                name: 'item',
                message: 'Enter the ID of the item you wish to update:',
                validate: function(value){
                    var valid = value.match(/^[0-9]+$/)
                    if(valid){
                        return true
                    }
                    return 'Please enter a numerical value'
                }
            },{
                name: 'number',
                message: 'How many items would you like to add to the current supply?',
                validate: function(value){
                    var valid = value.match(/^[0-9]+$/)
                    if(valid){
                        return true
                    }
                    return 'Please enter a numerical value';
                }
            }]).then(function(answer) {
                connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, res){
                connection.query('UPDATE products SET ? WHERE ?', [{
                    StockQuantity: res[0].StockQuantity + parseInt(answer.number)
                }, {
                    id: answer.item
                }], function(err, res){});
                });
                console.log('Inventory updated');
                newTransaction();
            })
            }
        else if(answer.input === '4) Add New Product') {

            inquirer.prompt([{
                name: 'product',
                message: 'Enter name of product:'
            },{
                name: 'department',
                message: 'Enter a department for this product'
            },{
                name: 'price',
                message: 'Enter a price for this product',
                validate: function(value){
                    var valid = value.match(/^[0-9]+$/);
                    if(valid){
                        return true
                    }
                    return 'Please enter a numerical value'
                }
            },{
                name: 'stock',
                message: 'Please enter a stock quantity for this product',
                validate: function(value){
                    var valid = value.match(/^[0-9]+$/);
                    if(valid){
                        return true
                    }
                    return 'Please enter a numerical value'
                }
            }]).then(function(answer){
                connection.query('INSERT into products SET ?', {
                    ProductName: answer.product,
                    DepartmentName: answer.department,
                    Price: answer.price,
                    StockQuantity: answer.stock
                }, function(err, res){});
                console.log('Product Added');
                newTransaction();
            })
        }
    })
};
//Prompt the user to see if they would like to perform another transaction or end the connection
function newTransaction(){
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to perform another transaction?'
    }]).then(function(answer){
        if(answer.choice){
            managerInput();
        }
        else{
            console.log('Have a good day');
            connection.end();
        }
    })
}

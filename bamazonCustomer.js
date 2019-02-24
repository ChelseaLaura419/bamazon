const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "tH!Nk875",
  database: "bamazon_DB"
});

function validateInput(value) {
	let integer = Number.isInteger(parseFloat(value));
	let sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

function UserPurchase() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Choose the Item ID of what you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you want?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		let item = input.id;
		let quantity = input.quantity;

		let queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;


			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('The product you requested is in stock! Placing order now.');

					let updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with Bamazon!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Insufficient quantity!');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		let template = '';
		for (var i = 0; i < data.length; i++) {
			template = '';
			template += 'Item ID: ' + data[i].id + '  //  ';
			template += 'Product Name: ' + data[i].product_name + '  //  ';
			template += 'Department: ' + data[i].department_name + '  //  ';
			template += 'Price: $' + data[i].price + '\n';

			console.log(template);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	UserPurchase();
	})
}

function runBamazon() {

	displayInventory();
}

runBamazon();
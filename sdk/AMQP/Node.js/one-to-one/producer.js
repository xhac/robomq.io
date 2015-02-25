/**
* File: producer.js
* Description: This is the AMQP producer publishes outgoing AMQP
*     communication to  clients consuming messages from a broker server.
*     Messages can be sent over AMQP exchange types including one-to-one,
*     from broadcast pattern, or selectively using specified routing key.
*
* Author: Stanley
* robomq.io (http://www.robomq.io)
*/

var amqp = require("amqp");

var server = "localhost";
var port = 5672;
var vhost = "/";
var username = "guest";
var password = "guest";
var routingKey = "testQ";

var connection = amqp.createConnection({host: server, port: port, vhost: vhost, login: username, password: password});
//node amqp library will automatically reconnect on exception
connection.on("ready", function(){
	//assigning blank string to exchange is to use the default exchange, where queue name is the routing key
	connection.exchange("", options = {confirm: true}, function(exchange){
		exchange.publish(routingKey, message = "Hello World!", options = {contentType: "text/plain", deliveryMode: 1}, function(){
			connection.disconnect();
			process.exit(0);
		});
	});
});

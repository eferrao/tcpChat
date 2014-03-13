var net = require('net')
var prompt = require('prompt')
var ipAddress = process.argv[2]
var portNumber = process.argv[3]

var client = net.connect({  
	//net.connect always takes in options (port and host)
	port: portNumber, 
	host: ipAddress
}, function(){
	process.stdin.on('readable', function () {
		//makes the data coming in readable
		var chunk = process.stdin.read();
		if (chunk != null) {
			client.write(chunk);
		}
		
	});
	prompt.get(['Name'], function(err, results){
		console.log(results)
		})

	client.on('data', function(data){
		process.stdout.write(data.toString())	
		//if you do process.stdout.write instead of console.log(), you dont get an extra line at the end of whatever is being written

	});
	client.on('error', function(error){
		console.log(error)
	}); 
});	
	//client file - listens to whats coming over the tcp wire 
	//typing is saved (and executed) in an array that is printed when user presses ENTER

	//client needs to ask for the name of the person, send it over to the server to save. then whenever someone sends a message to the other clients, the server attaches the name of the person onto the message. OR the 
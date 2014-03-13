//tcp chat client - start server file ($node [filename] [portnumber]) and then start as many clients ($node [filename] [ipAddress OR localhost] [portnumber]) as you'd like 
//if you join and there are more than 25 messages, it only sends you the past 25 

var net = require('net');
var prompt = require('prompt');
var ipAddress = process.argv[2]
var portNumber = process.argv[3]
var sockets = []
//array for all sockets/clients connected
var saveData = []
//array for up to 25 of the previous messages
var names = []
//array for all names

var server = net.createServer(function(socket){
	//server file - listens to messages from the client. this is the file to write the code to set those messages up for the client file to show them
	//net creates a new instance of this function every time a socket is made
	sockets.push(socket)
	//new sockets (clients) get pushed to the end of the sockets array
	prompt.get(['Name'], function(err, results){
		names.push(results)
	})

	socket.write(saveData.join(''))
	//any NEW sockets receive the saveData array 
	
	socket.on('end', function(){
		sockets.splice(sockets.indexOf(socket), 1);
	})
	//if a socket exits (an event), take out that socket from the sockets array

	socket.on('data', function(data){
		//on the data event, do something. function takes in data.
		process.stdout.write(data.toString())
		//process.stdout makes the stream writable
		for (i=0; i<sockets.length; i++){
			if (sockets[i] === socket){
				continue
			}
			//the if statement is to make sure the person who sent the data does not get duplicates
			//the for loop parses through the sockets to send the data 
		sockets[i].write(data)
		}

		if (saveData.length>3){
			saveData.splice(0,1)
		}
		//if the saveData array > 25 messages, delete (splice) the first message. aka saveData can be a max of 25 messages

		saveData.push(data)
		//pushes new data to the end of the saveData array
	});
});
server.listen(3000)


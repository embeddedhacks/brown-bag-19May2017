const mqtt = require('mqtt')  
const client = mqtt.connect('mqtt://broker.hivemq.com')
var gpio = require('rpi-gpio');

gpio.setup(7, gpio.DIR_OUT, write); // HYD

gpio.setup(15, gpio.DIR_OUT, write1); //pune



function write() {
    gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('HYD LED Initated');
    });
	
}

function write1() {
    gpio.write(15, false, function(err) {
        if (err) throw err;
        console.log('PUNE LED Initated');
    });
	
}




client.on('connect', () => {  
  client.subscribe('hyd')
  client.subscribe('pune')

})

client.on('message', (topic, message) => {  
  console.log('received message from server = %s %s', topic, message)
  switch (topic) {
    case 'hyd':
      return handleHYDRequest(message)
    case 'pune':
      return handlePuneRequest(message)
  }
})


function handleHYDRequest (message) {  
  
  if(message=='on'){
  
	
		gpio.write(7, true, function(err) {
			if (err) throw err;
			console.log('HYD LED = ON :)');
	});
  }
  
  if(message=='off'){
  
		gpio.write(7, false, function(err) {
			if (err) throw err;
			console.log('HYD LED = OFF :(');
	});

  
}

  
}

function handlePuneRequest (message) {  
  
  if(message=='on'){
  
	
		gpio.write(15, true, function(err) {
			if (err) throw err;
			console.log('Pune LED = ON :)');
	});
  }
  
  if(message=='off'){
  
		gpio.write(15, false, function(err) {
			if (err) throw err;
			console.log('Pune LED = OFF :(');
	});
 
  }
  
}


function handleAppExit (options, err) {  
  if (err) {
    console.log(err.stack)
  }

  if (options.cleanup) {
    
  }

  if (options.exit) {
    process.exit()
  }
}

/**
 * Handle the different ways an application can shutdown
 */
process.on('exit', handleAppExit.bind(null, {  
  cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {  
  exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {  
  exit: true
}))

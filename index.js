var express = require('express');
var app = express();
var generatorics = require('generatorics');

var redis = require('redis');
//redis.debug_mode = true;

app.get('/', function (req, res) {
    req.setTimeout(500000);
    var client = redis.createClient(6379, 'lotofacil');
    
    //var client = redis.createClient(80, 'lotofacil-pleitede.b542.starter-us-east-2a.openshiftapps.com');
    
    client.auth('BDRSVE350Dipojtj');
    
    client.on('connect', function() {
        console.log('Redis client connected');
        var combinations = generatorics.combination(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25' ], 15);
        console.log('Inserting games into database...');
        
        //var arrayOfCombinations = Array.from(combinations);
        
        var counter = 0;
        var control = 0;
        
        var batch = client.batch();
        //for (var idx = 0; idx < arrayOfCombinations.length; idx++) {
        for (var combination of combinations) {
            //var fullGame = '';
    
            //for (var dezen of combination) {
            //    fullGame += dezen;
            //}
            //console.log(fullGame.toString());
            //batch.sadd('games', fullGame.toString());
            batch.sadd('games', combination.join(''));
            counter++;
            control++;
            
            if (counter == 10000) {
                console.log('Adicionando batch de 10000... control: ' + control); 
                batch.exec();
                counter = 0;
                //global.gc();
                //break;
            }
        }
        batch.exec();
        
        /*
        for (var combination of combinations) {
        
            var fullGame = '';
    
            for (var dezen of combination) {
                fullGame += dezen;
            }
            
            client.sadd('games', fullGame.toString());
        }
        */
        client.quit();
        res.send('Database created!');
    });
    
});
app.listen(8080, function () {
  console.log('lotofacil-generator app listening on port 8080!');
});



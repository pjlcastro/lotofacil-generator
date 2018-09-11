var express = require('express');
var app = express();
var generatorics = require('generatorics');

var redis = require('redis');
var client = redis.createClient(6379, 'lotofacil');
client.auth('BDRSVE350Dipojtj');

//var count = 0;
//var x;

client.on('connect', function() {
    console.log('Redis client connected');
    var combinations = generatorics.combination(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25' ], 15);
    console.log('Inserting games into database...');
    for (var combination of combinations) {
        var fullGame = '';

        for (var dezen of combination) {
            fullGame += dezen;
        }
        
        client.sadd('games', fullGame.toString());
        //count++;
        //if (count > 100000) {
        //    console.log('entrou no sleep');
            //client.exec();
            break;
            //sleep.sleep(3);
            //count = 0;
        //}
    }
    client.quit();
});
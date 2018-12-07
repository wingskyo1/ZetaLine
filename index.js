var linebot =require('linebot');
var express = require('express');

var bot = linebot({
    channelId: "1628760097",
    channelSecret: "fa6ad7e42c864158294e81fdea65932e",
    cheannelAccessToken:"vfUeCL+a4I9SUwH24sfN1Ak9spTN/dRaAO6Ix1LsSMmMQsweU3Z/FNLzg/rUmRfYep5tjKw6ZK1OzgOW3kcMZgZplJLpIRmr9bxH2gDzfUvUfKf3oCO2vgq9K/jcLiGUZdlqHvjxn96lqBh57B1uegdB04t89/1O/w1cDnyilFU="

})

bot.on('message',function(event){
    console.log(event);
});

const app = express();
const linebotParser = bot.parser();
app.post('/',linebotParser);

var server = app.listen(process.env.PORT || 8080,function(){
    var port = server.address().port;
    console.log('App now running on port',port);
});
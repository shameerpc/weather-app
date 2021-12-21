
const express=require("express");
const https=require("https");
const bodeParser=require("body-parser");

const app=express()

const bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({extended:true}))
        app.get("/",function(req,res){
              res.sendFile(__dirname+"/index.html");
          })
        app.post("/",function(req,res){
           console.log(req.body.cityName);
           const query=req.body.cityName;
           const appid="1b699974c88471f5ab32fa325b8944e1";
           const unit="metric";
                   
          url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
          https.get(url,function(response){
          console.log(response.statusCode);
          response.on("data",function(data){
            
            const weatherData=JSON.parse(data);
            console.log(weatherData); 
            const temperature =weatherData.main.temp;
            const descriptions=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather is currently" +descriptions+"</p>")
            res.write("<h1>the "+query+" weather is"+temperature+" degree celcious"); 
            res.write("<img src="+imageUrl+">");
            res.send();
          })
          })



        })  

    
  





app.listen(3000,function(){
    console.log("the server is ready to run 3000 port");
})

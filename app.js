const express = require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){   
res.sendFile( __dirname + "/index.html");
})



app.post("/", function(req, res){
    

    const userCity=req.body.cityName;
    const apiKey= "5d88e5f4308828ca6bb41daebbee1ec5" ;
    const unit = "metric";
    const apiURL= "https://api.openweathermap.org/data/2.5/weather?q="+ userCity + "&appid=" + apiKey + "&units=" + unit ;

    https.get(apiURL, function(response){
        response.on("data", function(data){
            
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            
            const temp=weatherData.main.temp;
            console.log(temp);

            const weatherDescription=weatherData.weather[0].description;
            console.log(weatherDescription);

            const weatherIcon=weatherData.weather[0].icon;
            console.log(weatherIcon);
            const iconURL="https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
            
            res.write("<h1>The Weather is currently " + weatherDescription+ "</h1>");
            res.write("<h1>The Temperature in "+userCity+" is "+ temp + " Degree Celsius </h1>");
            res.write("<img src=" + iconURL + "></img>");


            res.send();
            


})
        
})
    
    

})


app.listen(3000, function(){
    console.log("Server is running on Port 3000");
})
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const { urlencoded } = require('body-parser')
const https = require('https')

const app = express()

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.use('/static', express.static('static'))

app.use(bodyParser.urlencoded({extended : true}))

app.post("/", (req, res)=>{
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

   const data = {
       members: [
           {
               email_address:email,
               status:"subscribed",
               merge_fields:{
                   FNAME:firstName,
                   LNAME:lastName

               }
           }
       ]
   }

// Flat pack JSON

const jsonData = JSON.stringify(data)

const url = "https://us1.api.mailchimp.com/3.0/lists/6e6d8e096f"

const options = {
    method:"POST",
    auth:"deepak1:0899d75820ded603feb0f92a4f309a36-us1"
}

const request = https.request(url, options, (response)=>{

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }


    response.on("data", (data)=>{
        console.log(JSON.parse(data))
    })

})


request.write(jsonData)
request.end()


})

// failure route

app.post("/failure", (req, res)=>{
    res.redirect("/")
})

app.post("/success", (req, res)=>{
    res.redirect("/")
})



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`server running on ${PORT}`))



// API key
// 0899d75820ded603feb0f92a4f309a36-us1

// list ID
// 6e6d8e096f
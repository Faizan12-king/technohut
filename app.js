const express = require("express");
const app = express();
var mongoose=require('mongoose');
const bodyparser=require('body-parser')
const port = 8000
const path = require('path');

// connecting to the database:-

const url = 'mongodb+srv://technohut_admin:@Faizan12technohut@technohut.za1xj.mongodb.net/technohut?retryWrites=true&w=majority'

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('database connneceed...'))
.catch(error=>console.log(error,'database is not connected.....'));



//******creating schema******** */
// creating schema
var contactSchema=new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    subject: String,
    message: String
});

var Contact=mongoose.model('Contact',contactSchema);



// ******express related config**************

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded());


// ********** Setting get endpoints***************

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});
app.post('/contact', (req, res) => {
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your details has been saved.")
    }).catch(()=>{
        res.status(400).send("Your details has not been saved.")
    })

    
});

    // *****starting the server******

    app.listen(port || process.env.port, () => {
        console.log(`The application started successfully on port ${port}`);
    });
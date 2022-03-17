const express = require('express')

const path = require('path')
const bodyParser= require('body-parser')
const mongoose =require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcrypt')


mongoose.connect('mongodb://localhost:27017/login-app-db',{
  useNewUrlParser: true,
  useUnifiedTopology:true,
 
})
const app = express();

app.use('/',express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async (req, res) => {
 
req.body.password = bcrypt.hash(req.body.password, 10)
const response = new User(req.body)

try {
    await response.save()
    return res.status(200).json({status : 'ok'})

} catch (error) {
    console.log(error);
    return res.json({ status: 'Error'});
}
})
app.listen(9999, () => {
  console.log(`Server running at 9999`);
});
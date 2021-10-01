const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

MongoClient.connect('mongodb+srv://Projet1:Monkeyflip@cluster0.qxes2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{useUnifiedTopology: true})
    .then(client =>{
    console.log('Connected to Database')
    const db = client.db('Projet1')
    const adv = db.collection('advertisements')

    app.set('view engine', 'ejs')
    app.set('views', __dirname+"/views")
    app.use(bodyParser.urlencoded({extended: true})) //CRUD
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
         db.collection('advertisements').find().toArray()          
        .then(advertisements => {
            console.log(advertisements)
            res.render('index.ejs', { advertisements: advertisements})   // utilisation de l'index.ejs
            })  
        .catch(error => console.error(error))

    })    

    app.post('/advertisements', (req, res) => {
        adv.insertOne(req.body)
        .then(advertisements => {
            res.redirect('/')
            console.log(advertisements)
        })
        //console.log(req.body)
        .catch(error => console.error(error))
    })
    //app.listen(/* ... */)
  })
  .catch(console.error)

// app.get(endpoint, callback)

app.put('/', (req, res) => {
    adv.findOneAndUpdate(
        { name: 'vdsvdsds' },
        {
          $set: {
            name: req.body.name,
            advertisements: req.body.advertisements
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))    
    //console.log(req.body)

})

app.listen(3000, function(){
    console.log('listening on 3000') // port à changer
})





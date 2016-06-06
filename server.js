/**
 * Created by danie on 21/05/2016.
 */

// Get the packages we need
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');




// Use environment defined port or 3000
var port = process.env.PORT | 5001;

// Create our express router
var router = express.Router();

// Initial dummy route
app.use(express.static(__dirname + "/public"));
// Aquí estaba el error, no se codificaba bien
app.use(bodyParser.json());

// Register all our routes with /api
app.use('/api', router);


//GET para todos los empleados
app.get('/contactlist', function (req, res) {
    console.log('Recibida petición GET');

    db.contactlist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

//POST para contratar empleado
app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

//DELETE para despedir empleado
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

//Obtener un único empleado
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

//PUT para contratar un empleado
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number, oficina: req.body.oficina, number: req.body.sueldo}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

// Start the server
app.listen(port);
console.log('Servidor iniciado en puerto ' +port +' ya puedes empezar a contratar y despedir gente');

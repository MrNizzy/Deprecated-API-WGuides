const express = require('express');
const mysql = require('mysql')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4208;

const app = express();

app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wguides'
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/guides', (req, res) => {
    connection.query('SELECT * FROM class_guides', (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(results);
        }else{
            res.send('No users found');
        }
    }
    );
});

/* This is a route that is used to get the consumables for a specific class. */
app.get('/api/guides/consumables/:id', (req, res) => {
    connection.query('SELECT * FROM consumables_class WHERE id_reference = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(results);
        }else{
            res.send('No consumables found');
        }
    }
    );
});

/* This is a route that is used to get the enchants for a specific class. */
app.get('/api/guides/enchants/:id', (req, res) => {
    connection.query('SELECT * FROM enchants_class WHERE id_reference = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(results);
        }else{
            res.send('No enchants found');
        }
    }
    );
});

/* This is a route that is used to get the equipment for a specific class. */
app.get('/api/guides/equipment/:id', (req, res) => {
    connection.query('SELECT * FROM equipment_class WHERE id_reference = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send(results);
        }else{
            res.send('No items found');
        }
    }
    );
});

// Connect to MySQL
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

/* This is a middleware function that is executed when the requested resource is not found. */
app.use(function (req,res,next){
	res.status(404).send('Unable to find the requested resource!');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// Cargamos nuestros módulos
var express = require('express');
var bodyParser = require('body-parser');
const usersRoutes = require('./src/routes/user');
const cors = require('cors');
var app = express();
const auth = require('./src/middlewares/auth');
var port = process.env.PORT || 3001;
const routes = require('./src/routes/index')
const database = require('./database/database')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	app.use(cors());
    next();
});
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Rutas
// Cargamos las rutas de nuestros usuarios

app.use('/users', usersRoutes);
app.use('/',routes);

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3000/');
});
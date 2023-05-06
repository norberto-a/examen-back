const mongoose = require('mongoose');
const user ='c-demo';
const password = 'VS1R2unzzItiPqkh';
const dbname = 'crypex_demo';
const uri = `mongodb+srv://${user}:${password}@cluster0.rbvp3.mongodb.net/?retryWrites=true&w=majority`;
const db = mongoose.connection;
mongoose.connect(uri, {
});
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});
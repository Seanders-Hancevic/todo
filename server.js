const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://gtbcuser:GTBC123@ds119273.mlab.com:19273/heroku_k0t35xcc', { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
  });
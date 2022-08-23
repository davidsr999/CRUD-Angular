const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});



const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('BD conectada');
    } catch (error) {
        console.log('ERROR:',error);
        process.exit(1);
    }
}



module.exports = conectarDB;
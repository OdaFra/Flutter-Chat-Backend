const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {

      await  mongoose.connect(process.env.DB_CNN, {
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
        // userCreateIndex:true,
        });
        console.log('DB Online');
        //console.log('init db config');
    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos - Hable con el administrador');
    }
}

module.exports={
     dbConnection
}
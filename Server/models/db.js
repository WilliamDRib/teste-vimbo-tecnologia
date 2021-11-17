const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoBD Connected!.');
    } else {
        console.log('Erro to connect to MongoDB! : ' + JSON.stringify(err, undefined, 2));        
    }
});

require('./user.model');
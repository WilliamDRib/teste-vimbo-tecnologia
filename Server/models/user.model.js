const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require,
        unique: true
    },
    password: {
        type: String,
        require,
        minlength: [4, 'Password must be atleast 4 characters']
    },
    saltSecret: {
        type: String
    }
});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email.');

userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);
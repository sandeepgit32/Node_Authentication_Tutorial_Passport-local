var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

userSchema.methods.generateHash = function(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
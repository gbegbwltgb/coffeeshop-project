var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
            username: {type: String, required: true, max: 100},
            //family_name: {type: String, required: true, max: 100},
            date: {type: Date, required: true},
            number: {type: String, required: true, max: 11},
            email: {type: String, required: true},
            address: {type: String},
            drink: {type: String}
    }
);

module.exports = mongoose.model('Order', OrderSchema);
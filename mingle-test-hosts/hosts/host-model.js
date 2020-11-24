var mongoose = require("mongoose");

var HostSchema = new mongoose.Schema({
    name : { type : String, required : [true, 'name is required'] },
    status : { type : Boolean, required : [true, 'status is required'], default : true },
    ip : { type : String, required : [true, 'ip is required'] },
    protocol : { type: String, enum: ['http', 'https'], required : [true, 'protocol is required'] },
    port : { type : Number },
    endpoint : { type : String },
    _client : {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required : [true, '_client is required']},
}, {timestamps: true, usePushEach: true});

var Host = mongoose.model('Host', HostSchema);

module.exports = Host;

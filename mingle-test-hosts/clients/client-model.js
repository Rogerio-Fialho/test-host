var mongoose = require("mongoose");

var ClientSchema = new mongoose.Schema({
    name : { type : String, required : [true, 'name is required'] },
    needIuser : { type : Boolean, required : [true, 'needIuser is required'], default : false },
    sponsor : { type : String, required : [true, 'sponsor is required'], trim : true, lowercase : true },
    code : { type : String, required : [true, 'code is required'], trim : true, uppercase : true, unique: true },
    alias_prefix : { type : String, required : [true, 'alias_prefix is required'], trim : true, uppercase : true, unique: true },
    status : { type : Boolean, required : [true, 'status is required'], default : true },
    wso2 : { type : Boolean, required : [false, ''], default : false },
    tenant : { type : String, required : [false, ''], trim : true, lowercase : true },
    ticket : { type : String, required : [false, ''], trim : true, uppercase : true },
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'TUser', required : [true, 'createdBy is required']},
    updatedBy : {type: mongoose.Schema.Types.ObjectId, ref: 'TUser', required : [true, 'updatedBy is required']}
},{timestamps: true});

var Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

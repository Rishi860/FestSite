const { model, Schema } = require("mongoose");


const functionsSchema = new Schema({
    name:{type:String, required:true, unique:true},
    type:{type:String, enum:['event', 'workshop'], default:'event'},
    description: String,
    eventDate:{type:Date},
    image: String,// url of image
    eventTime:{type:String, match:/[1-12](AM|PM)-[1-12](AM|PM)/}
})

module.exports = model("Functions", functionsSchema);

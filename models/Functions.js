const { model, Schema } = require("mongoose");


const functionsSchema = new Schema({
    name:{type:String, required:true, unique:true},
    type:{type:String, enum:['Event', 'Workshop'], default:'event'},
    description: String,
    eventDate:{type:Date},
    image: String,// url of image
    eventTime:{type:String, match:/[0-1][0-9](AM|PM)-[0-1][0-9](AM|PM)/}
})

// module.exports = model("Functions", functionsSchema);
const Functions = model("Functions", functionsSchema);
module.exports = Functions

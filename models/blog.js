const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    
    blogTitle : {
        type: String,
        required: true,
    },
    blogTitleDescription : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    eventDate : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    tags : [],
    images : [],

}, { timestamps: true });

const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;
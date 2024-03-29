const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogTitle : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    eventDate : {
        type: Object,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },

    tags : [],
    images : [],

}, { timestamps: true });
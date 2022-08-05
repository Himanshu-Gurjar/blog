const mongoose = require("mongoose");
const config   = require('config');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    content : {
        type : String,
        required : true
    }
}, {timestamps : true});

const blog_posts = mongoose.connection.useDb(config.get('databaseSettings.blog_posts'))
const Blog = blog_posts.model("blogs", BlogSchema);

module.exports = Blog;
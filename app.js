const express           = require('express');
const config            = require('config');
const startupService    = require('./services/startupservices');
const blog              = require('./routes/blog');
const blogvalidator     = require('./validators/blogPostValidator');

app = express();
app.set('port', process.env.PORT || config.get('PORT'));
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended : true}));

  
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.get('/',blogvalidator.getAllBlogsValidator, blog.getBlogs);
app.get('/get_blog', blogvalidator.idValidatorQuery, blog.getBlogById);
app.post('/create_blog', blogvalidator.validateBlogDetails, blog.createBlog);
app.put('/update_blog', blogvalidator.validateUpdateBlog, blog.updateBlog)
app.delete('/delete_blog/:id', blogvalidator.idValidatorParams, blog.deleteBlog);

startupService.initializeServer();

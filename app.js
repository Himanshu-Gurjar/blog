const express           = require("express");
const config            = require("config");
const startupService    = require("./services/startupservices");
const blog              = require("./routes/blog");
const blogvalidator     = require("./validators/blogPostValidator");
const log4js            = require("log4js");
const logger            = require("./logging/loggerConfig").reqLogger;
const auth              = require("./routes/users/auth");
const authRouter        = require("./routes/users/index");
const cookieParser      = require("cookie-parser");

const app = express();

app.set("port", process.env.PORT || config.get("PORT"));
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});

app.use((req, res, next) => {
    if (process.env.NODE_ENV !== "live") {      
      logger.info(`REQ BODY: ${JSON.stringify(req.body)}, QUERY : ${JSON.stringify(req.query)}, PARAMS : ${JSON.stringify(req.params)}`)
    }
    req.start_time = new Date();
    next()
});

app.use(
    log4js.connectLogger(logger, {
      level: "info",
      format: (req, res, format) => {
        return format(`:method :url Time : ${new Date() - req.start_time}ms`)
      }
    })
);

app.get("/",auth.authenticateUser, blogvalidator.getAllBlogs, blog.getBlogs);
app.get("/get_blog",auth.authenticateUser, blogvalidator.getBlog, blog.getBlogById);
app.post("/create_blog",auth.authenticateUser, blogvalidator.createBlog, blog.createBlog);
app.put("/update_blog",auth.authenticateUser, blogvalidator.updateBlog, blog.updateBlog)
app.delete("/delete_blog/:id",auth.authenticateUser, blogvalidator.deleteBlog, blog.deleteBlog);
app.use(authRouter);
startupService.initializeServer(app);

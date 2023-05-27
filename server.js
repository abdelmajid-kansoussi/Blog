const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const app = express();
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://majid:6XPvqzdOSGUDbmo5@cluster0.xpc3v90.mongodb.net/blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(5000);

app.use("/articles", articleRouter);

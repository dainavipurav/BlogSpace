import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("index.ejs", { currentPath: "/" });
});

app.get("/about", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("about.ejs", { currentPath: "/about" });
});

app.get("/my-posts", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("my-posts.ejs", { currentPath: "/my-posts" });
});

app.get("/form", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("partials/form.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

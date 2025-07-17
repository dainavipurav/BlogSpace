import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("index.ejs", { currentPath: "/", posts: posts });
});

app.get("/about", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("about.ejs", { currentPath: "/about" });
});

app.get("/my-posts", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("my-posts.ejs", { currentPath: "/my-posts", posts: posts });
});

app.get("/form", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("partials/form.ejs", { currentPath: "/form" });
});

app.post("/publish", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  console.log("Publishing details..." + JSON.stringify(req.body));

  if (!validateDetails(req.body)) {
    return res
      .status(400)
      .json({ message: "Please enter all mandatory details." });
  }

  var uniqueId = generateUniqueId();

  var data = {
    id: uniqueId,
    author_name: req.body.authorName,
    author_image_url: req.body.authorImgUrl,
    creation_date: Date.now(),
    modification_date: Date.now(),
    post_title: req.body.title,
    post_description: req.body.content,
    post_image: req.body.imgUrl,
  };

  posts.push(data);

  res.render("index.ejs", { currentPath: "/", posts: posts });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function generateUniqueId() {
  let id;
  let ids = [];

  posts.forEach((element) => {
    ids.push(element.id);
  });

  do {
    id = generateId();
  } while (ids.includes(id));
  return id;
}

function validateDetails(req) {
  if (req && req.title && req.content && req.imgUrl) {
    return true;
  } else {
    return false;
  }
}

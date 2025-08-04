import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [
  {
    id: "1",
    author_name: "John Doe",
    author_image_url: "https://avatar.iran.liara.run/public/85",
    creation_date: Date.now(),
    modification_date: Date.now(),
    post_title: "Exploring the Mountains",
    post_description:
      "Had an amazing trip hiking through the Rockies last weekend!",
    post_image:
      "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
  },
  {
    id: "2",
    author_name: "Emily Carter",
    author_image_url: "https://avatar.iran.liara.run/public/86",
    creation_date: Date.now(),
    modification_date: Date.now(),
    post_title: "My Favorite Coffee Spots",
    post_description:
      "Sharing a list of cozy coffee shops I love to work from in NYC.",
    post_image:
      "https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg",
  },
  {
    id: "3",
    author_name: "Arjun Patel",
    author_image_url: "https://avatar.iran.liara.run/public/87",
    creation_date: Date.now(),
    modification_date: Date.now(),
    post_title: "JavaScript Tips & Tricks",
    post_description: "A few useful JS patterns I've picked up over the years.",
    post_image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "4",
    author_name: "Sara Kim",
    author_image_url: "https://avatar.iran.liara.run/public/88",
    creation_date: Date.now(),
    modification_date: Date.now(),
    post_title: "Sunset Photography",
    post_description:
      "Captured these beautiful sunset shots at the beach yesterday.",
    post_image: "https://picsum.photos/seed/picsum/200/300",
  },
];

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

app.delete("/post", (req, res) => {
  var id = req.query.id;

  if (id) {
    var index = posts.findIndex((e) => e.id.toString() == id.toString());
    if (index === -1) {
      return res.status(400).json({ message: "Id not found." });
    }
    posts.splice(index, 1);

    res.sendStatus(200);
  } else {
    return res.status(400).json({ message: "Something went wrong." });
  }
});

app.post("/post", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.

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

  res.redirect("/");
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

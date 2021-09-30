const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// Middleware 1

// app.use(function (req, res, next) {
//   console.log("Middleware 1");
//   next();
// });

// Middleware 2

// app.use(function (req, res, next) {
//   console.log("Middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "shabu",
    phone: "1111111111111111",
  },
  {
    name: "sourav",
    phone: "111112211111111",
  },
  {
    name: "URmila",
    phone: "1456711111111",
  },
];

app.get("/", function (req, res) {
  return res.render("home", {
    title: "my contacts list",
    contact_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Contact List",
  });
});

app.post("/create-contact", function (req, res) {
  // return res.redirect('practice')
  // contactList.push({
  //   name:req.body.name,
  //   phone:req.body.phone
  // });
  contactList.push(req.body);
  return res.redirect("/");
});

app.get("/delete-contact/", function (req, res) {
  console.log(req.query);
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1); ///splice means to delete one index value  using splice we can put the next index value of deleting index
  }
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error is running", err);
  }
  console.log("Yup!!My express server running on port:", port);
});

require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const db = require('_helpers/db');
const Role = db.Role;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to AWS EC2 Demo Session WebApp Back End RestAPI." });
});

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/roles', require('./roles/roles.controller'));

// global error handler
app.use(errorHandler);

function initialRole() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          roleName: "SuperAdmin",
          roleDescription: "Super Admin",
          roleStatus:1
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'SuperAdmin' to roles collection");
        });
  
        new Role({
          roleName: "Admin",
          roleDescription: "Admin",
          roleStatus:1
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Admin' to roles collection");
        });
  
        new Role({
          roleName: "User",
          roleDescription: "User",
          roleStatus:1
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'User' to roles collection");
        });
      }
    });
  }

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
    initialRole();
});

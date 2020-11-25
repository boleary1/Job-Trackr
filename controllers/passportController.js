const db = require("../models");
const passport = require("../config/passport");

module.exports = {
  loginUser: function (req, res) {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  },
  signupUser: function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
      .then(() => {
        res.redirect(307, "/api/passport/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  },
  logoutUser: function (req, res) {
    req.logout();
    res.redirect("/");
  },
  getUserData: function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        jobs_pending: req.user.jobs_pending,
        jobs_applied: req.user.jobs_applied,
        jobs_interviewed: req.user.jobs_interviewed,
        jobs_lettersent: req.user.jobs_lettersent,
        jobs_offered: req.user.jobs_offered,
        jobs_rejected: req.user.jobs_rejected,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      });
    }
  },
  incrementUserValue: function (req, res) {
    db.User.increment({ [req.params.value]: 1 }, {
      where: {
        id: req.params.UserId
      }
    }).then(response => res.json(response))
      .catch(err => console.log(err));
  },
  decrementUserValue: function (req, res) {
    db.User.increment({ [req.params.value]: -1 }, {
      where: {
        id: req.params.UserId
      }
    }).then(response => res.json(response))
      .catch(err => console.log(err));
  }
}
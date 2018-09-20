const express = require('express')
const app = express.Router()
// const Login = require('../app/Login')
const Register = require('../app/Register')
// const token = require('../middleware/Validate')
// const Update_user = require('../app/Update_user')
// const Delete_attributes = require('../app/Delete_attributes')
// const Delete = require('../app/Delete')
// const Change_Password = require('../app/Change_Password')

app
    // .post('/Login', Login.login)

    .post('/Register', Register.RegisterUser)

// .use((req, res, next) => token(req, res, next))

// .post('/logout', Login.logout)

// .put('/Update', Update_user.update)

// .post('/Delete', Delete.DeleteUser)

// .delete('/Delete/:id', Delete.unfollow_category)

// .post('/Change_Password/:id', Change_Password.check_category)

module.exports = app;
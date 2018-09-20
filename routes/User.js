const express = require('express')
const app = express.Router()
const Login = require('../app/Login')
const Register = require('../app/Register')
const token = require('../middleware/Validate')
const Delete = require('../app/DeleteUser')
const Change_Password = require('../app/Change_Password')
const Update_user = require('../app/UpdateUser')
// const Delete_attributes = require('../app/Delete_attributes')

app.post('/Login', Login.login)

    .post('/Register', Register.RegisterUser)

    .use((req, res, next) => token(req, res, next))

    .post('/ChangePassword', Change_Password.ChangePassword)

    .post('/Delete', Delete.DeleteUser)

    .put('/Update', Update_user.updateUser)


// .post('/logout', Login.logout)



// .delete('/Delete/:id', Delete.unfollow_category)

// .post('/Change_Password/:id', Change_Password.check_category)

module.exports = app;
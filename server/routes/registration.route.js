import express from 'express'
import {getRegistrationList,createRegistration} from '../controllers/registration.controller.js'


const Router=express.Router();


Router.route("/registration").get(getRegistrationList)
.post(createRegistration);

export default Router;
import express from 'express'
import {getCountriesList,createCountry} from '../controllers/country.controller.js'


const Router=express.Router();


Router.route("/country").get(getCountriesList)
.post(createCountry)
// .post(createRegistration);

export default Router;
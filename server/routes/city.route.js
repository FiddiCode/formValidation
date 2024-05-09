import express from 'express';
import {getCitiesList,createCity} from '../controllers/city.controller.js'

const Router =express.Router();


Router.route("/city").get(getCitiesList).post(createCity)

export default Router;
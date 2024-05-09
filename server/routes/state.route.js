import express from 'express'
import {getStateList,createState} from '../controllers/state.controller.js'

const Router=express.Router();


Router.route("/state").get(getStateList).post(createState);


export default Router;
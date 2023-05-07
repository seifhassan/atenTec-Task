const router = require("express").Router()
const dive = require("../app/controller/diveController.js")
const { celebrate, Joi, Segments } =require("celebrate");

 router.post('/createNewDive/:diverId',
 celebrate({
  // [Segments.PARAMS]: Joi.object({
  //   diverId: Joi.string()
  //     .required()
  //     .label("diverId"),
  // }),
    [Segments.BODY]: Joi.object({
      DiverName: Joi.string().required().label("DiverName"),
      DiveDepth: Joi.number().required().label("DiveDepth"),
      DiveDate: Joi.date().required().label("DiveDate"),
      
    }),
 }),
 dive.createNewDive)


module.exports = router
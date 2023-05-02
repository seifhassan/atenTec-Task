const router = require("express").Router()
const diver = require("../app/controller/diverController.js")
const { celebrate, Joi, Segments } =require("celebrate");

router.post('/addDiver', celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required().label("name"),
    }),
  }), diver.addDiverToDB)


module.exports = router
const router = require("express").Router()
const diver = require("../app/controller/diverController.js")
const { celebrate, Joi, Segments } =require("celebrate");

router.post('/addDiver', celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required().label("name"),
      diverNumber: Joi.number().required().label("diverNumber"),
    }),
  }), diver.addDiverToDB)

  router.get('/getDiver/:diverNumber',  diver.getDiverFromDB)


module.exports = router 
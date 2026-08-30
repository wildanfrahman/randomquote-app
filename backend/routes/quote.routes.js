const express = require("express");
const router = express.Router();
const controller = require("../controllers/quote.controller");

//POST-QUOTES
router.post("/", controller.createQuotes);

//GET-RANDOM-QUOTES
router.get("/random", controller.randomQuotes);

//GET-ALL-QUOTES
router.get("/", controller.allQuotes);

//PUT-QUOTES
router.put("/:id", controller.updateQuotes);

//DELETE-QUOTES
router.delete("/:id", controller.deleteQuotes);

module.exports = router;

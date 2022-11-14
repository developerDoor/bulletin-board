const express = require("express");
const router = express.Router();
const board = require("../services/board");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await board.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting board`, err.message);
    next(err);
  }
});

/* POST programming language */
router.post("/", async function (req, res, next) {
  try {
    res.json(await board.create(req.body));
  } catch (err) {
    console.error(`Error while creating board`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await board.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating board`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await board.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting board`, err.message);
    next(err);
  }
});

module.exports = router;

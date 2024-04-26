const express = require("express");
const sach = require("../controllers/sach.controller");

const router = express.Router();

router.route("/")
    .get(sach.findAll)
   
    .delete(sach.deleteAll);

router.route("/favorite")
    .get(sach.findAllFavorite);

router.route("/add")
   .post(sach.create)


router.route("/:id")
    .get(sach.findOne)
    .put(sach.update)
    .delete(sach.delete);

module.exports = router;

const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");

const router = express.Router();

router.route("/")
    .get(nhanvien.findAll)
    .delete(nhanvien.deleteAll);
router.route("/add")
    .post(nhanvien.create);

router.route("/favorite")
    .get(nhanvien.findAllFavorite);

router.route("/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

module.exports = router;

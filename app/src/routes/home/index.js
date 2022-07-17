const express = require("express");
const router = express.Router();
const path = require("path");

const ctrl = require("./home.ctrl");

router.use(express.static(path.join(__dirname, "../../views/front-page/build")));

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "../../views/front-page/build/index.html")));

router.get("/read", ctrl.read);
router.post("/create", ctrl.create);
router.post("/update/done", ctrl.update.done);
router.post("/update/count_up", ctrl.update.countUp);
router.post("/delete", ctrl.delete);

module.exports = router;

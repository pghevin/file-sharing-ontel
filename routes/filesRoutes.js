const { saveFile, userFiles, uploadFile } = require("../services/filesService");
const multer = require("multer");

const router = require("express").Router();

const upload = multer({ dest: "uploads/temp/" }); // Temporary storage for chunks

router.get("/list/:user_id", userFiles);
router.post("/save", saveFile);
router.post("/upload", upload.single("fileChunk"), uploadFile);

module.exports = router;

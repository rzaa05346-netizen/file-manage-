const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.send("File Uploaded Successfully");
});

app.get("/files", (req, res) => {
    fs.readdir("./uploads", (err, files) => {
        if (err) return res.status(500).send(err);
        res.json(files);
    });
});

app.delete("/delete/:name", (req, res) => {
    const filePath = path.join(__dirname, "uploads", req.params.name);

    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).send("Error deleting file");
        res.send("File Deleted");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
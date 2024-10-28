const express = require("express");
const router = express.Router();
const dataControllers = require("../controllers/dataControllers");

// Routes for CRUD
router.get("/", dataControllers.getAllData);

router.get("/filter", dataControllers.getFilterData);

// Get content by ID
router.get("/:id", dataControllers.getContentById);

// Add new content
router.post("/add", dataControllers.postAddNewContent);

// Update content by ID
router.put("/update/:id", dataControllers.putUpdateContentByID);

// Delete content by ID
router.delete("/:id", dataControllers.deleteContentByID);


module.exports = router;

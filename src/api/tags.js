const express = require("express");
const { getLinkByTag } = require("../db");
const tagsRouter = express.Router();

// GET /api/tags/:tagName/links
tagsRouter.get("/:tag/links", async (req, res, next) => {
  const { tag } = req.params;

  try {
    const getTagged = await getLinkByTag(tag);
    res.send({ getTagged });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
const apiRouter = require('express').Router();
const { getAllLinks, getLinksWithTags, getAllTags } = require('../db/index');

apiRouter.get("/links", async (req, res) => {

  const links = await getAllLinks();

  res.send({
    links
  });
});

apiRouter.get("/tags", async (req, res) => {

  const links = await getAllTags();

  res.send({
    links
  });
});


apiRouter.get("/link_tags", async (req, res) => {

  const links = await getLinksWithTags('https://github.com/');

  res.send({
    links
  });
});

module.exports = apiRouter;

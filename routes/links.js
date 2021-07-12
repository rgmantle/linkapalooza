const linksRouter = require('express').Router();
const { getAllLinks, createLinks, getLinkById, destroyLink, addTagToLink } = require('../db/index');

linksRouter.use((req, res, next) => {
  console.log("A request is being made to /links");
  next();
})

linksRouter.get("/", async(req, res) => {
  const links = await getAllLinks();
  res.send({
    links
  });
});

linksRouter.post("/", async(req, res, next) => {
  const { linkurl, comment } = req.body;

  try {
    (url && comment)
    ? res.send(await createLinks({ linkurl, comment, clicks: 0}))
    : res.status(403).send({ message: `Please Provide URL and Comment` });
  } catch(error) {
    next(error)
  }
});

linksRouter.delete("/:linkId", async(req, res, next) => {
  const {linkId} = req.params;
  try {
    const linkToDelete = await getLinkById(linkId);

    linkToDelete
    ? res.send(await destroyLink(linkToDelete.id))
    : res.status(403).send({ message: `Link does not exist.` });
  } catch(error) {
    next(error)
  }
});

linksRouter.post("/:linkId/tags", async(req, res, next) => {
  const {linkId} = req.params;
  const {tagId}  = req.body;
  try {
      const link_tag = await addTagToLink({linkId, tagId})
      res.send(link_tag);
  } catch (error) {
      next(error)
  }
})

module.exports = linksRouter
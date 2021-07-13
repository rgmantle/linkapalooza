const apiRouter = require('express').Router();
const linksRouter = require('./links');
const tagsRouter = require('./tags');
const linkTagsRouter = require('./link_tags');

apiRouter.use('/links', linksRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/linkTagsRouter', linkTagsRouter);
// const { getAllLinks, getLinksWithTags, getAllTags } = require('../db/index');



// apiRouter.get("/link_tags", async (req, res) => {

//   const links = await getLinksWithTags('https://github.com/');

//   res.send({
//     links
//   });
// });

module.exports = apiRouter;
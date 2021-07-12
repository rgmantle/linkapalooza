const tagsRouter = require('express').Router();
const { getAllTags, getTagsBylink } = require('../db/index');

tagsRouter.use((req, res, next)=>{
  console.log("A request is being made to /tags");
  next();
})

tagsRouter.get("/", async (req, res) => {
  try {
    const tags = await getAllTags();
  
    res.send(tags);
  } catch (error) {
    next(error);
}
})

tagsRouter.post("/", async(req, res, next)=>{
  const {tagName} = req.body;

  try{
     
      tagName 
      ? res.send(await createTag(tagName))
      : res.status(403).send({ message: `Please provide a Tag Name` });

  }catch(error){
      next(error);
  }
})

tagsRouter.get("/:linkId/tags",  async(req, res, next)=>{
  const {linkId} = req.params;
  try{
      const tagsByLink = await getTagsBylink(linkId);
      res.send(tagsByLink);
  }catch(error){
      next(error)
  }

})

module.exports = tagsRouter
const express = require('express');
const { getAllLinks, 
        createLink,
        createLinkTags, 
        updateLink,
        getLinkByTag,
        updateClickCount,
        deleteLink } = require("../db")
const linkRouter = express.Router();
const bodyparser = require('body-parser');
linkRouter.use(bodyparser.json());

// GET /api/links
linkRouter.get("/", async (req, res, next) => {

  const links = await getAllLinks();
  res.send({
    links,
    status:true,
    message: 'successfully retrieved all links'
  });
});

// POST /api/links (creates tags during link creation)
linkRouter.post("/", async (req, res, next) => {
    const {linkurl, comment, date, tags=[]} = req.body;

    try {
        //creates tags during link creation???
        const link = await createLink({
            linkurl,
            comment,
            date,
            tags
        })

        res.send({
            message: 'new link created',
            data: link,
            status: true
        })
    } catch (error) {
        next(error)
    }
})

linkRouter.patch('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {url, comments, clicks, rating, tags=[]} = req.body;
    const updateFields = {};

    console.log('Entered /links/:id PATCH. id: ', id, 'req.body: ', req.body);

    if (url){
        updateFields.url = url;
    }
    if (comments) {
        updateFields.comments = comments;
    }
    
    if (tags && tags.length) {
        updateFields.tags = tags;
    }
    
    if(clicks){
        updateFields.clicks = clicks;
    }

    if(rating){
        updateFields.rating = rating;
    }
    console.log('Update fields lenght: ', updateFields.length);


    try {
        const updatedLink = await updateLink(id, updateFields);
        console.log('Edited link: ', updatedLink);
        res.send({
            message: 'link updated',
            data: updatedLink,
            status: true,
        });
    } catch (error) {
        next(error);
    }
})

linkRouter.get('/:id', async(req, res, next)=>{
    const {id}= req.params;

    try {
        const link = await updateClickCount(id);
        res.send({
            message:'successfully retrieved link',
            data: link,
            status: true
        })
    } catch (error) {
        next(error);
    }
})

linkRouter.get('/:tag', async (req, res, next)=>{
    const { tag } = req.params;

    try {
        const links = await getLinkByTag(tag);
        res.send({
            message: 'Successfully retrieved links',
            data: links,
            status: true
        })
    } catch (error) {
        next(error);
    }

})

linkRouter.delete('/:id', async(req, res, next)=>{

    console.log('Entered /links DELETE');
    const { id } = req.params;
    try {
        const link = await deleteLink(id);
        res.send({
            message: 'Successfully deleted link',
            data: link,
            status: true
        })
    } catch (error) {
        next(error);
    }
})

module.exports = linkRouter;
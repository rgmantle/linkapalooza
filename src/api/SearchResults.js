const express = require('express');
const searchRouter = express.Router();
const { getLinkByUrl, searchAllLinks } = require('../db');

searchRouter.get('/', (req, res, next)=>{
    console.log('Entered SearchResults Router GET / ');
    res.send({
    message: "You successfully reach search results GET/"

    })
    next()

})

searchRouter.get('/:searchTerm', async (req, res, next)=>{

    const { searchTerm } = req.params;
    console.log('Entered SearchResults GET Search Term with ', searchTerm);

    try {
         const links = await searchAllLinks(searchTerm);
         
         console.log('Success! ', links);
         res.send({
             message: 'successfully retrieved links',
             status: true,
             data: links
         })

    } catch (error) {
        next(error);
    }
})


searchRouter.get('/:url', async (req, res, next)=>{
    //retrieve all saved links
    console.log('Entered SearchResults Router GET /url ');
    const {url} = req.params
    console.log('search results params: ', req.params);
    try{
    const data = await getLinkByUrl(url);
    console.log("URL is Successful", data)
    res.send({
        message: 'Entered SearchResults GET /',
        data
    })
}catch(e){

    next(e)
}
})


module.exports= searchRouter

require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: 'Successfully reached /api'});
    
    next();
})

const linkRouter = require('./links');
apiRouter.use('/links', linkRouter);

const searchResults = require('./SearchResults')
apiRouter.use('/SearchResults', searchResults);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

module.exports= apiRouter;

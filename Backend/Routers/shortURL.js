import express from 'express';
import { addURL, getShortUrl, getAllShortUrl } from '../controller/shortURL.js';
import { getUserSessionToken } from '../controller/user.js';
import { verifyToken } from '../Auth/auth.js';

const router = express.Router();

// create a Short URL
router.post('/create', async (req, res) => {
    try{
        // get user by session token
        const validUser = await getUserSessionToken(req.body.sessionToken);
        if(!validUser) return res.status(404).json({error: 'user not found', acknowledged: false});
        if(validUser.account === 'inactive') return res.status(404).json({error: 'account not verified', acknowledged: false, inactive: true});

        // verifing token
        const verifiedToken = verifyToken(validUser.sessionToken);
        if(!verifiedToken) res.status(400).json({error: 'Session expired login again', acknowledged: false})

        // creating new URL Short link
        const newURL = await addURL(req.body.fullURL, validUser._id);
        if(!newURL) return res.status(400).json({
            message: 'Error while updating data' ,
            acknowledged: false
        });
        res.status(201).json({message: 'Short URL created', acknowledged: true, newURL});

    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            acknowledged: false,
            error: err
        });
    }
})

// get all short URL
router.post('/all', async (req, res) => {
    try{
        // get user by session token
        const validUser = await getUserSessionToken(req.body.sessionToken);
        if(!validUser) return res.status(404).json({error: 'user not found', acknowledged: false});

        if(validUser.account === 'inactive') return res.status(404).json({error: 'account not verified', acknowledged: false, inactive: true});

        const allShortUrl = await getAllShortUrl(validUser._id);

        res.status(201).json({data: allShortUrl , acknowledged: true});

    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            acknowledged: false,
            error: err
        });
    }
})

// Redirect to original URL
router.get('/:shorturl', async (req, res) => {
    try{
        // get data using ShortURL
        const URL = await getShortUrl(req);
        if(!URL) return res.status(404).json({
            message: 'URL does not exist' ,
            acknowledged: false
        });
        // Update the count
        URL.count++;
        await URL.save();
        
        res.redirect(URL.fullURL);

    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            acknowledged: false,
            error: err
        });
    }
});

// 

export const shortURLRouter = router;
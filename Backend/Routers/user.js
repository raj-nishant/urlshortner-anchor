import express from 'express';
import bcrypt from 'bcrypt';
import { getUser, getUserBytoken, newUser, getUserSessionToken } from '../controller/user.js';
import { genearateActiveToken, genearateSessionToken, genearateToken } from '../Auth/auth.js';
import { sendActivationMail } from '../helpers/activationMail.js';

const router = express.Router();

// to send activation email
async function activationMail(email){
    const actToken = genearateActiveToken(email);

    const activeMail = await sendActivationMail(email, actToken);

    if(!activeMail)  return {
        acknowledged: false
    };

    return {
        acknowledged: true,
        actToken
    };
}

// singup
router.post('/newuser', async (req, res) => {
    try{
        // check user
        const checkUser = await getUser(req);
        if(checkUser) return res.status(400).json({error: 'user already exist'});

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // saving new user
        const user = {
            ...req.body,
            password: hashedPassword
        }

        // Send activation mail
        const actMailSent = await activationMail(user.email);
        if(!actMailSent.acknowledged) return res.status(400).json({error: 'error sending confirmation mail Please check the mail address', acknowledged: false});

        // save the new user after confirmation email
        const savedUser = await newUser(user);
        savedUser.activationToken = actMailSent.actToken ;
        await savedUser.save();

        res.status(201).json({message: 'Successfully Registered', id: savedUser._id, email: 'Confirmation email is send to your email Address'});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message:err});
    }
})

// Resend Activation email by session token
router.post('/resend', async (req, res) => {
    try{
        // check user
        const checkUser = await getUserSessionToken(req.body.sessionToken);
        if(!checkUser) return res.status(400).json({error: 'user not found', acknowledged: false});

        // Send activation mail
        const actMailSent = await activationMail(checkUser.email);
        if(!actMailSent.acknowledged) return res.status(400).json({error: 'error sending confirmation mail Please check the mail address', acknowledged: false});

        checkUser.activationToken = actMailSent.actToken ;
        await checkUser.save();

        res.status(201).json({message: 'verification email is send to your email Address' , acknowledged: true});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message:err});
    }
})

// Resend Activation email by email
router.post('/resendemail', async (req, res) => {
    try{
        // check user
        const checkUser = await getUser(req);
        console.log(checkUser);
        if(!checkUser) return res.status(400).json({error: 'user not found', acknowledged: false});

        // Send activation mail
        const actMailSent = await activationMail(checkUser.email);
        if(!actMailSent.acknowledged) return res.status(400).json({error: 'error sending confirmation mail Please check the mail address', acknowledged: false});

        checkUser.activationToken = actMailSent.actToken ;
        await checkUser.save();

        res.status(201).json({message: 'verification email is send to your email Address' , acknowledged: true});

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message:err});
    }
})

// activate account
router.get('/activate/:token', async (req, res) => {
    try{
        // user exist
        const user = await getUserBytoken(req);
        console.log(user);
        if(!user) return res.status(404).json({error: 'user not found'});
        if(user.account === 'active') return res.status(400).send('Your account is activated already');

        // change account status to active
        user.account = 'active' ;
        user.activationToken = '' ;
        await user.save();

        res.status(201).send('Your account has been activated');

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message:err});
    }
})

// login
router.post('/user', async (req, res) => {
    try{
        // user exist
        const user = await getUser(req);
        if(!user) return res.status(404).json({error: 'user not found'});

        //validating password
        const validPassword = await bcrypt.compare( req.body.password, user.password );

        if(!validPassword) return res.status(404).json({error: 'Incorrect password'});
        if(user.account === 'inactive') return res.status(404).json({error: 'verification not completed, verify your account to login' , active:true});

        // generate session token
        const sesToken = genearateSessionToken(user._id);
        if(!sesToken) res.status(404).json({error: 'user not found'});

        user.sessionToken = sesToken ;
        await user.save();

        res.status(200).json({data: 'logged in successfully' , sessionToken: sesToken})

    }catch(err){
        res.status(500).json({error: 'Internal Server Error', message:err});
    }
})

export const userRouter = router;
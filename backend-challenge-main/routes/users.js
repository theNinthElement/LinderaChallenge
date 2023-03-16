require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../middleware/auth');
const router = express.Router();
const { JWT_SECRET } = process.env;

// create a new user
router.post('/create', async (req, res) => {
    console.log("Test reached here")
    const {name, birthdate, zipCode, phoneNumber} = req.body;
    const user = new User({
        name,
        birthdate,
        zipCode,
        phoneNumber,
    });
    
    user.save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err);
        })
});

//fetch a user through user ID
router.get('/:userId', auth, async (req, res) => {
    User.findById(req.params.userId)
    .then( result => {
        res.status(200).send(result);
    })
    .catch( err => {
        res.status(400).send(err);
        console.log(err);
    })
});


//fetch all users with paging
router.get('/', auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const sort = {}

    const startIndex = ( page -1 ) * limit 
    const endIndex = page * limit  

    if(req.query.sortBy){
        const str = req.query.sortBy.split(':')
        sort[str[0]] = str[1] === 'desc'?-1:1
    }
    
    User.find()
    .sort(sort)
    .then( result => {
        res.status(200).send(result.slice(startIndex, endIndex));
    })
    .catch( err => {
        res.status(400).send(err);
        console.log(err);
    })
});

// update user data by user ID 
router.put('/:userId', auth, async (req, res) => {
    User.updateOne(
        {_id: req.params.userId},
        {$set: {
            name: req.body.name,
            birthdate: req.body.birthdate,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber
        }
    })
    .then ( result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
    })
    .catch(err => {
        res.status(400).send(err);
        console.log(err);
    })
});

//remove a user by user ID 
router.delete('/:userId', auth, async (req, res) => {
    User.findByIdAndDelete(
        req.params.userId 
    )
    .then ( result => {
        console.log(result);
        res.status(200).json({ message: "Delete Successful!!"});
    })
    .catch(err => { 
        res.status(400).send(err);
        console.log(err);
    })
  });

  // loging authentication
  router.post('/login', async (req,res) => {
    const phoneNumber = req.body.phoneNumber;
    User.findOne({
        phoneNumber
    })
    .then(result => {
        const isMatch =  bcrypt.compare (req.body.zipCode, result.zipCode);
        if (isMatch) {
            const token = jwt.sign({ _id: result._id.toString() }, JWT_SECRET);
            res.json({ id: result.id,
                AccessToken : token });
        } else 
        {
            throw new Error('Invalid login credentials');
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(err);
    })
    });

    // logout 
  router.post('/logout', auth, async (req, res) => {
    try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
    } catch (error) {
    res.status(500).send(error);
    }
    });

  module.exports = router;
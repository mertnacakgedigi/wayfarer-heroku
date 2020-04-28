const db = require('../models')
const bcrypt = require('bcrypt')

const register = (req, res) => {
    
    if(!req.body.username || ! req.body.password) {
        return res.status(400).json({
            status : 400,
            message : 'Please enter a name and password'
        })
    }

    db.User.findOne({ username : req.body.username},(err,foundUser)=>{


        if(err) return res.status(500).json({
            status:500,
            message: `There is error here ${err}` 
        })
            
        

        if(foundUser) return res.status(400).send({
            status : 400,
            message : 'This name already exists. Please try with new one '
        })

        bcrypt.genSalt(10,(err,salt) => {
            if(err) return res.status(550).json({
                status : 550, 
                message : `Error here ${err}`
            })

            bcrypt.hash(req.body.password,salt, (err,hash) => {
                if(err) return res.status(530).json({
                    status : 530,
                    message : `Hash errror ${err}`
                })

                const newUser = {
                username : req.body.username,
                password : hash,
                profile_name : req.body.profile_name,
                city : req.body.city
                }

                db.User.create(newUser, (err, savedUser)=> {
                 if(err)  return res.status(510).json({status:510, message : `There is a problem with creatin user ${err}`})
                 
                 res.json(savedUser)
                        
                })

            })
        })
    })
}


const login = (req ,res ) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({status : 400, message : 'Please enter your username and password'})
    }

    db.User.findOne({username:req.body.username}, (err,foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });

        if(!foundUser) {
            if (err) return res.status(500).json({ status: 500, message: 'Username or password is incorret' });
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Try with another password' });

            if(isMatch) {
                req.session.currentUser = {id : foundUser._id}
                return res.status(200).json({status: 200, message : "Succes", data : foundUser._id})
            } else {
                return res.status(400).json({ status: 400, message: 'Username or password is incorret' });
            }
        })
    })
}                                          

const logout = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({status :401, message : 'Unauthorized'})

    req.session.destroy((err)=> {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again' });
        res.sendStatus(200)
    })
}


const verify = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({status : 401, message: 'Unauthorized'})
    res.status(200).json({
        status : 200,
        message : `Current user verified. User ID : ${req.session.currentUser.id}`,
        currentUser : req.session.currentUser
    })
}

module.exports  = {
    register,
    login,
    verify,
    logout
}
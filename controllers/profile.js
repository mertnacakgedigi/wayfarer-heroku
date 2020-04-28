const db =  require('../models')


const show = (req,res) => {
    db.User.findById(req.params.id,(err,foundUser)=> {
        if (err) return err

        db.City.findById(foundUser.city,(err,foundCity)=> {
            if (err) return err

          let profile = [foundCity,foundUser]
            res.json(profile)
            
        })
    } )
}

const updateProfile = (req,res) => {
    db.User.findByIdAndUpdate(req.params.id,req.body, {new : true},(err,updatedProfile)=> {
        if (err) return err
    
        res.json(updatedProfile)
    })
}


module.exports  = {
    show,
    updateProfile
}






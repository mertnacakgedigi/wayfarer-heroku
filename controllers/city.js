const db =  require('../models')

const index = (req,res) => {
    db.City.find({}, (err, allCities) =>{
        if(err) {
            return res.status(400).json({
                staus: 400,
                message: err
            })
        }
        res.json(allCities)
    })
}


module.exports  = {
    index,
}
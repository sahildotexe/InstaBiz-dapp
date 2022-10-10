const Shop = require('../models/shopModel')

const addShop = async(req, res, next) => {
    const {shopname,email,phone_number,uid } = req.body;
    
    try {
        const result = await Shop.create({
            shopname,
            email,
            phone_number,
            uid
        })
        res.status(201).send(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}


const getAllShops = async(req, res, next) => {
    {
        const { uid } = req.query
        const shops = await Shop.find({ uid })
        return res.status(200).send(shops)
    }
}

const getShop = async(req, res, next) => {
    
    const { email } = req.query
    const shops = await Shop.findById({ uid })
    if(!shops) {
        return res.status(404).send('No shop found');
    }
    //todo: check this is how we access uid
    return res.status(200).send(shops.uid)
    
}



module.exports = {
    addShop,
    getAllShops,
    getShop
}
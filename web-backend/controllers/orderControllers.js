const Order = require('../models/orderModel');
const Order = require('../models/orderModel.js');


const addOrder = async(req, res) => {
    const { userID, name, quantity, product, shopID } = req.body;
    console.log(userID);
    try {
        const result = await Order.create({
            userID,
            name,
            quantity,
            product,
            shopID
        })
        return res.status(201).send(result);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

const getAllOrders = async(req, res, next) => {
    {
        //todo: check if this unpacking is correct
        const { userID } = req.query
        const orders = await Order.find({ userID })
        return res.status(200).send(orders)
    }
}
const getOrdersByID = async(req, res, next) => {
    {
        const { userId } = req.params
        //todo: check this auth
        const uid = req.headers.authorization;
        const order = await Order.findById(userId)
        if(!order) {
            return res.status(404).send('No order found');
        }

        return res.status(200).send(order) 
    }
}

module.exports = {
    addOrder,
    getAllOrders,
    getOrdersByID,
    // deleteOrder
}
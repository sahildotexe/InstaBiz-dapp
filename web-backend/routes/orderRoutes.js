const express = require('express')
const {
    addOrder,
    getAllOrders,
    getOrdersByID,
    // deleteOrder
} = require('../controllers/orderControllers')

const router = express.Router()

router.post('/order', addOrder)
router.get('/orders/:shopID', getAllOrders)
router.get('/ordersById/:shopID/:userID', getOrdersByID)
// router.delete('/deleteOrder/:shopID/:userID', deleteOrder)

module.exports = {
    routes: router
}
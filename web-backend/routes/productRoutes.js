const express = require('express')
const {
    addProduct,
    getAllProductsList,
    getProductsList,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productControllers')

const router = express.Router();

router.post('/products', addProduct)
router.get('/productsListAll', getAllProductsList)
router.get('/productsOne/:id/:name', getOneProduct)
router.get('/productList/:shopID', getProductsList)
router.put('/updateProduct/:shopID/:name', updateProduct)
router.get('/deleteProduct/:id', deleteProduct)

module.exports = {
    routes: router
}
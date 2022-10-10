const express= require('express')
const {addUser, getAllUsers, getUser} =require('../controllers/userController')
// const {addProduct, getAllProducts, getProduct, updateProduct, deleteProduct}=require('../controllers/productControllers')

const router= express.Router();

router.post('/user', addUser)
router.get('/usersAll', getAllUsers)
router.get('/userOne/:id', getUser)


module.exports= {
    routes:router
}
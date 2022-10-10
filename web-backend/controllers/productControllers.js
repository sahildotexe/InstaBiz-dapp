const Product = require('../models/productModel.js');


const addProduct = async(req, res, next) => {

    const {name,userID,quantity,product,shopID,image } = req.body;
    console.log(userID);
    try {
        const result = await Product.create({
            name,
            userID,
            quantity,
            product,
            shopID,
            image
        })
        return res.status(201).send(result);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }

}

const getAllProductsList = async(req, res, next) => {
    //todo: in all products why are we querying a specific uid
    const { userID } = req.query
    const products = await Product.find({ userID })
    return res.status(200).send(products)

}


// sends 1 product details as a 2d array
const getProductsList = async(req, res, next) => {

    const { userId } = req.query
    const product = await Order.findById(userId)
    const productsArray = [];

    //todo: check
    // CONVERT product  TO A 2D ARRAY
    product.product.forEach(element => {
        productsArray.push(element.name);
        productsArray.push(element.quantity);
        productsArray.push(element.price);
    });

    return res.send(productsArray);
}

//might be required to fix
const getOneProduct = async(req, res, next) => {

    const { userId,name } = req.query
    const order = await Order.findById(userId)
    //todo: checked both id and name? can only be done by id?
    // find by name
    // const product = order.product.find(element => {
    //     return element.name === name;
    // });
    // res.send(product);
    return res.send(order);
}

const updateProduct = async(req, res, next) => {

    const { userId,name,newdata } = req.query
    const existingProject = await Project.findById(UserId)
    if (!existingProject) return res.status(404).send('Product not found')

    //todo: check and update new data field
    const project = await Project.findByIdAndUpdate(id, newdata)
    return res.status(200).send('Product stock updated successfully')
}

const deleteProduct = async(req, res, next) => {

    const { userId,  } = req.query

    const existingProduct = await Product.findById(userId)
    if (!existingProject) return res.status(404).send('Product not found')
    return res.status(204).send('Product deleted successfully')

}

module.exports = {
    addProduct,
    getAllProductsList,
    getProductsList,
    getOneProduct,
    updateProduct,
    deleteProduct
}
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes')
const shopRoutes = require('./routes/shopRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')


const app = express()
// app.use(express.json())
// app.use(cors())
app.use(require("cors")());
// app.use(bodyParser.json())
app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use('/api', productRoutes.routes)
app.use('/api', shopRoutes.routes)
app.use('/api', userRoutes.routes)
app.use('/api', orderRoutes.routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('server is running on port', PORT)
})
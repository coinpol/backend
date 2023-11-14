
import express from 'express'
import { coinCreate, getCoin, updateCoin } from '../Controller/CoinController.js'
import { getPrice, priceCreate, updatePrice } from '../Controller/PriceController.js'

const router = express.Router()

router.post("/coin",coinCreate)
router.get("/coin",getCoin)
router.patch("/coin/:id",updateCoin)


// price route
router.post("/price",priceCreate)
router.get("/price",getPrice)
router.patch("/price/:id",updatePrice)



export default router
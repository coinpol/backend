import PriceModel from "../Model/PriceModel.js"


export const priceCreate = async (req, res) => {

    try {
        const newCoin = new PriceModel(req.body)
        const createCoin = await newCoin.save()

        if (createCoin) {
            res.status(201).json({ "msg": "created" })
        } else {
            res.status(501).json({ "msg": "server err not created" })
        }
    } catch (error) {
        res.status(501).json({ "msg": "server err" })

    }

}

export const getPrice = async (req, res) => {
    try {
        const price = await PriceModel.find()
        if (price) {
            res.status(200).json({ "msg": "success", price })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

export const updatePrice = async (req, res) => {
   
    try {
        const price = await PriceModel.findOne({ _id: req.params.id })
        if (price) {
            const update = await PriceModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )

            if (update) {
                res.status(200).json({ "msg": "updated SuccessFully" })
            } else {
                res.status(200).json({ "msg": "can't update" })
            }
        }
    } catch (error) {
        res.status(200).json({ "msg": "can't update", error })

    }

}




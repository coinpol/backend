import CoinModel from "../Model/CoinModel.js"


export const coinCreate = async (req, res) => {

    try {
        const newCoin = new CoinModel(req.body)
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

export const getCoin = async (req, res) => {
    try {
        const coinData = await CoinModel.findOne({ active: false })
        if (coinData) {
            res.status(200).json({ "msg": "success", coinData })

        } else {
            res.status(404).json({ "msg": "item not found" })

        }
    } catch (error) {

    }
}

export const updateCoin = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        const coin = await CoinModel.findOne({ _id: req.params.id })
        if (coin) {
            const update = await CoinModel.findOneAndUpdate(
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




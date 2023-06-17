import connect from 'database/connect'
import Receipts from 'database/schemas/receipts'

export default async (req, res) => {
    await connect()

    try {
        const { id } = req.query
        const data = await Receipts.findOne({ order: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

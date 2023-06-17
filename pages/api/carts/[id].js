import connect from 'database/connect'
import Carts from 'database/schemas/carts'

export default async (req, res) => {
    const { id } = req.query
    await connect()

    try {
        const cart = await Carts.find({}).sort({ createdAt: -1 })
        const data = cart.filter((cart) => cart.user.id === id)
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

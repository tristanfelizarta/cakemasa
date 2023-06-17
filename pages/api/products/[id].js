import connect from 'database/connect'
import Products from 'database/schemas/products'

export default async (req, res) => {
    const { id } = req.query
    await connect()

    try {
        const data = await Products.findById({ _id: id })
        res.status(200).send(data)
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

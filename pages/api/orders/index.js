import connect from 'database/connect'
import Users from 'database/schemas/users'
import Products from 'database/schemas/products'
import Carts from 'database/schemas/carts'
import Orders from 'database/schemas/orders'
import Receipts from 'database/schemas/receipts'
import sgMail from '@sendgrid/mail'

export default async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const { method } = req
    await connect()

    switch (method) {
        case 'GET':
            try {
                const data = await Orders.find({}).sort({ createdAt: -1 })
                res.status(200).send(data)
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'POST':
            try {
                const { data } = req.body
                const user = await Users.findById({ _id: data.user })

                const order = await Orders.create({
                    user: {
                        id: user._id,
                        image: user.image,
                        name: user.name,
                        email: user.email,
                        contact: user.contact,
                        address: user.address
                    },
                    items: data.items,
                    subtotal: data.subtotal,
                    discount: data.discount,
                    total: data.total,
                    method: data.method,
                    status: 'To Pay',
                    pay: {
                        status: true,
                        date: new Date().toLocaleString('en-US', {
                            timeZone: 'Asia/Manila'
                        })
                    },
                    created: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    }),
                    updated: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    })
                })

                await Receipts.create({
                    user: user._id,
                    order: order._id,
                    name: user.name,
                    subtotal: order.subtotal,
                    discount: order.discount,
                    total: order.total,
                    created: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    }),
                    updated: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Manila'
                    })
                })

                data.items.map(async (item) => {
                    await Carts.findByIdAndDelete({ _id: item._id })
                })

                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'PATCH':
            try {
                const { id, data } = req.body

                const order = await Orders.findByIdAndUpdate(
                    { _id: id },
                    {
                        ...data,
                        updated: new Date().toLocaleString('en-US', {
                            timeZone: 'Asia/Manila'
                        })
                    }
                )

                if (data.status === 'To Ship') {
                    order.items.map(async (item) => {
                        const product = await Products.findById({
                            _id: item.product.id
                        })

                        await Products.findByIdAndUpdate(
                            { _id: product._id },
                            {
                                stocks: product.stocks - Number(item.quantity),
                                sold: product.sold + Number(item.quantity)
                            }
                        )
                    })

                    sgMail.send({
                        to: order.user.email,
                        from: process.env.EMAIL_FROM,
                        subject: 'Order Is Ready To Ship!',
                        text: '.'
                    })
                }

                if (data.status === 'To Receive') {
                    sgMail.send({
                        to: order.user.email,
                        from: process.env.EMAIL_FROM,
                        subject: 'Order Is Ready To Receive!',
                        text: '.'
                    })
                }

                if (data.status === 'Completed') {
                    sgMail.send({
                        to: order.user.email,
                        from: process.env.EMAIL_FROM,
                        subject: 'Order Is Completed!',
                        text: '.'
                    })
                }

                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        case 'DELETE':
            try {
                res.status(200).send('request success.')
            } catch (error) {
                return res.status(400).send('request failed.')
            }

            break

        default:
            res.status(400).send('request failed.')
            break
    }
}

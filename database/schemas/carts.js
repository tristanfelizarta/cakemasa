import { Schema, model, models } from 'mongoose'

const CartsSchema = new Schema(
    {
        user: {
            id: {
                type: String,
                default: ''
            }
        },
        product: {
            id: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            price: {
                type: Number,
                default: 0
            },
            discount: {
                percentage: {
                    type: Number,
                    default: 0
                }
            }
        },
        quantity: {
            type: Number,
            default: 0
        },
        created: {
            type: String,
            default: ''
        },
        updated: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
)

const Carts = models.Carts || model('Carts', CartsSchema)

export default Carts

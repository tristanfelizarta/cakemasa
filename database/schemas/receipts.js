import { Schema, model, models } from 'mongoose'

const ReceiptSchema = new Schema(
    {
        user: {
            type: String,
            default: ''
        },
        order: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        subtotal: {
            type: String,
            default: ''
        },
        discount: {
            type: String,
            default: ''
        },
        total: {
            type: String,
            default: ''
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

const Receipts = models.Receipts || model('Receipts', ReceiptSchema)

export default Receipts

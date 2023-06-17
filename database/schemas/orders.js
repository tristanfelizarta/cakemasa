import { Schema, model, models } from 'mongoose'

const OrdersSchema = new Schema(
    {
        user: {
            type: Object
        },
        items: {
            type: Array
        },
        subtotal: {
            type: Number
        },
        discount: {
            type: Number
        },
        total: {
            type: Number
        },
        courier: {
            name: {
                type: String,
                default: ''
            },
            contact: {
                type: String,
                default: ''
            }
        },
        method: {
            type: String,
            default: ''
        },
        status: {
            type: String
        },
        pay: {
            status: {
                type: Boolean,
                default: true
            },
            date: {
                type: String,
                default: ''
            }
        },
        ship: {
            status: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: ''
            }
        },
        receive: {
            status: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: ''
            }
        },
        completed: {
            status: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: ''
            }
        },
        reviews: {
            status: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: ''
            }
        },
        cancelled: {
            status: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: ''
            }
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

const Orders = models.Orders || model('Orders', OrdersSchema)

export default Orders

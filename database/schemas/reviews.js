import { Schema, model, models } from 'mongoose'

const ReviewsSchema = new Schema(
    {
        user: {
            type: Object,
            default: {}
        },
        order: {
            id: {
                type: String,
                default: ''
            }
        },
        image: {
            type: String,
            default: ''
        },
        ratings: {
            type: Number,
            default: 5
        },
        reviews: {
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

const Reviews = models.Reviews || model('Reviews', ReviewsSchema)

export default Reviews

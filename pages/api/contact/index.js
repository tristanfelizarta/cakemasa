import sgMail from '@sendgrid/mail'

export default async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    try {
        const { data } = req.body

        sgMail.send({
            to: process.env.EMAIL_FROM,
            from: process.env.EMAIL_FROM,
            subject: data.email,
            text: data.message
        })
        res.status(200).send('request success.')
    } catch (error) {
        return res.status(400).send('request failed.')
    }
}

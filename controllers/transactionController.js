const easyinvoice = require('easyinvoice')
const { Course, Transaction } = require('../models')

class TransactionController {
    static async formTf(req, res) {
        try {
            const user = req.session.user

        if (!user) {
            return res.redirect('/?error=Silakan login terlebih dahulu')
        }

        const { id } = req.params
        const course = await Course.findByPk(id)

        if (!course) {
            return res.redirect('/home?error=Course tidak ditemukan')
        }

        let transaction = await Transaction.findOne({
            where: {
                UserId: user.id,
                CourseId: course.id
            }
        })

        if (!transaction) {
            transaction = await Transaction.create({
                UserId: user.id,
                CourseId: course.id,
                totalAmount: course.price,
                paymentStatus: 'unpaid',
                invoiceNumber: `INV-JSK-${user.id}-${course.id}-${Date.now()}`
            })
        }

        res.render('transaction', { user, course, transaction })
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }

    static async createTransaction(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    static async invoice(req, res) {
        try {
            const user = req.session.user || {
                username: 'Student JSKuy',
                email: 'student@jskuy.com'
            }
            const { id } = req.params

            const course = await Course.findByPk(id)

            if (!course) {
                return res.redirect('/home?error=Course tidak ditemukan')
            }

            const data = {
                currency: "IDR",
                taxNotation: "vat",
                marginTop: 25,
                marginRight: 25,
                marginLeft: 25,
                marginBottom: 25,

                sender: {
                    company: "JSKuy",
                    address: "Online Learning Platform",
                    city: "Jakarta",
                    country: "Indonesia"
                },

                client: {
                    company: user.username,
                    address: user.email
                },

                invoiceNumber: `INV-JSK-${course.id}-${Date.now()}`,

                invoiceDate: new Date().toLocaleDateString('id-ID'),

                products: [
                    {
                        quantity: 1,
                        description: course.title,
                        price: Number(course.price)
                    }
                ],

                bottomNotice: "Terima kasih telah mendaftar course di JSKuy.",
                settings: {
                    currency: "IDR"
                }
            }

            const result = await easyinvoice.createInvoice(data)

            const pdfBuffer = Buffer.from(result.pdf, 'base64')

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename=invoice-${course.id}.pdf`)

            res.send(pdfBuffer)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }
}

module.exports = { TransactionController }
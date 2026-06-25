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

    static async createPayment(req, res) {
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

            const transaction = await Transaction.findOne({
                where: {
                    UserId: user.id,
                    CourseId: course.id
                }
            })

            if (!transaction) {
                return res.redirect(`/home/courses/${id}/transaction?error=Transaksi tidak ditemukan`)
            }

            res.render('paymentPage', { user, course, transaction })
        } catch (error) {
            res.send(error)
        }
    }

    static async finishPayment(req, res) {
        try {
            const user = req.session.user

            if (!user) {
                return res.redirect('/?error=Silakan login terlebih dahulu')
            }

            const { id } = req.params

            const transaction = await Transaction.findOne({
                where: {
                    UserId: user.id,
                    CourseId: id
                }
            })

            if (!transaction) {
                return res.redirect(`/home/courses/${id}/transaction?error=Transaksi tidak ditemukan`)
            }

            await transaction.update({
                paymentStatus: 'paid'
            })

            res.redirect(`/home/courses/${id}/transaction`)
            res.render()
        } catch (error) {
            res.send(error)
        }
    }

    static async invoice(req, res) {
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

            const transaction = await Transaction.findOne({
                where: {
                    UserId: user.id,
                    CourseId: course.id
                }
            })

            if (!transaction) {
                return res.redirect(`/home/courses/${id}/transaction?error=Transaksi tidak ditemukan`)
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

                //? ini invoice number
                invoiceNumber: transaction.invoiceNumber,
                invoiceDate: new Date(transaction.createdAt).toLocaleDateString('id-ID'),

                products: [
                    {
                        quantity: 1,
                        description: `${course.title} (Course ID: ${transaction.CourseId})`,
                        price: Number(transaction.totalAmount)
                    }
                ],

                bottomNotice:
                    `Payment Status: ${transaction.paymentStatus.toUpperCase()} | User ID: ${transaction.UserId} | Course ID: ${transaction.CourseId}`,

                settings: {
                    currency: "IDR"
                }
            }

            const result = await easyinvoice.createInvoice(data)
            const pdfBuffer = Buffer.from(result.pdf, 'base64')

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename=${transaction.invoiceNumber}.pdf`)

            res.send(pdfBuffer)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }
}

module.exports = { TransactionController }
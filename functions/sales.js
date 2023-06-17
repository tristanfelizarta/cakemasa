import moment from 'moment'

export const sales = (sales, period) => {
    let total = 0

    if (period === 'daily') {
        sales.forEach((sale) => {
            if (moment(sale.date).isSame(moment(), 'day')) {
                total += sale.total
            }
        })
    } else if (period === 'weekly') {
        sales.forEach((sale) => {
            if (moment(sale.date).isSame(moment(), 'week')) {
                total += sale.total
            }
        })
    } else if (period === 'monthly') {
        sales.forEach((sale) => {
            if (moment(sale.date).isSame(moment(), 'month')) {
                total += sale.total
            }
        })
    } else if (period === 'yearly') {
        sales.forEach((sale) => {
            if (moment(sale.date).isSame(moment(), 'year')) {
                total += sale.total
            }
        })
    }

    return total
}

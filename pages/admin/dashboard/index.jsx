import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Button,
    chakra,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Select,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FiPrinter } from 'react-icons/fi'
import Statistics from 'components/dashboard/statistics'
import Orders from 'components/dashboard/orders'
import Modal from 'components/modal'
import { currency } from 'functions/currency'
import { month } from 'functions/month'

const PrintSales = ({ users, isUsersFetched, status, reports }) => {
    const disclosure = useDisclosure()
    let today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
    console.log(reports)

    const sold = (orders) => {
        let sum = 0

        orders.map((order) => {
            order.items.items.map((item) => {
                sum += item.quantity
            })
        })

        return sum
    }

    const sold_item = (item) => {
        let sum = 0

        item.items.items.map((item) => {
            sum += item.quantity
        })

        return sum
    }

    return (
        <Modal
            header="off"
            size="2xl"
            toggle={(onOpen) => (
                <Button
                    size="lg"
                    colorScheme="brand"
                    leftIcon={<FiPrinter size={16} />}
                    onClick={() => {
                        onOpen()

                        setTimeout(() => {
                            window.print()
                        }, 500)
                    }}
                >
                    Print Sales
                </Button>
            )}
            disclosure={disclosure}
        >
            <chakra.div bg="white" m={-6} p={6}>
                <Flex direction="column" gap={6}>
                    <Flex direction="column">
                        <Text
                            fontSize={24}
                            fontWeight="bold"
                            textTransform="capitalize"
                            textAlign="center"
                            color="black"
                        >
                            {status} Sales Report
                        </Text>

                        <Text
                            fontSize={14}
                            fontWeight="semibold"
                            textAlign="center"
                            color="black"
                        >
                            {status === 'gross'
                                ? month[
                                      reports?.items[
                                          reports.items.length - 1
                                      ]?.date.split('/')[0] - 1
                                  ] +
                                  ' ' +
                                  reports?.items[
                                      reports.items.length - 1
                                  ]?.date.split('/')[1] +
                                  ', ' +
                                  reports?.items[
                                      reports.items.length - 1
                                  ]?.date.split('/')[2] +
                                  ' - ' +
                                  month[
                                      reports?.items[0]?.date.split('/')[0] - 1
                                  ] +
                                  ' ' +
                                  reports?.items[0]?.date.split('/')[1] +
                                  ', ' +
                                  reports?.items[0]?.date.split('/')[2]
                                : status === 'daily'
                                ? month[today.split(',')[0].split('/')[0] - 1] +
                                  ' ' +
                                  today.split(',')[0].split('/')[1] +
                                  ', ' +
                                  today.split(',')[0].split('/')[2]
                                : status === 'monthly'
                                ? month[today.split(',')[0].split('/')[0] - 1] +
                                  ' ' +
                                  today.split(',')[0].split('/')[2]
                                : status === 'yearly' &&
                                  today.split(',')[0].split('/')[2]}
                        </Text>
                    </Flex>

                    <Divider />

                    <Flex direction="column" gap={3}>
                        <Flex justify="space-between" align="center" gap={6}>
                            <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textAlign="center"
                                color="black"
                            >
                                Total Sales
                            </Text>

                            <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textAlign="center"
                                color="black"
                            >
                                {currency(reports.sales)}
                            </Text>
                        </Flex>

                        <Flex justify="space-between" align="center" gap={6}>
                            <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textAlign="center"
                                color="black"
                            >
                                Total Sold
                            </Text>

                            <Text
                                fontSize={14}
                                fontWeight="semibold"
                                textAlign="center"
                                color="black"
                            >
                                {sold(reports.items)}
                            </Text>
                        </Flex>
                    </Flex>

                    <Divider />

                    <Flex direction="column" gap={3}>
                        <Flex justify="space-evenly" gap={6}>
                            <Flex
                                flex={1}
                                direction="column"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize={14}
                                    fontWeight="semibold"
                                    color="black"
                                >
                                    Customer
                                </Text>

                                {reports.items?.map((item, index) => (
                                    <Flex
                                        justify="space-around"
                                        gap={3}
                                        key={index}
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="medium"
                                            textAlign="center"
                                            color="black"
                                        >
                                            {isUsersFetched
                                                ? users
                                                      .filter(
                                                          (user) =>
                                                              user._id ===
                                                              item.items.user.id
                                                      )
                                                      .map((user) => {
                                                          return user.name.split(
                                                              ' '
                                                          )[0]
                                                      })
                                                : ''}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>

                            <Flex
                                flex={1}
                                direction="column"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize={14}
                                    fontWeight="semibold"
                                    color="black"
                                >
                                    Sold
                                </Text>

                                {reports.items?.map((item, index) => (
                                    <Flex
                                        justify="space-around"
                                        gap={3}
                                        key={index}
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="medium"
                                            textAlign="center"
                                            color="black"
                                        >
                                            {sold_item(item)}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>

                            <Flex
                                flex={1}
                                direction="column"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize={14}
                                    fontWeight="semibold"
                                    color="black"
                                >
                                    Sales
                                </Text>

                                {reports.items?.map((item, index) => (
                                    <Flex
                                        justify="space-around"
                                        gap={3}
                                        key={index}
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="medium"
                                            textAlign="center"
                                            color="black"
                                        >
                                            {currency(item.items.total)}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>

                            <Flex
                                flex={1}
                                direction="column"
                                align="center"
                                gap={3}
                            >
                                <Text
                                    fontSize={14}
                                    fontWeight="semibold"
                                    color="black"
                                >
                                    Date
                                </Text>

                                {reports.items?.map((item, index) => (
                                    <Flex
                                        justify="space-around"
                                        gap={3}
                                        key={index}
                                    >
                                        <Text
                                            fontSize={14}
                                            fontWeight="medium"
                                            textAlign="center"
                                            color="black"
                                        >
                                            {item.date}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </chakra.div>
        </Modal>
    )
}

const Dashboard = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: products, isFetched: isProductsFetched } = useQuery(
        ['products'],
        () => api.all('/products')
    )
    const { data: orders, isFetched: isOrdersFetched } = useQuery(
        ['orders'],
        () => api.all('/orders')
    )
    const { register, watch, setValue } = useForm()

    const completed = isOrdersFetched
        ? orders
              .filter((order) => order.completed.status)
              .map((order) => {
                  return {
                      items: order,
                      date: order.completed.date.split(',')[0],
                      total: order.total
                  }
              })
        : []

    const reports = (status, orders) => {
        let today = new Date()
            .toLocaleString('en-US', { timeZone: 'Asia/Manila' })
            .split(',')[0]
        let sales = 0
        let items = []

        if (status === 'gross') {
            orders.map((order) => {
                sales += order.total
                items.push(order)
            })

            return { sales, items }
        }

        if (status === 'daily') {
            orders.map((order) => {
                if (order.date === today) {
                    sales += order.total
                    items.push(order)
                }
            })

            return { sales, items }
        }

        if (status === 'monthly') {
            orders.map((order) => {
                if (order.date.split('/')[0] === today.split('/')[0]) {
                    sales += order.total
                    items.push(order)
                }
            })

            return { sales, items }
        }

        if (status === 'yearly') {
            orders.map((order) => {
                if (order.date.split('/')[2] === today.split('/')[2]) {
                    sales += order.total
                    items.push(order)
                }
            })

            return { sales, items }
        }
    }

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Dashboard
                    </Text>

                    <Flex gap={3}>
                        <Select
                            placeholder="Gross Sales"
                            size="lg"
                            w="auto"
                            {...register('sales')}
                        >
                            <chakra.option value="daily">
                                Daily Sales
                            </chakra.option>
                            <chakra.option value="monthly">
                                Monthly Sales
                            </chakra.option>
                            <chakra.option value="yearly">
                                Yearly Sales
                            </chakra.option>
                        </Select>

                        <PrintSales
                            users={users}
                            isUsersFetched={isUsersFetched}
                            status={watch('sales') ? watch('sales') : 'gross'}
                            reports={
                                watch('sales')
                                    ? watch('sales') === 'daily'
                                        ? reports('daily', completed)
                                        : watch('sales') === 'monthly'
                                        ? reports('monthly', completed)
                                        : watch('sales') === 'yearly' &&
                                          reports('yearly', completed)
                                    : reports('gross', completed)
                            }
                        />
                    </Flex>
                </Flex>

                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <Statistics
                        users={users}
                        isUsersFetched={isUsersFetched}
                        products={products}
                        isProductsFetched={isProductsFetched}
                        orders={orders}
                        isOrdersFetched={isOrdersFetched}
                        sales={watch('sales')}
                        completed={completed}
                        reports={reports}
                    />

                    <GridItem colSpan={12}>
                        <Orders />
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    )
}

export default Dashboard

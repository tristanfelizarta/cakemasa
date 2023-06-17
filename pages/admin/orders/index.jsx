import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Badge,
    Container,
    Flex,
    IconButton,
    Select,
    Td,
    Text,
    Tr
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import { month } from 'functions/month'

const Orders = () => {
    const router = useRouter()
    const { data: orders, isFetched: isOrdersFetched } = useQuery(
        ['orders'],
        () => api.all('/orders')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Orders
                    </Text>
                </Flex>

                <Card>
                    <Table
                        data={orders}
                        fetched={isOrdersFetched}
                        th={[
                            'Order ID',
                            'Customer',
                            'Product',
                            'Total',
                            'Payment Method',
                            'Status',
                            'Created',
                            ''
                        ]}
                        td={(order) => (
                            <Tr key={order._id}>
                                <Td>
                                    <Text fontWeight="semibold">
                                        #{order._id.toUpperCase().slice(15, 25)}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text textTransform="capitalize">
                                        {order.user.name}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text>x{order.items.length}</Text>
                                </Td>

                                <Td>
                                    <Text>₱{order.total.toFixed(2)}</Text>
                                </Td>

                                <Td>
                                    <Badge variant="tinted" colorScheme="brand">
                                        {order.method}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            order.status === 'Cancelled'
                                                ? 'red'
                                                : 'brand'
                                        }
                                    >
                                        {order.status === 'To Pay'
                                            ? 'Pending'
                                            : order.status === 'To Ship'
                                            ? 'To Pick Up'
                                            : order.status === 'To Receive'
                                            ? 'To Deliver'
                                            : order.status === 'Completed'
                                            ? 'Completed'
                                            : order.status === 'Cancelled' &&
                                              'Cancelled'}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Text>
                                        {month[
                                            order.created
                                                .split(',')[0]
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            order.created
                                                .split(',')[0]
                                                .split('/')[1] +
                                            ', ' +
                                            order.created
                                                .split(',')[0]
                                                .split('/')[2]}
                                    </Text>
                                </Td>

                                <Td>
                                    <Flex justify="right">
                                        <IconButton
                                            size="xs"
                                            icon={
                                                <FiMoreHorizontal size={12} />
                                            }
                                            onClick={() =>
                                                router.push(
                                                    `/admin/orders/${order._id}`
                                                )
                                            }
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        )}
                        select={(register) => (
                            <Flex flex={1} justify="end" align="center" gap={3}>
                                <Select
                                    placeholder="Status"
                                    size="lg"
                                    w="auto"
                                    {...register('status')}
                                >
                                    <option value="To Pay">Pending</option>
                                    <option value="To Ship">To Pick Up</option>
                                    <option value="To Receive">
                                        To Deliver
                                    </option>
                                    <option value="Completed">Completed</option>
                                </Select>
                            </Flex>
                        )}
                        filters={(data, watch) => {
                            return data
                                .filter((data) =>
                                    ['_id'].some((key) =>
                                        data[key]
                                            .toString()
                                            .toLowerCase()
                                            .includes(
                                                watch('search') &&
                                                    watch(
                                                        'search'
                                                    ).toLowerCase()
                                            )
                                    )
                                )

                                .filter((data) =>
                                    watch('status')
                                        ? watch('status') === data.status
                                        : data
                                )
                        }}
                        effects={(watch) => [watch('status')]}
                    />
                </Card>
            </Flex>
        </Container>
    )
}

export default Orders

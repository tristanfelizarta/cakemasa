import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
    Badge,
    Flex,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import { month } from 'functions/month'

const Orders = ({ user, orders }) => {
    const router = useRouter()
    const { data: session } = useSession()

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Orders
                </Text>

                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Total</Th>
                                <Th>Payment Method</Th>
                                <Th>Status</Th>
                                <Th>Created</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {orders
                                .filter((order) => order.user.id === user._id)
                                .map((order) => (
                                    <Tr key={order._id}>
                                        <Td>
                                            <Text>x{order.items.length}</Text>
                                        </Td>

                                        <Td>
                                            <Text>
                                                ₱{order.total.toFixed(2)}
                                            </Text>
                                        </Td>

                                        <Td>
                                            <Badge
                                                variant="tinted"
                                                colorScheme="brand"
                                            >
                                                {order.method}
                                            </Badge>
                                        </Td>

                                        <Td>
                                            <Badge
                                                variant="tinted"
                                                colorScheme="brand"
                                            >
                                                {order.status === 'To Pay'
                                                    ? 'Pending'
                                                    : order.status === 'To Ship'
                                                    ? 'To Pick Up'
                                                    : order.status ===
                                                      'To Receive'
                                                    ? 'To Deliver'
                                                    : order.status ===
                                                      'Completed'
                                                    ? 'Completed'
                                                    : order.status ===
                                                          'Cancelled' &&
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
                                                        <FiMoreHorizontal
                                                            size={12}
                                                        />
                                                    }
                                                    onClick={() =>
                                                        router.push(
                                                            session.user
                                                                .role ===
                                                                'Admin'
                                                                ? `/admin/orders/${order._id}`
                                                                : `/orders/${order._id}`
                                                        )
                                                    }
                                                />
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Card>
    )
}

export default Orders

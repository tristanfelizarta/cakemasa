import {
    Flex,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import Card from 'components/card'

const Items = ({ order }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Items Summary
                </Text>

                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Discount</Th>
                                <Th>Total</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {order.items.map((item) => (
                                <Tr key={item._id}>
                                    <Td>
                                        <Flex align="center" gap={3}>
                                            <Image
                                                borderRadius={8}
                                                boxSize={8}
                                                alt={item.product.name}
                                                src={item.product.image}
                                            />
                                            <Text>{item.product.name}</Text>
                                        </Flex>
                                    </Td>

                                    <Td>
                                        <Text>x{item.quantity}</Text>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱{item.product.price.toFixed(2)}
                                        </Text>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱
                                            {(
                                                item.product.price *
                                                item.quantity *
                                                (item.product.discount
                                                    .percentage /
                                                    100)
                                            ).toFixed(2)}
                                        </Text>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱
                                            {(
                                                item.product.price *
                                                    item.quantity -
                                                item.product.price *
                                                    item.quantity *
                                                    (item.product.discount
                                                        .percentage /
                                                        100)
                                            ).toFixed(2)}
                                        </Text>
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

export default Items

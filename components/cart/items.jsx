import NextLink from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import {
    Flex,
    IconButton,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { FiMinus, FiPlus, FiX } from 'react-icons/fi'
import Card from 'components/card'
import Toast from 'components/toast'

const Items = ({ carts }) => {
    const queryClient = useQueryClient()
    const toast = useToast()

    const editMutation = useMutation(
        (data) => api.update('/carts', data.id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('carts')

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Cart item updated successfully."
                        />
                    )
                })
            }
        }
    )

    const deleteMutation = useMutation(
        (data) => api.remove('/carts', data.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('carts')

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Cart item deleted successfully."
                        />
                    )
                })
            }
        }
    )

    const minusQuantity = (cart) => {
        editMutation.mutate({
            id: cart._id,
            quantity: cart.quantity - 1
        })
    }

    const addQuantity = (cart) => {
        editMutation.mutate({
            id: cart._id,
            quantity: cart.quantity + 1
        })
    }

    const onDelete = (cart) => {
        deleteMutation.mutate({
            id: cart._id
        })
    }

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
                                <Th></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {carts.map((cart) => (
                                <Tr key={cart._id}>
                                    <Td>
                                        <Flex align="center" gap={3}>
                                            <Image
                                                borderRadius={8}
                                                boxSize={8}
                                                alt={cart.product.name}
                                                src={cart.product.image}
                                            />

                                            <NextLink
                                                href={`/shop/${cart.product.id}`}
                                                passHref
                                            >
                                                <Text
                                                    overflow="hidden"
                                                    w={128}
                                                    textOverflow="ellipsis"
                                                >
                                                    {cart.product.name}
                                                </Text>
                                            </NextLink>
                                        </Flex>
                                    </Td>

                                    <Td>
                                        <Flex align="center" gap={3}>
                                            <IconButton
                                                variant="ghost"
                                                size="xs"
                                                icon={<FiMinus size={12} />}
                                                disabled={cart.quantity === 1}
                                                onClick={() =>
                                                    minusQuantity(cart)
                                                }
                                            />
                                            <Text>{cart.quantity}</Text>
                                            <IconButton
                                                variant="ghost"
                                                size="xs"
                                                icon={<FiPlus size={12} />}
                                                onClick={() =>
                                                    addQuantity(cart)
                                                }
                                            />
                                        </Flex>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱{cart.product.price.toFixed(2)}
                                        </Text>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱
                                            {(
                                                cart.product.price *
                                                cart.quantity *
                                                (cart.product.discount
                                                    .percentage /
                                                    100)
                                            ).toFixed(2)}
                                        </Text>
                                    </Td>

                                    <Td>
                                        <Text>
                                            ₱
                                            {(
                                                cart.product.price *
                                                    cart.quantity -
                                                cart.product.price *
                                                    cart.quantity *
                                                    (cart.product.discount
                                                        .percentage /
                                                        100)
                                            ).toFixed(2)}
                                        </Text>
                                    </Td>

                                    <Td>
                                        <Flex justify="right">
                                            <IconButton
                                                variant="tinted"
                                                size="xs"
                                                colorScheme="red"
                                                icon={<FiX size={12} />}
                                                onClick={() => onDelete(cart)}
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

export default Items

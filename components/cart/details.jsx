import { Divider, Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'

const Details = ({ user, carts, subtotal, discount, total }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Order Summary
                </Text>

                <Flex direction="column" gap={3}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Subtotal
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{subtotal(carts).toFixed(2)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Discount
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{discount(carts).toFixed(2)}
                        </Text>
                    </Flex>

                    <Divider />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Total
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{total(carts).toFixed(2)}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default Details

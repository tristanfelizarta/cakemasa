import { Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'

const Address = ({ order }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Delivery Address
                </Text>

                <Text fontSize="sm" fontWeight="medium" color="accent-1">
                    {order.user.address.region +
                        ', ' +
                        order.user.address.city +
                        ', ' +
                        order.user.address.barangay +
                        ', ' +
                        order.user.address.streets +
                        ', ' +
                        order.user.address.postal}
                </Text>
            </Flex>
        </Card>
    )
}

export default Address

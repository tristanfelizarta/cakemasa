import { useRouter } from 'next/router'
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'

const Customer = ({ order }) => {
    const router = useRouter()

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Customer Details
                </Text>

                <Flex align="center" gap={3}>
                    <Avatar
                        h={10}
                        w={10}
                        name={order.user.name}
                        src={order.user.image}
                    />

                    <Flex flex={1} direction="column">
                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            lineHeight={5}
                            color="accent-1"
                            noOfLines={1}
                        >
                            {order.user.name}
                        </Text>

                        <Text fontSize="sm" lineHeight={5} noOfLines={1}>
                            {order.user.email}
                        </Text>
                    </Flex>

                    <IconButton
                        icon={<FiMoreHorizontal size={16} />}
                        onClick={() =>
                            router.push(`/admin/accounts/${order.user.id}`)
                        }
                    />
                </Flex>
            </Flex>
        </Card>
    )
}

export default Customer

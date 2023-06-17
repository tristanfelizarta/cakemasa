import { chakra, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import Card from './card'

const Incentives = () => {
    return (
        <chakra.section>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                <Card>
                    <Flex align="center" gap={6}>
                        <Image w={16} alt="truck" src="/assets/truck.png" />

                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="semibold"
                                color="accent-1"
                            >
                                Cash On Delivery
                            </Text>

                            <Text fontSize="sm" color="accent-1">
                                Your order is in our safe hands
                            </Text>
                        </Flex>
                    </Flex>
                </Card>

                <Card>
                    <Flex align="center" gap={6}>
                        <Image w={16} alt="support" src="/assets/support.png" />

                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="semibold"
                                color="accent-1"
                            >
                                Dedicated Support
                            </Text>

                            <Text fontSize="sm" color="accent-1">
                                Customer service all the time
                            </Text>
                        </Flex>
                    </Flex>
                </Card>

                <Card>
                    <Flex align="center" gap={6}>
                        <Image w={16} alt="money" src="/assets/money.png" />

                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="semibold"
                                color="accent-1"
                            >
                                Money Back Guarantee
                            </Text>

                            <Text fontSize="sm" color="accent-1">
                                We guarantee the worthiness of every money
                                transaction
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </SimpleGrid>
        </chakra.section>
    )
}

export default Incentives

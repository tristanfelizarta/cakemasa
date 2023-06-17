import { Flex, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiGrid, FiPackage, FiUsers } from 'react-icons/fi'
import Card from 'components/card'
import { currency } from 'functions/currency'

const Statistics = ({
    users,
    isUsersFetched,
    products,
    isProductsFetched,
    orders,
    isOrdersFetched,
    sales,
    completed,
    reports
}) => {
    return (
        <>
            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isUsersFetched ? users.length : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Customers
                            </Text>
                        </Flex>

                        <Flex
                            bg="brand.default"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon as={FiUsers} boxSize={6} color="white" />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isProductsFetched ? products.length : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Products
                            </Text>
                        </Flex>

                        <Flex
                            bg="brand.default"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon as={FiGrid} boxSize={6} color="white" />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {isOrdersFetched
                                    ? orders.filter(
                                          (order) =>
                                              order.status === 'Completed'
                                      ).length
                                    : 0}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Total Orders
                            </Text>
                        </Flex>

                        <Flex
                            bg="brand.default"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Icon as={FiPackage} boxSize={6} color="white" />
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
                <Card>
                    <Flex justify="space-between" align="center">
                        <Flex direction="column" gap={1} w="calc(100% - 76px)">
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                color="accent-1"
                                noOfLines={1}
                            >
                                {sales
                                    ? sales === 'daily'
                                        ? currency(
                                              reports('daily', completed).sales
                                          )
                                        : sales === 'monthly'
                                        ? currency(
                                              reports('monthly', completed)
                                                  .sales
                                          )
                                        : sales === 'yearly' &&
                                          currency(
                                              reports('yearly', completed).sales
                                          )
                                    : currency(
                                          reports('gross', completed).sales
                                      )}
                            </Text>

                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="accent-1"
                            >
                                Gross Sales
                            </Text>
                        </Flex>

                        <Flex
                            bg="brand.default"
                            justify="center"
                            align="center"
                            borderRadius="full"
                            h={16}
                            w={16}
                        >
                            <Text fontSize={24} color="white">
                                ₱
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </GridItem>
        </>
    )
}

export default Statistics

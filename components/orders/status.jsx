import { Flex, Icon, Text } from '@chakra-ui/react'
import {
    FiCheck,
    FiCreditCard,
    FiPackage,
    FiStar,
    FiTruck,
    FiX
} from 'react-icons/fi'
import Card from 'components/card'
import { month } from 'functions/month'

const Status = ({ order }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Order Status
                </Text>

                <Flex direction="column" gap={3}>
                    {order.pay.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="brand.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon
                                        as={FiCreditCard}
                                        boxSize={4}
                                        color="white"
                                    />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Pending
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Text fontSize="xs">
                                    {month[
                                        order.pay.date
                                            .split(',')[0]
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        order.pay.date
                                            .split(',')[0]
                                            .split('/')[1] +
                                        ', ' +
                                        order.pay.date
                                            .split(',')[0]
                                            .split('/')[2]}
                                </Text>
                                <Text fontSize="xs">
                                    {order.pay.date.split(',')[1].trim()}
                                </Text>
                            </Flex>
                        </Flex>
                    )}

                    {order.ship.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="brand.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon
                                        as={FiPackage}
                                        boxSize={4}
                                        color="white"
                                    />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    To Pick Up
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Text fontSize="xs">
                                    {month[
                                        order.ship.date
                                            .split(',')[0]
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        order.ship.date
                                            .split(',')[0]
                                            .split('/')[1] +
                                        ', ' +
                                        order.ship.date
                                            .split(',')[0]
                                            .split('/')[2]}
                                </Text>
                                <Text fontSize="xs">
                                    {order.ship.date.split(',')[1].trim()}
                                </Text>
                            </Flex>
                        </Flex>
                    )}

                    {order.receive.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="brand.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon
                                        as={FiTruck}
                                        boxSize={4}
                                        color="white"
                                    />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    To Deliver
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Text fontSize="xs">
                                    {month[
                                        order.receive.date
                                            .split(',')[0]
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        order.receive.date
                                            .split(',')[0]
                                            .split('/')[1] +
                                        ', ' +
                                        order.receive.date
                                            .split(',')[0]
                                            .split('/')[2]}
                                </Text>
                                <Text fontSize="xs">
                                    {order.receive.date.split(',')[1].trim()}
                                </Text>
                            </Flex>
                        </Flex>
                    )}

                    {order.completed.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="brand.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon
                                        as={FiCheck}
                                        boxSize={4}
                                        color="white"
                                    />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Completed
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Flex direction="column" align="end">
                                    <Text fontSize="xs">
                                        {month[
                                            order.completed.date
                                                .split(',')[0]
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            order.completed.date
                                                .split(',')[0]
                                                .split('/')[1] +
                                            ', ' +
                                            order.completed.date
                                                .split(',')[0]
                                                .split('/')[2]}
                                    </Text>
                                    <Text fontSize="xs">
                                        {order.completed.date
                                            .split(',')[1]
                                            .trim()}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}

                    {order.reviews.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="brand.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon
                                        as={FiStar}
                                        boxSize={4}
                                        color="white"
                                    />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Reviews
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Flex direction="column" align="end">
                                    <Text fontSize="xs">
                                        {month[
                                            order.reviews.date
                                                .split(',')[0]
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            order.reviews.date
                                                .split(',')[0]
                                                .split('/')[1] +
                                            ', ' +
                                            order.reviews.date
                                                .split(',')[0]
                                                .split('/')[2]}
                                    </Text>
                                    <Text fontSize="xs">
                                        {order.reviews.date
                                            .split(',')[1]
                                            .trim()}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}

                    {order.cancelled.status && (
                        <Flex justify="space-between" align="center" gap={6}>
                            <Flex align="center" gap={3}>
                                <Flex
                                    bg="red.default"
                                    justify="center"
                                    align="center"
                                    borderRadius="full"
                                    h={8}
                                    w={8}
                                >
                                    <Icon as={FiX} boxSize={4} color="white" />
                                </Flex>

                                <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="accent-1"
                                >
                                    Cancelled
                                </Text>
                            </Flex>

                            <Flex direction="column" align="end">
                                <Text fontSize="xs">
                                    {month[
                                        order.cancelled.date
                                            .split(',')[0]
                                            .split('/')[0] - 1
                                    ] +
                                        ' ' +
                                        order.cancelled.date
                                            .split(',')[0]
                                            .split('/')[1] +
                                        ', ' +
                                        order.cancelled.date
                                            .split(',')[0]
                                            .split('/')[2]}
                                </Text>
                                <Text fontSize="xs">
                                    {order.cancelled.date.split(',')[1].trim()}
                                </Text>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Card>
    )
}

export default Status

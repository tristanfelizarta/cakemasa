import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Avatar,
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

const Accounts = () => {
    const router = useRouter()
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: orders, isFetched: isOrdersFetched } = useQuery(
        ['orders'],
        () => api.all('/orders')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Accounts
                    </Text>
                </Flex>

                <Card>
                    <Table
                        data={users}
                        fetched={isUsersFetched && isOrdersFetched}
                        th={[
                            'Full Name',
                            'Email',
                            'Orders',
                            'Role',
                            'Status',
                            'Joined',
                            ''
                        ]}
                        td={(user) => (
                            <Tr key={user._id}>
                                <Td>
                                    <Flex align="center" gap={3} maxW={256}>
                                        <Avatar
                                            name={user.name}
                                            src={user.image}
                                        />

                                        <Text
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            {user.name}
                                        </Text>
                                    </Flex>
                                </Td>

                                <Td>
                                    <Text>{user.email}</Text>
                                </Td>

                                <Td>
                                    <Text>
                                        {
                                            orders
                                                .filter(
                                                    (order) =>
                                                        order.user.id ===
                                                        user._id
                                                )
                                                .filter(
                                                    (order) =>
                                                        order.status ===
                                                        'Completed'
                                                ).length
                                        }
                                    </Text>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            user.role === 'Admin'
                                                ? 'yellow'
                                                : 'blue'
                                        }
                                    >
                                        {user.role}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            user.status === 'Active'
                                                ? 'blue'
                                                : 'red'
                                        }
                                    >
                                        {user.status}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Text>
                                        {month[
                                            user.created
                                                .split(',')[0]
                                                .trim()
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            user.created
                                                .split(',')[0]
                                                .trim()
                                                .split('/')[1] +
                                            ', ' +
                                            user.created
                                                .split(',')[0]
                                                .trim()
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
                                                    `/admin/accounts/${user._id}`
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
                                    placeholder="Role"
                                    size="lg"
                                    w="auto"
                                    {...register('role')}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Customer">Customer</option>
                                </Select>

                                <Select
                                    placeholder="Status"
                                    size="lg"
                                    w="auto"
                                    {...register('status')}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Select>
                            </Flex>
                        )}
                        filters={(data, watch) => {
                            return data
                                .filter((data) =>
                                    ['name', 'email'].some((key) =>
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
                                    watch('role')
                                        ? watch('role') === data.role
                                        : data
                                )
                                .filter((data) =>
                                    watch('status')
                                        ? watch('status') === data.status
                                        : data
                                )
                        }}
                        effects={(watch) => [watch('role'), watch('status')]}
                    />
                </Card>
            </Flex>
        </Container>
    )
}

export default Accounts

import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Badge,
    Button,
    chakra,
    Container,
    Flex,
    IconButton,
    Image,
    Select,
    Td,
    Text,
    Tr
} from '@chakra-ui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from 'components/card'
import Table from 'components/table'
import { month } from 'functions/month'

const Products = () => {
    const router = useRouter()
    const { data: products, isFetched: isProductsFetched } = useQuery(
        ['products'],
        () => api.all('/products')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Products
                    </Text>
                </Flex>

                <Card>
                    <Table
                        data={products}
                        fetched={isProductsFetched}
                        th={[
                            'Product',
                            'Stocks',
                            'Price',
                            'Sold',
                            'Status',
                            'Created',
                            ''
                        ]}
                        td={(product) => (
                            <Tr key={product._id}>
                                <Td maxW={200}>
                                    <Flex align="center" gap={3}>
                                        <Image
                                            borderRadius={8}
                                            boxSize={8}
                                            alt={product.name}
                                            src={product.image}
                                        />

                                        <Text
                                            overflow="hidden"
                                            textOverflow="ellipsis"
                                        >
                                            {product.name}
                                        </Text>
                                    </Flex>
                                </Td>

                                <Td>
                                    <Text>{product.stocks}</Text>
                                </Td>

                                <Td>
                                    <Text>
                                        ₱
                                        {product.price.toLocaleString(
                                            undefined,
                                            { maximumFractionDigits: 2 }
                                        )}
                                    </Text>
                                </Td>

                                <Td>
                                    <Text>
                                        {product.sold.toLocaleString(
                                            undefined,
                                            { maximumFractionDigits: 2 }
                                        )}
                                    </Text>
                                </Td>

                                <Td>
                                    <Badge
                                        variant="tinted"
                                        colorScheme={
                                            product.status === 'Published'
                                                ? 'blue'
                                                : product.status === 'Draft'
                                                ? 'yellow'
                                                : product.status ===
                                                      'Disabled' && 'red'
                                        }
                                        textTransform="capitalize"
                                    >
                                        {product.status}
                                    </Badge>
                                </Td>

                                <Td>
                                    <Text>
                                        {month[
                                            product.created
                                                .split(',')[0]
                                                .split('/')[0] - 1
                                        ] +
                                            ' ' +
                                            product.created
                                                .split(',')[0]
                                                .split('/')[1] +
                                            ', ' +
                                            product.created
                                                .split(',')[0]
                                                .split('/')[2]}
                                    </Text>
                                </Td>

                                <Td textAlign="right">
                                    <IconButton
                                        size="xs"
                                        icon={<FiMoreHorizontal size={12} />}
                                        onClick={() =>
                                            router.push(
                                                `/admin/products/${product._id}`
                                            )
                                        }
                                    />
                                </Td>
                            </Tr>
                        )}
                        select={(register) => (
                            <Flex flex={1} justify="end" align="center" gap={3}>
                                <Select
                                    placeholder="Status"
                                    size="lg"
                                    w={{ base: 'full', md: 'auto' }}
                                    {...register('status')}
                                >
                                    <chakra.option value="Published">
                                        Published
                                    </chakra.option>
                                    <chakra.option value="Draft">
                                        Draft
                                    </chakra.option>
                                    <chakra.option value="Disabled">
                                        Disabled
                                    </chakra.option>
                                </Select>

                                <Button
                                    size="lg"
                                    colorScheme="brand"
                                    onClick={() =>
                                        router.push('/admin/products/add')
                                    }
                                >
                                    Add New
                                </Button>
                            </Flex>
                        )}
                        filters={(data, watch) => {
                            return data
                                .filter((data) =>
                                    ['name'].some((key) =>
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
                                    watch('status')
                                        ? data.status === watch('status')
                                        : data
                                )
                        }}
                        effects={(watch) => [watch('status')]}
                        settings={{
                            placeholder: 'Search Products'
                        }}
                    />
                </Card>
            </Flex>
        </Container>
    )
}

export default Products

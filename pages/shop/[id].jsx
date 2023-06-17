import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import {
    Badge,
    Button,
    Container,
    Divider,
    Flex,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Text,
    useToast
} from '@chakra-ui/react'
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import Toast from 'components/toast'

const Shop = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session } = useSession()

    const queryClient = useQueryClient()
    const { data: product, isFetched: isProductFetched } = useQuery(
        ['product', id],
        () => api.get('/products', id)
    )

    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const addMutation = useMutation((data) => api.create('/carts', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('carts')
            setIsLoading(false)

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Cart added successfully."
                    />
                )
            })
        }
    })

    const onSubmit = () => {
        setIsLoading(true)

        if (!session) {
            signIn('google')
            return
        }

        addMutation.mutate({
            user: {
                id: session.user.id
            },
            product: {
                id: product._id,
                image: product.image,
                name: product.name,
                price: product.price,
                discount: {
                    percentage: product.discount.percentage
                }
            },
            quantity: quantity
        })
    }

    if (!isProductFetched) {
        return (
            <Flex p={6}>
                <Spinner color="brand.default" />
            </Flex>
        )
    }

    return (
        <Container>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={12}>
                <Flex flex={1}>
                    <Image alt={product.name} src={product.image} />
                </Flex>

                <Flex flex={1} justify="center" align="center">
                    <Flex direction="column" gap={6} w="full" maxW={364}>
                        <Flex direction="column" gap={1}>
                            <Text
                                fontSize="2xl"
                                fontWeight="semibold"
                                textAlign="center"
                                textTransform="capitalize"
                                color="accent-1"
                            >
                                {product.name}
                            </Text>

                            <Flex justify="center" align="center" gap={3}>
                                <Text
                                    fontSize="2xl"
                                    fontWeight="semibold"
                                    color="brand.default"
                                >
                                    ₱{product.price.toFixed(2)}
                                </Text>

                                <Badge variant="tinted" colorScheme="brand">
                                    6PCS PER BOX
                                </Badge>
                            </Flex>
                        </Flex>

                        <Text fontSize="sm" textAlign="center">
                            {product.description}
                        </Text>

                        <Divider />

                        <Flex direction="column" gap={6}>
                            <InputGroup>
                                <InputLeftElement
                                    as="button"
                                    pt={1}
                                    pl={1}
                                    color="accent-1"
                                    cursor={
                                        quantity === 1
                                            ? 'not-allowed'
                                            : 'pointer'
                                    }
                                    disabled={quantity === 1}
                                    onClick={() =>
                                        setQuantity((prev) => prev - 1)
                                    }
                                >
                                    <FiMinus size={16} />
                                </InputLeftElement>

                                <Input
                                    value={
                                        product.stocks
                                            ? quantity
                                            : 'Out Of Stocks'
                                    }
                                    borderRadius="full"
                                    size="lg"
                                    textAlign="center"
                                    readOnly
                                />

                                <InputRightElement
                                    as="button"
                                    pt={1}
                                    pr={1}
                                    color="accent-1"
                                    cursor={
                                        quantity === 10
                                            ? 'not-allowed'
                                            : 'pointer'
                                    }
                                    disabled={quantity === 10}
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                >
                                    <FiPlus size={16} />
                                </InputRightElement>
                            </InputGroup>

                            <Button
                                borderRadius="full"
                                size="lg"
                                w="full"
                                colorScheme="brand"
                                leftIcon={<FiShoppingCart size={16} />}
                                isLoading={isLoading}
                                disabled={product.stocks ? false : true}
                                onClick={onSubmit}
                            >
                                Add To Cart
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}

export default Shop

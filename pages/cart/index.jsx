import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Container,
    Flex,
    Grid,
    GridItem,
    Spinner,
    Text
} from '@chakra-ui/react'
import Items from 'components/cart/items'
import Details from 'components/cart/details'
import Address from 'components/cart/address'
import Controls from 'components/cart/controls'
import Router from 'next/router'

const Cart = () => {
    const { data: session } = useSession()
    const { data: user, isFetched: isUserFetched } = useQuery(['user'], () =>
        api.get('/users', session.user.id)
    )
    const { data: carts, isFetched: isCartsFetched } = useQuery(['carts'], () =>
        api.get('/carts', session.user.id)
    )

    const subtotal = (data) => {
        let sum = 0

        data.forEach((data) => {
            sum += data.product.price * data.quantity
        })

        return sum
    }

    const discount = (data) => {
        let sum = 0

        data.forEach((data) => {
            sum +=
                data.product.price *
                data.quantity *
                (data.product.discount.percentage / 100)
        })

        return sum
    }

    const total = (data) => {
        return subtotal(data) - discount(data)
    }

    if (!session) {
        Router.push('/')
        return
    }

    if (!isUserFetched || !isCartsFetched) {
        return (
            <Container>
                <Spinner color="brand.default" />
            </Container>
        )
    }

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Shopping Cart
                    </Text>
                </Flex>

                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 384px' }}
                    alignItems="start"
                    gap={6}
                >
                    <GridItem display="grid">
                        <Items carts={carts} />
                    </GridItem>

                    <GridItem display="grid" gap={6}>
                        <Details
                            user={user}
                            carts={carts}
                            subtotal={subtotal}
                            discount={discount}
                            total={total}
                        />
                        <Address user={user} />
                        <Controls
                            user={user}
                            carts={carts}
                            subtotal={subtotal}
                            discount={discount}
                            total={total}
                        />
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    )
}

export default Cart

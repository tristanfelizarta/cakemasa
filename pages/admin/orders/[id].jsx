import { useRouter } from 'next/router'
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
import Items from 'components/orders/items'
import Customer from 'components/orders/customer'
import Details from 'components/orders/details'
import Address from 'components/orders/address'
import Courier from 'components/orders/courier'
import Status from 'components/orders/status'

const Order = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: session } = useSession()
    const { data: order, isFetched: isOrderFetched } = useQuery(
        ['order', id],
        () => api.get('/orders', id)
    )

    if (!session) {
        router.push('/')
        return
    }

    if (!isOrderFetched) {
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
                        Order Placed
                    </Text>
                </Flex>

                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 384px' }}
                    alignItems="start"
                    gap={6}
                >
                    <GridItem display="grid">
                        <Items order={order} />
                    </GridItem>

                    <GridItem display="grid" gap={6}>
                        <Status order={order} />
                        <Details session={session} order={order} />
                        {session.user.role === 'Admin' && (
                            <Customer order={order} />
                        )}
                        <Address order={order} />
                        <Courier session={session} order={order} />
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    )
}

export default Order

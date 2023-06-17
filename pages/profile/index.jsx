import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Container, Grid, GridItem, Spinner } from '@chakra-ui/react'
import Profile from 'components/profile'
import Address from 'components/profile/address'
import Orders from 'components/profile/orders'

const ProfilePage = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const { data: user, isFetched: isUserFetched } = useQuery(['user'], () =>
        api.get('/users', session.user.id)
    )
    const { data: orders, isFetched: isOrdersFetched } = useQuery(
        ['orders'],
        () => api.all('/orders')
    )

    if (!session) {
        router.push('/')
    }

    if (!isUserFetched || !isOrdersFetched) {
        return (
            <Container>
                <Spinner color="brand.default" />
            </Container>
        )
    }

    return (
        <Container>
            <Grid
                templateColumns={{ base: '1fr', lg: '384px 1fr' }}
                alignItems="start"
                gap={6}
            >
                <GridItem display="grid" gap={6}>
                    <Profile user={user} />
                    <Address user={user} />
                </GridItem>

                <GridItem display="grid" gap={6}>
                    <Orders user={user} orders={orders} />
                </GridItem>
            </Grid>
        </Container>
    )
}

export default ProfilePage

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
    chakra,
    Flex,
    Grid,
    GridItem,
    Icon,
    Image,
    Link,
    Text
} from '@chakra-ui/react'
import {
    FiGrid,
    FiMapPin,
    FiPackage,
    FiPieChart,
    FiShoppingCart,
    FiStar,
    FiUser,
    FiUsers
} from 'react-icons/fi'

const Sidebar = ({
    session,
    isAdmin,
    isCustomer,
    isUserPage,
    isSidebarOpen,
    onSidebarClose
}) => {
    const router = useRouter()

    return (
        <>
            <chakra.div
                bg="hsla(0, 0%, 0%, 0.4)"
                display={{ base: 'block', lg: 'none' }}
                position="fixed"
                top={0}
                left={0}
                h="100vh"
                w="full"
                visibility={isSidebarOpen ? 'visible' : 'hidden'}
                opacity={isSidebarOpen ? 1 : 0}
                transition="0.4s ease-in-out"
                zIndex={99}
                onClick={onSidebarClose}
            />

            <chakra.aside
                bg="system"
                position="fixed"
                top={{
                    base: 0,
                    lg: isAdmin ? 'auto' : isUserPage ? 'auto' : 0
                }}
                left={{
                    base: isSidebarOpen ? 0 : -256,
                    lg: isAdmin
                        ? 'auto'
                        : isSidebarOpen
                        ? 0
                        : isUserPage
                        ? 'auto'
                        : -256
                }}
                h={{
                    base: 'full',
                    lg: isAdmin
                        ? 'calc(100% - 72px)'
                        : isUserPage
                        ? 'calc(100% - 72px)'
                        : 'full'
                }}
                w={256}
                transition="0.4s ease-in-out left"
                zIndex={{ base: 100, lg: 99 }}
            >
                <Grid
                    templateRows={{
                        base: '64px 1fr',
                        lg: isAdmin
                            ? '1fr auto'
                            : isUserPage
                            ? '1fr'
                            : '64px 1fr'
                    }}
                    h="full"
                >
                    <GridItem
                        display={{
                            base: 'block',
                            lg: isAdmin ? 'none' : isUserPage ? 'none' : 'block'
                        }}
                        px={6}
                    >
                        <Flex align="center" h="full">
                            <Image
                                h={12}
                                alt="logo"
                                src="/assets/logo-brand.svg"
                            />
                        </Flex>
                    </GridItem>

                    <GridItem p={6}>
                        {isAdmin ? (
                            <Flex direction="column" gap={1}>
                                <NextLink href="/admin/dashboard" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes(
                                                'dashboard'
                                            )
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiPieChart} boxSize={4} />

                                            <Text>Dashboard</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/products" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('products')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiGrid} boxSize={4} />

                                            <Text>Products</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/orders" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('orders')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiPackage} boxSize={4} />

                                            <Text>Orders</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/reviews" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('reviews')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiStar} boxSize={4} />

                                            <Text>Reviews</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/accounts" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('accounts')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiUsers} boxSize={4} />

                                            <Text>Accounts</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>
                            </Flex>
                        ) : isUserPage ? (
                            <Flex direction="column" gap={1}>
                                <NextLink href="/user/profile" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('profile')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiUser} boxSize={4} />

                                            <Text>Profile</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/user/address" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('address')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiMapPin} boxSize={4} />

                                            <Text>Address</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/user/cart" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('cart')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon
                                                as={FiShoppingCart}
                                                boxSize={4}
                                            />

                                            <Text>Cart</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/user/orders" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('orders')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiPackage} boxSize={4} />

                                            <Text>Orders</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>

                                <NextLink href="/user/ratings" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('ratings')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={FiStar} boxSize={4} />

                                            <Text>Ratings</Text>
                                        </Flex>
                                    </Link>
                                </NextLink>
                            </Flex>
                        ) : (
                            <Flex direction="column" gap={1}>
                                <NextLink href="/" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={router.pathname === '/' ? 1 : 0}
                                        onClick={onSidebarClose}
                                    >
                                        Home
                                    </Link>
                                </NextLink>

                                <NextLink href="/shop" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('shop')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Shop
                                    </Link>
                                </NextLink>

                                <NextLink href="/cart" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('cart')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Cart
                                    </Link>
                                </NextLink>

                                <NextLink href="/reviews" passHref>
                                    <Link
                                        as="span"
                                        display="block"
                                        py={2}
                                        lineHeight={6}
                                        active={
                                            router.pathname.includes('reviews')
                                                ? 1
                                                : 0
                                        }
                                        onClick={onSidebarClose}
                                    >
                                        Reviews
                                    </Link>
                                </NextLink>

                                <Link
                                    href="/#contact"
                                    display="block"
                                    py={2}
                                    lineHeight={6}
                                    active={
                                        router.pathname.includes('contact')
                                            ? 1
                                            : 0
                                    }
                                    onClick={onSidebarClose}
                                >
                                    Call Us
                                </Link>
                            </Flex>
                        )}
                    </GridItem>
                </Grid>
            </chakra.aside>
        </>
    )
}

export default Sidebar

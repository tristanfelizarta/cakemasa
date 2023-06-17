import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    Avatar,
    Button,
    chakra,
    Flex,
    Icon,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'
import {
    FiFacebook,
    FiInstagram,
    FiLogOut,
    FiMenu,
    FiMoon,
    FiShoppingCart,
    FiSun,
    FiThumbsUp
} from 'react-icons/fi'
import { Google } from 'components/logos'

const Header = ({ session, isAdmin, isCustomer, onSidebarOpen }) => {
    const router = useRouter()
    const { colorMode, toggleColorMode } = useColorMode()
    const colorModeIcon = useColorModeValue(
        <FiMoon size={16} fill="currentColor" />,
        <FiSun size={16} fill="currentColor" />
    )
    const [isScrolling, setIsScrolling] = useState(false)
    const { data: cart, isFetched: isCartFetched } = useQuery(
        ['cart'],
        () => api.get('/carts', session.user.id),
        { enabled: session ? true : false }
    )

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                setIsScrolling(window.pageYOffset > 0)
            })
        }
    }, [])

    return (
        <chakra.header
            bg="system"
            position="sticky"
            top={0}
            outline="1px solid"
            outlineColor="border"
            shadow={isScrolling && 'sm'}
            transition=".4s"
            zIndex={{ base: 99, lg: 100 }}
            _dark={{ shadow: isScrolling && 'dark-xl' }}
        >
            <Flex
                align="center"
                gap={6}
                mx="auto"
                px={6}
                h="72px"
                w="full"
                maxW={isAdmin ? 1536 : 1280}
            >
                <Flex
                    flex={{ base: 1, lg: 'none' }}
                    justify="start"
                    align="center"
                >
                    <NextLink href="/" passHref>
                        <Image
                            display={{ base: 'none', lg: 'block' }}
                            alt="logo"
                            src="/assets/logo-brand.svg"
                        />
                    </NextLink>

                    <IconButton
                        display={{ base: 'flex', lg: 'none' }}
                        variant="outline"
                        icon={<FiMenu size={20} />}
                        onClick={onSidebarOpen}
                    />
                </Flex>

                <Flex
                    display={{ base: 'flex', lg: 'none' }}
                    flex={3}
                    justify="center"
                    align="center"
                >
                    <Image alt="logo" src="/assets/logo-brand.svg" />
                </Flex>

                <Flex flex={1} justify="end" align="center">
                    <Flex
                        display={{ base: 'none', lg: 'flex' }}
                        align="center"
                        gap={8}
                        mr={8}
                    >
                        {isAdmin && (
                            <>
                                <NextLink href="/admin/dashboard" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname ===
                                            '/admin/dashboard'
                                                ? 1
                                                : 0
                                        }
                                    >
                                        Dashboard
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/products" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname ===
                                            '/admin/products'
                                                ? 1
                                                : 0
                                        }
                                    >
                                        Products
                                    </Link>
                                </NextLink>

                                <NextLink href="/admin/accounts" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname ===
                                            '/admin/accounts'
                                                ? 1
                                                : 0
                                        }
                                    >
                                        Accounts
                                    </Link>
                                </NextLink>
                            </>
                        )}

                        {isCustomer && (
                            <>
                                <NextLink href="/" passHref>
                                    <Link
                                        as="span"
                                        active={router.pathname === '/' ? 1 : 0}
                                    >
                                        Home
                                    </Link>
                                </NextLink>

                                <NextLink href="/shop" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname.includes('shop')
                                                ? 1
                                                : 0
                                        }
                                    >
                                        Shop
                                    </Link>
                                </NextLink>

                                <NextLink href="/reviews" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname === '/reviews'
                                                ? 1
                                                : 0
                                        }
                                    >
                                        Reviews
                                    </Link>
                                </NextLink>

                                <Link
                                    href="/#contact"
                                    active={
                                        router.pathname === '/contact' ? 1 : 0
                                    }
                                >
                                    Call Us
                                </Link>

                                <NextLink href="/cart" passHref>
                                    <Link
                                        as="span"
                                        active={
                                            router.pathname === '/cart' ? 1 : 0
                                        }
                                    >
                                        <Flex gap={3} align="center">
                                            <Icon
                                                as={FiShoppingCart}
                                                boxSize={4}
                                            />
                                            <Text>Cart</Text>

                                            <Flex
                                                bg="brand.default"
                                                justify="center"
                                                align="center"
                                                borderRadius="full"
                                                h={6}
                                                w={6}
                                            >
                                                <Text
                                                    fontSize="xs"
                                                    color="white"
                                                >
                                                    {isCartFetched
                                                        ? cart.length
                                                        : 0}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Link>
                                </NextLink>
                            </>
                        )}
                    </Flex>

                    {session ? (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    boxSize={10}
                                    name={session.user.name}
                                    src={session.user.image}
                                />
                            </MenuButton>

                            <MenuList w={256}>
                                <MenuItem
                                    onClick={() => router.push('/profile')}
                                >
                                    <Flex align="center" gap={3}>
                                        <Avatar
                                            name={session.user.name}
                                            src={session.user.image}
                                        />

                                        <Text color="accent-1" noOfLines={1}>
                                            {session.user.name}
                                        </Text>
                                    </Flex>
                                </MenuItem>

                                <MenuDivider />

                                <MenuItem
                                    icon={colorModeIcon}
                                    onClick={toggleColorMode}
                                >
                                    Appearance
                                </MenuItem>

                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://facebook.com/cupcakedelightsby.m"
                                >
                                    <MenuItem icon={<FiFacebook size={16} />}>
                                        Facebook
                                    </MenuItem>
                                </a>

                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://instagram.com/cupcakedelightsby_m"
                                >
                                    <MenuItem icon={<FiInstagram size={16} />}>
                                        Instagram
                                    </MenuItem>
                                </a>

                                <MenuItem icon={<FiThumbsUp size={16} />}>
                                    Feedback
                                </MenuItem>

                                <MenuDivider />

                                <MenuItem
                                    icon={<FiLogOut size={16} />}
                                    onClick={() => signOut()}
                                >
                                    Sign out
                                </MenuItem>

                                <MenuDivider />

                                <Text fontSize="xs" textAlign="center">
                                    Beta 1.0.0 Build {Date.now()}
                                </Text>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <Button
                                display={{ base: 'none', lg: 'flex' }}
                                variant="outline"
                                leftIcon={<Google size={20} />}
                                onClick={() => signIn('google')}
                            >
                                Sign in
                            </Button>

                            <IconButton
                                display={{ base: 'flex', lg: 'none' }}
                                variant="outline"
                                icon={<Google size={20} />}
                                onClick={() => signIn('google')}
                            />
                        </>
                    )}
                </Flex>
            </Flex>
        </chakra.header>
    )
}

export default Header

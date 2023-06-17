import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
    chakra,
    Container,
    Flex,
    Icon,
    Image,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import Header from './header'
import Sidebar from './sidebar'

const AppLayout = (props) => {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { data: session, status } = useSession()
    const isAdmin = session
        ? session.user.role === 'Admin'
            ? true
            : false
        : false
    const isCustomer = session
        ? session.user.role === 'Customer'
            ? true
            : false
        : true
    const isUserPage = router.pathname.includes('user') ? true : false
    const {
        isOpen: isSidebarOpen,
        onOpen: onSidebarOpen,
        onClose: onSidebarClose
    } = useDisclosure()

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    if (!mounted || status === 'loading') {
        return (
            <Flex justify="center" align="center" h="100vh" w="full">
                <Image alt="logo" src="/assets/logo.svg" />
                <Spinner
                    position="absolute"
                    boxSize={16}
                    thickness={2}
                    speed="0.8s"
                    emptyColor="canvas-1"
                    color="brand.default"
                />
            </Flex>
        )
    } else {
        if (!session && props.authentication) {
            router.push('/login')
            return null
        }

        if (session && router.pathname === '/login') {
            router.push('/')
            return null
        }

        if (session && session.user.status === 'Inactive') {
            return (
                <>
                    <Header
                        session={session}
                        isAdmin={isAdmin}
                        isCustomer={isCustomer}
                        onSidebarOpen={onSidebarOpen}
                    />

                    <Container>
                        <Flex
                            bg="red.alpha"
                            justify="center"
                            gap={3}
                            border="1px solid"
                            borderColor="red.default"
                            borderRadius={12}
                            p={6}
                            color="red.default"
                        >
                            <Icon as={FiAlertTriangle} boxSize={6} />
                            <Text fontWeight="medium">
                                Your account is inactive.
                            </Text>
                        </Flex>
                    </Container>
                </>
            )
        }

        if (!session && router.pathname.includes('user')) {
            router.push('/')
            return
        }

        if (!isAdmin && router.pathname.includes('admin')) {
            router.push('/')
            return
        }

        if (isAdmin && !router.pathname.includes('admin')) {
            router.push('/admin/dashboard')
            return
        }

        return (
            <>
                <Header
                    session={session}
                    isAdmin={isAdmin}
                    isCustomer={isCustomer}
                    onSidebarOpen={onSidebarOpen}
                />

                <chakra.div
                    mx="auto"
                    h="auto"
                    minH="calc(100vh - 72px)"
                    w="full"
                    maxW={isAdmin ? 1536 : 1280}
                >
                    <Sidebar
                        session={session}
                        isAdmin={isAdmin}
                        isCustomer={isCustomer}
                        isUserPage={isUserPage}
                        isSidebarOpen={isSidebarOpen}
                        onSidebarClose={onSidebarClose}
                    />

                    <chakra.main
                        ml={{
                            base: 0,
                            lg: isAdmin ? 256 : isUserPage ? 256 : 0
                        }}
                        w={{
                            base: 'full',
                            lg: isAdmin
                                ? 'calc(100% - 256px)'
                                : isUserPage
                                ? 'calc(100% - 256px)'
                                : 'full'
                        }}
                    >
                        {props.children}
                    </chakra.main>
                </chakra.div>
            </>
        )
    }
}

export default AppLayout

import { useRouter } from 'next/router'
import { Button, chakra, Flex, Image, Text } from '@chakra-ui/react'

const Hero = () => {
    const router = useRouter()

    return (
        <Flex gap={12} h={624}>
            <Flex
                flex={1}
                justify="start"
                align="center"
                outline="1px solid transparent"
            >
                <Flex direction="column" align="start" gap={6}>
                    <Text
                        fontSize={64}
                        fontWeight="semibold"
                        lineHeight={1.1}
                        letterSpacing={0}
                        color="accent-1"
                    >
                        We bake{' '}
                        <chakra.span color="brand.default">
                            cupcakes
                        </chakra.span>
                        <br /> for your delights.
                    </Text>

                    <Text>
                        &quot;Life is better with fresh baked cupcakes&quot; A
                        hand made cupcakes by yours truly.
                    </Text>

                    <Button
                        size="xl"
                        colorScheme="brand"
                        borderRadius="full"
                        w={{ base: 'full', sm: 'auto' }}
                        onClick={() => router.push('/shop')}
                    >
                        Shop Now
                    </Button>
                </Flex>
            </Flex>

            <Flex
                display={{ base: 'none', lg: 'flex' }}
                flex={1}
                justify="end"
                align="center"
                outline="1px solid transparent"
            >
                <Image alt="canvas" src="/assets/canvas.svg" />
            </Flex>
        </Flex>
    )
}

export default Hero

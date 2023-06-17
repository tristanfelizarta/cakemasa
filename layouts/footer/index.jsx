import { chakra, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
    return (
        <chakra.footer pt={100}>
            <Flex justify="center" align="center">
                <Text fontSize="sm">Copyright © 2023 All right reserved.</Text>
            </Flex>
        </chakra.footer>
    )
}

export default Footer

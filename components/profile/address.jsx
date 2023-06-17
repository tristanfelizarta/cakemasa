import { Flex, Text } from '@chakra-ui/react'
import Card from 'components/card'

const Address = ({ user }) => {
    const withAddress =
        user.address.region &&
        user.address.city &&
        user.address.barangay &&
        user.address.streets &&
        user.address.postal
            ? true
            : false

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Complete Address
                </Text>

                <Text fontSize="sm" fontWeight="medium" color="accent-1">
                    {withAddress
                        ? user.address.region +
                          ', ' +
                          user.address.city +
                          ', ' +
                          user.address.barangay +
                          ', ' +
                          user.address.streets +
                          ', ' +
                          user.address.postal
                        : '-'}
                </Text>
            </Flex>
        </Card>
    )
}

export default Address

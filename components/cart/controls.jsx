import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Button, chakra, Flex, Select, useToast } from '@chakra-ui/react'
import Card from 'components/card'
import Toast from 'components/toast'

const Controls = ({ user, carts, subtotal, discount, total }) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const addMutation = useMutation((data) => api.create('/orders', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('orders')
            setIsLoading(false)
            router.push('/profile')

            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Success"
                        description="Order placed successfully."
                    />
                )
            })
        }
    })

    const onSubmit = () => {
        if (
            !user.contact &&
            !user.address.region &&
            !user.address.city &&
            !user.address.barangay &&
            !user.address.streets &&
            !user.address.postal
        ) {
            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Error"
                        description="Please complete your profile information."
                        status="error"
                    />
                )
            })

            router.push('/profile')

            return
        }

        if (total(carts) === 0) {
            toast({
                position: 'top',
                duration: 1000,
                render: () => (
                    <Toast
                        title="Error"
                        description="Shopping cart is empty."
                        status="error"
                    />
                )
            })

            return
        }

        setIsLoading(true)

        addMutation.mutate({
            user: user._id,
            items: carts,
            subtotal: subtotal(carts),
            discount: discount(carts),
            total: total(carts),
            method: 'Cash On Delivery'
        })
    }

    return (
        <Card>
            <Flex direction="column" gap={3}>
                <Select size="lg">
                    <chakra.option>Cash On Delivery</chakra.option>
                </Select>

                <Button
                    size="lg"
                    colorScheme="brand"
                    isLoading={isLoading}
                    onClick={onSubmit}
                >
                    Place Order
                </Button>
            </Flex>
        </Card>
    )
}

export default Controls

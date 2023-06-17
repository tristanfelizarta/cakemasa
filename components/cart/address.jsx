import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Button,
    chakra,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Select,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'

const EditModal = ({ user }) => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()
    const cities = new Array(
        'Las Piñas',
        'Makati',
        'Mandaluyong',
        'Manila',
        'Marikina',
        'Muntinlupa',
        'Navotas',
        'Parañaque',
        'Pasay',
        'Pasig',
        'Quezon',
        'San Juan',
        'Taguig',
        'Valenzuela'
    )

    const {
        register,
        formState: { errors },
        clearErrors,
        reset,
        handleSubmit
    } = useForm()

    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const editMutation = useMutation(
        (data) => api.update('/users', user._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Profile updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (data) => {
        setIsLoading(true)

        editMutation.mutate({
            address: {
                region: data.region,
                city: data.city,
                barangay: data.barangay,
                streets: data.streets,
                postal: data.postal
            }
        })
    }

    return (
        <Modal
            title="Delivery Address"
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    size="xs"
                    icon={<FiEdit2 size={12} />}
                    onClick={() => {
                        onOpen()
                    }}
                />
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.region}>
                        <FormLabel>Region</FormLabel>

                        <Select
                            defaultValue={user.address.region}
                            size="lg"
                            {...register('region', { required: true })}
                        >
                            <chakra.option value="Metro Manila">
                                Metro Manila
                            </chakra.option>
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.city}>
                        <FormLabel>City</FormLabel>

                        <Select
                            placeholder="Select"
                            defaultValue={user.address.city}
                            size="lg"
                            {...register('city', { required: true })}
                        >
                            {cities.map((city) => (
                                <chakra.option value={city} key={city}>
                                    {city}
                                </chakra.option>
                            ))}
                        </Select>

                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.barangay}>
                        <FormLabel>Barangay</FormLabel>
                        <Input
                            defaultValue={user.address.barangay}
                            size="lg"
                            {...register('barangay', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.streets}>
                        <FormLabel>Streets</FormLabel>
                        <Input
                            defaultValue={user.address.streets}
                            size="lg"
                            {...register('streets', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.postal}>
                        <FormLabel>Postal</FormLabel>
                        <Input
                            type="number"
                            defaultValue={user.address.postal}
                            size="lg"
                            {...register('postal', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Divider />

                    <Flex justify="end" align="center" gap={3}>
                        <Button size="lg" onClick={disclosure.onClose}>
                            Close
                        </Button>

                        <Button
                            type="submit"
                            size="lg"
                            colorScheme="brand"
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Modal>
    )
}

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
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={18} fontWeight="semibold" color="accent-1">
                        Delivery Address
                    </Text>

                    <EditModal user={user} />
                </Flex>

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

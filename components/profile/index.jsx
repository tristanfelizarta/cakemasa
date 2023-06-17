import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Avatar,
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
import { FiChevronRight } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'

const EditModal = ({ user }) => {
    const disclosure = useDisclosure()
    const { data: session } = useSession()
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

        if (session.user.role === 'Admin') {
            editMutation.mutate({
                name: data.name,
                contact: data.contact,
                gender: data.gender,
                address: {
                    region: data.region,
                    city: data.city,
                    barangay: data.barangay,
                    streets: data.streets,
                    postal: data.postal
                },
                role: data.role,
                status: data.status
            })
        } else {
            editMutation.mutate({
                name: data.name,
                contact: data.contact,
                gender: data.gender,
                address: {
                    region: data.region,
                    city: data.city,
                    barangay: data.barangay,
                    streets: data.streets,
                    postal: data.postal
                }
            })
        }
    }

    return (
        <Modal
            title="Profile Information"
            size="xl"
            toggle={(onOpen) => (
                <IconButton
                    variant="tinted"
                    borderRadius="full"
                    colorScheme="brand"
                    icon={<FiChevronRight size={16} />}
                    onClick={() => {
                        clearErrors()
                        reset()
                        onOpen()
                    }}
                />
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl>
                        <FormLabel>Identification</FormLabel>
                        <Input
                            value={user._id.toUpperCase()}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            defaultValue={user.name}
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            value={user.email}
                            size="lg"
                            cursor="default"
                            readOnly
                        />
                    </FormControl>

                    <Flex align="start" gap={6}>
                        <FormControl isInvalid={errors.contact}>
                            <FormLabel>Contact</FormLabel>
                            <Input
                                type="number"
                                defaultValue={user.contact}
                                size="lg"
                                {...register('contact', { required: true })}
                            />
                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.gender}>
                            <FormLabel>Gender</FormLabel>

                            <Select
                                placeholder="Select"
                                defaultValue={user.gender}
                                size="lg"
                                {...register('gender', { required: true })}
                            >
                                <chakra.option value="Male">Male</chakra.option>
                                <chakra.option value="Female">
                                    Female
                                </chakra.option>
                            </Select>

                            <FormErrorMessage>
                                This field is required.
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

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

                    {session.user.role === 'Admin' && (
                        <>
                            <FormControl>
                                <FormLabel>Role</FormLabel>

                                <Select
                                    defaultValue={user.role}
                                    size="lg"
                                    {...register('role')}
                                >
                                    <chakra.option value="Admin">
                                        Admin
                                    </chakra.option>
                                    <chakra.option value="Customer">
                                        Customer
                                    </chakra.option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Status</FormLabel>

                                <Select
                                    defaultValue={user.status}
                                    size="lg"
                                    {...register('status')}
                                >
                                    <chakra.option value="Active">
                                        Active
                                    </chakra.option>
                                    <chakra.option value="Inactive">
                                        Inactive
                                    </chakra.option>
                                </Select>
                            </FormControl>
                        </>
                    )}

                    <Flex direction="column" gap={6} mx={-6}>
                        <Divider />

                        <Flex justify="end" align="center" gap={3} px={6}>
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
                </Flex>
            </form>
        </Modal>
    )
}

const Profile = ({ user }) => {
    return (
        <Card>
            <Flex align="center" gap={3}>
                <Avatar h={10} w={10} name={user.name} src={user.image} />

                <Flex flex={1} direction="column">
                    <Text
                        fontSize="sm"
                        fontWeight="medium"
                        lineHeight={5}
                        color="accent-1"
                        noOfLines={1}
                    >
                        {user.name}
                    </Text>

                    <Text fontSize="sm" lineHeight={5} w={164} noOfLines={1}>
                        {user.email}
                    </Text>
                </Flex>

                <EditModal user={user} />
            </Flex>
        </Card>
    )
}

export default Profile

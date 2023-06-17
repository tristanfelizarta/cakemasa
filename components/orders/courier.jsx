import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Skeleton,
    SkeletonCircle,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiEdit2, FiPhoneCall, FiPlus } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'

const AddModal = ({ order }) => {
    const disclosure = useDisclosure()

    const queryClient = useQueryClient()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const editMutation = useMutation(
        (data) => api.update('/orders', order._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('orders')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Order updated successfully."
                        />
                    )
                })
            }
        }
    )

    const onSubmit = (data) => {
        setIsLoading(true)

        editMutation.mutate({
            courier: {
                ...data
            },
            status: 'To Receive',
            receive: {
                status: true,
                date: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        })
    }

    return (
        <Modal
            title="Courier Details"
            toggle={(onOpen) => (
                <IconButton
                    variant="tinted"
                    colorScheme="brand"
                    icon={
                        order.courier.name && order.courier.contact ? (
                            <FiEdit2 size={16} />
                        ) : (
                            <FiPlus size={16} />
                        )
                    }
                    disabled={!order.ship.status}
                    onClick={onOpen}
                />
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            size="lg"
                            {...register('name', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.contact}>
                        <FormLabel>Contact</FormLabel>
                        <Input
                            size="lg"
                            {...register('contact', { required: true })}
                        />
                        <FormErrorMessage>
                            This field is required.
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        size="lg"
                        colorScheme="brand"
                        isLoading={isLoading}
                    >
                        Submit
                    </Button>
                </Flex>
            </form>
        </Modal>
    )
}

const Courier = ({ session, order }) => {
    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Courier Details
                </Text>

                {order.courier.name && order.courier.contact ? (
                    <Flex align="center" gap={3}>
                        <Avatar h={10} w={10} name={order.courier.name} />

                        <Flex flex={1} direction="column">
                            <Text
                                fontSize="sm"
                                fontWeight="medium"
                                lineHeight={5}
                                color="accent-1"
                                noOfLines={1}
                            >
                                {order.courier.name}
                            </Text>

                            <Text fontSize="sm" lineHeight={5}>
                                {order.courier.contact}
                            </Text>
                        </Flex>

                        {session.user.role === 'Admin' &&
                        !order.completed.status ? (
                            <AddModal order={order} />
                        ) : (
                            <IconButton
                                variant="tinted"
                                colorScheme="brand"
                                icon={<FiPhoneCall size={16} />}
                            />
                        )}
                    </Flex>
                ) : (
                    <Flex align="center" gap={3}>
                        <SkeletonCircle h={10} w={10} />

                        <Flex flex={1} direction="column" gap={2}>
                            <Skeleton h={2} w={128} />
                            <Skeleton h={2} w={24} />
                        </Flex>

                        {session.user.role === 'Admin' && (
                            <AddModal order={order} />
                        )}
                    </Flex>
                )}
            </Flex>
        </Card>
    )
}

export default Courier

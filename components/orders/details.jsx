import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import api from 'instance'
import {
    AspectRatio,
    Button,
    chakra,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Icon,
    IconButton,
    Image,
    Select,
    Spinner,
    Text,
    Textarea,
    useDisclosure,
    useTimeout,
    useToast
} from '@chakra-ui/react'
import { FaFacebookMessenger } from 'react-icons/fa'
import { FiPlus, FiStar, FiX } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'
import Toast from 'components/toast'
import { month } from 'functions/month'
import { currency } from 'functions/currency'

const ReceiptModal = ({ order }) => {
    const disclosure = useDisclosure()
    const { data: receipt, isFetched: isReceiptFetched } = useQuery(
        ['receipt'],
        () => api.get('/receipts', order._id)
    )

    if (!isReceiptFetched) {
        return <Spinner color="brand.default" />
    }

    return (
        <Modal
            header="off"
            toggle={(onOpen) => (
                <Button
                    size="lg"
                    onClick={() => {
                        onOpen()
                        setTimeout(() => {
                            window.print()
                        }, 500)
                    }}
                >
                    View Receipt
                </Button>
            )}
            disclosure={disclosure}
        >
            <chakra.div bg="white" m={-6} p={6} fontFamily="monospace">
                <Flex direction="column" gap={3}>
                    <Text
                        mb={3}
                        fontSize={20}
                        fontWeight="semibold"
                        color="black"
                        textAlign="center"
                    >
                        Cupcake Delights By M.
                    </Text>

                    <Divider variant="dashed" borderColor="black" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} color="black">
                            Name
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            {receipt.name}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} color="black">
                            Order
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            #{order._id.slice(15, 30)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} fontWeight="semibold" color="black">
                            Date
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            {receipt.created.split(',')[0]}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} color="black">
                            Time
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            {receipt.created.split(',')[1]}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="black" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} color="black">
                            Subtotal
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            {currency(receipt.subtotal)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={16} color="black">
                            Discount
                        </Text>

                        <Text fontSize={16} fontWeight="semibold" color="black">
                            {currency(receipt.discount)}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="black" />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={18} fontWeight="semibold" color="black">
                            Total
                        </Text>

                        <Text fontSize={18} fontWeight="semibold" color="black">
                            {currency(receipt.total)}
                        </Text>
                    </Flex>

                    <Divider variant="dashed" borderColor="black" />

                    <Text
                        mt={3}
                        fontSize={20}
                        fontWeight="semibold"
                        color="black"
                        textAlign="center"
                    >
                        ***** THANK YOU *****
                    </Text>
                </Flex>
            </chakra.div>
        </Modal>
    )
}

const ReviewModal = ({ order }) => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()

    const {
        register,
        setValue,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const handleImage = (e) => {
        const file = e.target.files[0]

        if (!file) {
            toast({
                position: 'top',
                render: () => (
                    <Toast
                        title="Invalid Image"
                        description="file does not exists."
                        status="error"
                    />
                )
            })

            return
        }

        if (file.size > 5120 * 5120) {
            toast({
                position: 'top',
                render: () => (
                    <Toast
                        title="Invalid Image"
                        description="Largest image size is 5mb."
                        status="error"
                    />
                )
            })

            return
        }

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            toast({
                position: 'top',
                render: () => (
                    <Toast
                        title="Invalid Image"
                        description="Image format is incorrect."
                        status="error"
                    />
                )
            })

            return
        }

        setImage(file)
    }

    const addMutation = useMutation((data) => api.create('/reviews', data), {
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
                        description="Order rated successfully."
                    />
                )
            })
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)

        if (image) {
            let res = null

            for (const item of [image]) {
                const formData = new FormData()

                formData.append('file', item)
                formData.append('upload_preset', 'servers')

                res = await axios.post(
                    'https://api.cloudinary.com/v1_1/cupcakedelightsbym/image/upload',
                    formData
                )
            }
        }

        addMutation.mutate({
            user: {
                id: order.user.id
            },
            order: {
                id: order._id
            },
            image: image ? res.data.secure_url : '',
            ratings: Number(data.ratings),
            reviews: data.reviews
        })
    }

    return (
        <Modal
            title="Rate & Review"
            toggle={(onOpen) => (
                <Button
                    size="lg"
                    colorScheme="brand"
                    leftIcon={<FiStar size={16} />}
                    onClick={onOpen}
                >
                    Rate & Review
                </Button>
            )}
            disclosure={disclosure}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <chakra.div position="relative">
                        {image && (
                            <IconButton
                                position="absolute"
                                top={3}
                                right={3}
                                borderRadius="full"
                                size="xs"
                                colorScheme="brand"
                                zIndex={1}
                                icon={<FiX size={12} />}
                                onClick={() => setImage(null)}
                            />
                        )}

                        {image ? (
                            <AspectRatio ratio={1}>
                                <Image
                                    borderRadius={12}
                                    alt="product"
                                    src={
                                        typeof image === 'object'
                                            ? URL.createObjectURL(image)
                                            : image
                                    }
                                />
                            </AspectRatio>
                        ) : (
                            <AspectRatio ratio={1}>
                                <Flex
                                    bg="brand.alpha"
                                    position="relative"
                                    align="center"
                                    direction="column"
                                    gap={2}
                                    border="1px dashed"
                                    borderColor="brand.default"
                                    borderRadius={12}
                                    px={6}
                                    py={12}
                                >
                                    <chakra.input
                                        type="file"
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        h="full"
                                        w="full"
                                        opacity={0}
                                        cursor="pointer"
                                        onChange={handleImage}
                                    />
                                    <Icon
                                        as={FiPlus}
                                        boxSize={6}
                                        color="brand.default"
                                    />

                                    <Text
                                        fontSize="sm"
                                        fontWeight="medium"
                                        color="brand.default"
                                    >
                                        Add Image
                                    </Text>
                                </Flex>
                            </AspectRatio>
                        )}
                    </chakra.div>

                    <FormControl>
                        <Select size="lg" {...register('ratings')}>
                            <chakra.option value={5}>5 Star</chakra.option>
                            <chakra.option value={4}>4 Star</chakra.option>
                            <chakra.option value={3}>3 Star</chakra.option>
                            <chakra.option value={2}>2 Star</chakra.option>
                            <chakra.option value={1}>1 Star</chakra.option>
                        </Select>
                    </FormControl>

                    <FormControl isInvalid={errors.reviews}>
                        <Textarea
                            placeholder="Write a message"
                            size="lg"
                            minH={220}
                            {...register('reviews', { required: true })}
                        ></Textarea>
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

const ViewReviewModal = ({ order }) => {
    const disclosure = useDisclosure()
    const queryClient = useQueryClient()
    const { data: reviews, isFetched: isReviewsFetched } = useQuery(
        ['reviews'],
        () => api.all('reviews')
    )
    const search = isReviewsFetched
        ? reviews.filter((review) => review.order.id === order._id)
        : null
    const review = search ? search[0] : null
    const [isLoading, setIsLoading] = useState(false)

    const deleteMutation = useMutation(
        (data) => api.remove('/reviews', data.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('reviews')
                setIsLoading(false)
                disclosure.onClose()
            }
        }
    )

    const onDelete = (id) => {
        setIsLoading(true)

        deleteMutation.mutate({
            id: id
        })
    }

    return (
        <Modal
            title="Rate & Review"
            toggle={(onOpen) => (
                <Button
                    display={!review ? 'none' : 'flex'}
                    size="lg"
                    colorScheme="brand"
                    leftIcon={<FiStar size={16} />}
                    disabled={!order.reviews.status}
                    onClick={onOpen}
                >
                    Product Review
                </Button>
            )}
            disclosure={disclosure}
        >
            {isReviewsFetched && review ? (
                <Flex direction="column" gap={6}>
                    <Flex justify="center" align="center">
                        {[...Array(review.ratings)].map((data, index) => (
                            <Icon
                                as={FiStar}
                                boxSize={6}
                                fill="brand.default"
                                color="brand.default"
                                key={index}
                            />
                        ))}

                        {[...Array(5 - review.ratings)].map((data, index) => (
                            <Icon
                                as={FiStar}
                                boxSize={6}
                                color="brand.default"
                                key={index}
                            />
                        ))}
                    </Flex>

                    <Text fontSize="sm" color="accent-1">
                        {review.reviews}
                    </Text>

                    <Image
                        borderRadius={12}
                        alt="review-image"
                        src={review.image}
                    />

                    <Button
                        size="lg"
                        colorScheme="red"
                        isLoading={isLoading}
                        onClick={() => onDelete(review._id)}
                    >
                        Delete Review
                    </Button>
                </Flex>
            ) : (
                <Spinner color="brand.default" />
            )}
        </Modal>
    )
}

const Details = ({ session, order }) => {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const editMutation = useMutation(
        (data) => api.update('/orders', order._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('orders')
                setIsLoading(false)

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Order cancelled successfully."
                        />
                    )
                })
            }
        }
    )

    const onCancel = () => {
        setIsLoading(true)

        editMutation.mutate({
            status: 'Cancelled',
            cancelled: {
                status: true,
                date: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        })
    }

    const onAccept = () => {
        setIsLoading(true)

        editMutation.mutate({
            status: 'To Ship',
            ship: {
                status: true,
                date: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        })
    }

    const onReceive = () => {
        setIsLoading(true)

        editMutation.mutate({
            status: 'Completed',
            completed: {
                status: true,
                date: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Manila'
                })
            }
        })
    }

    return (
        <Card>
            <Flex direction="column" gap={6}>
                <Text fontSize={18} fontWeight="semibold" color="accent-1">
                    Order Summary
                </Text>

                <Flex direction="column" gap={3}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            ID
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            #{order._id.toUpperCase().slice(15, 25)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Order Date
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {month[
                                order.created.split(',')[0].split('/')[0] - 1
                            ] +
                                ' ' +
                                order.created.split(',')[0].split('/')[1] +
                                ', ' +
                                order.created.split(',')[0].split('/')[2]}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Order Time
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            {order.created.split(',')[1].trim()}
                        </Text>
                    </Flex>

                    <Divider />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Subtotal
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{order.subtotal.toFixed(2)}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Discount
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{order.discount.toFixed(2)}
                        </Text>
                    </Flex>

                    <Divider />

                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize="sm" fontWeight="medium">
                            Total
                        </Text>

                        <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="accent-1"
                        >
                            ₱{order.total.toFixed(2)}
                        </Text>
                    </Flex>
                </Flex>

                <Flex direction="column" gap={3}>
                    <ReceiptModal order={order} />

                    {session.user.role === 'Admin' && (
                        <>
                            {order.ship.status ? (
                                order.completed.status ? (
                                    <ViewReviewModal order={order} />
                                ) : (
                                    <Button
                                        size="lg"
                                        colorScheme="brand"
                                        disabled={!order.receive.status}
                                        isLoading={isLoading}
                                        onClick={onReceive}
                                    >
                                        Orders Received
                                    </Button>
                                )
                            ) : order.cancelled.status ? null : (
                                <>
                                    <Button
                                        size="lg"
                                        colorScheme="brand"
                                        isLoading={isLoading}
                                        onClick={onAccept}
                                    >
                                        Accept Orders
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        colorScheme="brand"
                                        isLoading={isLoading}
                                        onDoubleClick={onCancel}
                                    >
                                        Cancel Orders
                                    </Button>
                                </>
                            )}
                        </>
                    )}

                    {session.user.role === 'Customer' &&
                        (order.ship.status ? (
                            <>
                                {order.completed.status ? (
                                    order.reviews.status ? (
                                        <ViewReviewModal order={order} />
                                    ) : (
                                        <ReviewModal order={order} />
                                    )
                                ) : (
                                    <Button
                                        size="lg"
                                        colorScheme="brand"
                                        disabled={!order.receive.status}
                                        isLoading={isLoading}
                                        onClick={onReceive}
                                    >
                                        Orders Received
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    size="lg"
                                    colorScheme="brand"
                                    leftIcon={<FaFacebookMessenger size={16} />}
                                >
                                    Message Us
                                </Button>
                            </>
                        ) : order.cancelled.status ? (
                            <Button
                                variant="outline"
                                size="lg"
                                colorScheme="brand"
                                leftIcon={<FaFacebookMessenger size={16} />}
                            >
                                Message Us
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                colorScheme="brand"
                                isLoading={isLoading}
                                onClick={onCancel}
                            >
                                Cancel Orders
                            </Button>
                        ))}
                </Flex>
            </Flex>
        </Card>
    )
}

export default Details

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import api from 'instance'
import {
    AspectRatio,
    Button,
    chakra,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Spinner,
    Text,
    Textarea,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
import Card from 'components/card'
import Toast from 'components/toast'
import Modal from 'components/modal'

const View = () => {
    const router = useRouter()
    const { id } = router.query

    const queryClient = useQueryClient()
    const { data: product, isFetched: isProductFetched } = useQuery(
        ['product', id],
        () => api.get('/products', id)
    )

    const {
        register,
        setValue,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const disclosure = useDisclosure()
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
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

    const editMutation = useMutation(
        (data) => api.update('/products', product._id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products')
                setIsLoading(false)
                disclosure.onClose()

                toast({
                    position: 'top',
                    duration: 1000,
                    render: () => (
                        <Toast
                            title="Success"
                            description="Product updated successfully."
                        />
                    )
                })
            }
        }
    )

    const deleteMutation = useMutation(
        (data) => api.remove('/products', data.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products')
                setIsDeleteLoading(false)
                router.push('/admin/products')
            }
        }
    )

    const onSubmit = async (data) => {
        setIsLoading(true)

        let res = null

        if (image !== product.image) {
            for (const item of [image]) {
                const formData = new FormData()

                formData.append('file', item)
                formData.append('upload_preset', 'servers')

                res = await axios.post(
                    'https://api.cloudinary.com/v1_1/cupcakedelightsbym/image/upload',
                    formData
                )
            }

            editMutation.mutate({
                image: res.data.secure_url,
                name: data.name,
                description: data.description,
                stocks: Number(data.stocks),
                price: Number(data.price),
                discount: {
                    percentage: Number(data.percentage)
                },
                status: data.status
            })

            return
        }

        editMutation.mutate({
            name: data.name,
            description: data.description,
            stocks: Number(data.stocks),
            price: Number(data.price),
            discount: {
                percentage: Number(data.percentage)
            },
            status: data.status
        })
    }

    const onDelete = (id) => {
        setIsDeleteLoading(true)
        deleteMutation.mutate({ id: id })
    }

    useEffect(() => {
        if (product) {
            setImage(product.image)
            setValue('status', product.status)
        }
    }, [product])

    if (!isProductFetched) {
        return (
            <Container>
                <Spinner color="brand.default" />
            </Container>
        )
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={32} fontWeight="bold" color="accent-1">
                            Product Details
                        </Text>
                    </Flex>

                    <Grid
                        templateColumns="1fr 384px"
                        alignItems="start"
                        gap={6}
                    >
                        <GridItem display="grid" gap={6}>
                            <Card>
                                <Flex direction="column" gap={6}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        General
                                    </Text>

                                    <FormControl isInvalid={errors.name}>
                                        <FormLabel>
                                            Product Name{' '}
                                            <chakra.span color="red.default">
                                                *
                                            </chakra.span>
                                        </FormLabel>

                                        <Input
                                            defaultValue={product.name}
                                            size="lg"
                                            {...register('name', {
                                                required: true
                                            })}
                                        />
                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>
                                            Description{' '}
                                            <chakra.span color="red.default">
                                                *
                                            </chakra.span>
                                        </FormLabel>

                                        <Textarea
                                            defaultValue={product.description}
                                            size="lg"
                                            minH={132}
                                            {...register('description')}
                                        ></Textarea>
                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex direction="column" gap={6}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Inventory
                                    </Text>

                                    <FormControl>
                                        <FormLabel>Identification</FormLabel>
                                        <Input
                                            defaultValue={product._id}
                                            size="lg"
                                            textTransform="uppercase"
                                            cursor="not-allowed"
                                            readOnly
                                        />
                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.stocks}>
                                        <FormLabel>
                                            In Stock{' '}
                                            <chakra.span color="red.default">
                                                *
                                            </chakra.span>
                                        </FormLabel>

                                        <Input
                                            type="number"
                                            defaultValue={product.stocks}
                                            placeholder={0}
                                            size="lg"
                                            {...register('stocks', {
                                                required: true
                                            })}
                                        />

                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex direction="column" gap={6}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Pricing
                                    </Text>

                                    <FormControl isInvalid={errors.price}>
                                        <FormLabel>
                                            Base Price{' '}
                                            <chakra.span color="red.default">
                                                *
                                            </chakra.span>
                                        </FormLabel>

                                        <InputGroup>
                                            <InputLeftElement pt={1} pl={1}>
                                                ₱
                                            </InputLeftElement>

                                            <Input
                                                type="number"
                                                defaultValue={product.price}
                                                size="lg"
                                                {...register('price', {
                                                    required: true
                                                })}
                                            />
                                        </InputGroup>

                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>
                                            Discount Percentage
                                        </FormLabel>

                                        <InputGroup>
                                            <InputLeftElement pt={1} pl={1}>
                                                %
                                            </InputLeftElement>

                                            <Input
                                                type="number"
                                                defaultValue={
                                                    product.discount?.percentage
                                                }
                                                size="lg"
                                                {...register('percentage')}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Flex>
                            </Card>
                        </GridItem>

                        <GridItem display="grid" gap={6}>
                            <Card position="relative">
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
                            </Card>

                            <Card>
                                <Flex direction="column" gap={6}>
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        gap={6}
                                    >
                                        <Text
                                            fontSize="xl"
                                            fontWeight="semibold"
                                            color="accent-1"
                                        >
                                            Status
                                        </Text>

                                        <chakra.span
                                            bg={
                                                watch('status') === 'Published'
                                                    ? 'brand.default'
                                                    : watch('status') ===
                                                      'Draft'
                                                    ? 'yellow.default'
                                                    : watch('status') ===
                                                          'Disabled' &&
                                                      'red.default'
                                            }
                                            borderRadius="full"
                                            h={4}
                                            w={4}
                                        />
                                    </Flex>

                                    <Select
                                        size="lg"
                                        {...register('status', {
                                            required: true
                                        })}
                                    >
                                        <option value="Published">
                                            Published
                                        </option>
                                        <option value="Disabled">
                                            Disabled
                                        </option>
                                    </Select>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex direction="column" gap={6}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        color="accent-1"
                                    >
                                        Sales
                                    </Text>

                                    <FormControl>
                                        <FormLabel>Sold</FormLabel>
                                        <Input
                                            value={product.sold}
                                            size="lg"
                                            readOnly
                                        />
                                    </FormControl>
                                </Flex>
                            </Card>

                            <Card>
                                <Flex direction="column" gap={3}>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        colorScheme="brand"
                                        w="full"
                                        isLoading={isLoading}
                                    >
                                        Save Changes
                                    </Button>

                                    <Modal
                                        title="Delete Product"
                                        toggle={(onOpen) => (
                                            <Button
                                                variant="tinted"
                                                size="lg"
                                                colorScheme="red"
                                                w="full"
                                                onClick={onOpen}
                                            >
                                                Delete Product
                                            </Button>
                                        )}
                                        disclosure={disclosure}
                                    >
                                        <Flex direction="column" gap={6}>
                                            <Text
                                                fontSize="sm"
                                                color="accent-1"
                                            >
                                                Are you sure you want to delete
                                                this product permanently?
                                            </Text>

                                            <Flex
                                                direction="column"
                                                gap={6}
                                                mx={-6}
                                            >
                                                <Divider />

                                                <Flex
                                                    justify="end"
                                                    align="center"
                                                    gap={3}
                                                    px={6}
                                                >
                                                    <Button
                                                        size="lg"
                                                        onClick={
                                                            disclosure.onClose
                                                        }
                                                    >
                                                        No, cancel
                                                    </Button>

                                                    <Button
                                                        size="lg"
                                                        colorScheme="brand"
                                                        isDeleteLoading={
                                                            isDeleteLoading
                                                        }
                                                        onClick={() =>
                                                            onDelete(id)
                                                        }
                                                    >
                                                        Yes, sure
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Modal>
                                </Flex>
                            </Card>
                        </GridItem>
                    </Grid>
                </Flex>
            </form>
        </Container>
    )
}

export default View

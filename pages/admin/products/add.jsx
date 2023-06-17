import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import api from 'instance'
import {
    AspectRatio,
    Button,
    chakra,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
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
    Text,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
import Card from 'components/card'
import Toast from 'components/toast'

const Add = () => {
    const router = useRouter()
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

    const addMutation = useMutation((data) => api.create('/products', data), {
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            setIsLoading(false)
            router.push('/admin/products')
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)

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

        addMutation.mutate({
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
    }

    useEffect(() => {
        setValue('status', 'Published')
    }, [])

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap={6}>
                    <Flex justify="space-between" align="center" gap={6}>
                        <Text fontSize={32} fontWeight="bold" color="accent-1">
                            Add Product
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
                                            size="lg"
                                            {...register('name', {
                                                required: true
                                            })}
                                        />
                                        <FormErrorMessage>
                                            This field is required.
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.description}>
                                        <FormLabel>
                                            Description{' '}
                                            <chakra.span color="red.default">
                                                *
                                            </chakra.span>
                                        </FormLabel>

                                        <Textarea
                                            size="lg"
                                            minH={132}
                                            {...register('description', {
                                                required: true
                                            })}
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
                                            size="lg"
                                            cursor="not-allowed"
                                            readOnly
                                        />
                                        <FormHelperText>
                                            Product identification will
                                            automatically be generated once the
                                            product has been published.
                                        </FormHelperText>
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
                                        <option value="Draft">Draft</option>
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

                                    <Text fontSize="xs">
                                        Once the product is published, sales
                                        data will begin to be collected.
                                    </Text>
                                </Flex>
                            </Card>

                            <Card>
                                <Button
                                    type="submit"
                                    size="lg"
                                    colorScheme="brand"
                                    w="full"
                                    isLoading={isLoading}
                                >
                                    Save Changes
                                </Button>
                            </Card>
                        </GridItem>
                    </Grid>
                </Flex>
            </form>
        </Container>
    )
}

export default Add

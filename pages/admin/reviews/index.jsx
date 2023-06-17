import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    AspectRatio,
    Avatar,
    Button,
    chakra,
    Container,
    Flex,
    Icon,
    Image,
    SimpleGrid,
    Skeleton,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import Card from 'components/card'
import Modal from 'components/modal'

const ViewModal = ({ users, review, key }) => {
    const disclosure = useDisclosure()
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
            title="Ratings & Reviews"
            toggle={(onOpen) => (
                <Card cursor="pointer" onClick={onOpen} key={key}>
                    <Flex direction="column" gap={3}>
                        <Flex align="center" gap={3}>
                            {users
                                .filter((user) => user._id === review.user.id)
                                .map((user) => (
                                    <Flex
                                        flex={1}
                                        align="center"
                                        gap={3}
                                        key={user._id}
                                    >
                                        <Avatar
                                            name={user.name}
                                            src={user.image}
                                        />

                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color="accent-1"
                                            noOfLines={1}
                                        >
                                            {user.name}
                                        </Text>
                                    </Flex>
                                ))}

                            <Flex align="center" gap={1}>
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="accent-1"
                                >
                                    {review.ratings}
                                </Text>

                                <Icon
                                    as={FiStar}
                                    boxSize={4}
                                    color="brand.default"
                                    fill="brand.default"
                                />
                            </Flex>
                        </Flex>

                        <Text fontSize="sm" color="accent-1" noOfLines={3}>
                            {review.reviews}
                        </Text>

                        <AspectRatio ratio={1}>
                            <chakra.div>
                                {review.image && (
                                    <Image
                                        borderRadius={12}
                                        alt={review._id}
                                        src={review.image}
                                    />
                                )}
                            </chakra.div>
                        </AspectRatio>
                    </Flex>
                </Card>
            )}
            disclosure={disclosure}
        >
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
        </Modal>
    )
}

const Reviews = () => {
    const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () =>
        api.all('/users')
    )
    const { data: reviews, isFetched: isReviewsFetched } = useQuery(
        ['reviews'],
        () => api.all('/reviews')
    )

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Reviews
                    </Text>
                </Flex>

                <SimpleGrid columns={3} gap={6}>
                    {isUsersFetched && isReviewsFetched
                        ? reviews.map((review) => (
                              <ViewModal
                                  users={users}
                                  review={review}
                                  key={review._id}
                              />
                          ))
                        : [...Array(9)].map((data, index) => (
                              <AspectRatio ratio={1} key={index}>
                                  <Skeleton borderRadius={12} />
                              </AspectRatio>
                          ))}
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Reviews

import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from 'instance'
import {
    AspectRatio,
    Container,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Skeleton,
    Text
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

const Shop = () => {
    const { data: products, isFetched: isProductsFetched } = useQuery(
        ['products'],
        () => api.all('/products')
    )

    const { register, watch } = useForm()

    return (
        <Container>
            <Flex direction="column" gap={6}>
                <Flex justify="space-between" align="center" gap={6}>
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Shop
                    </Text>

                    <Flex w={384}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                pt={1}
                                pl={1}
                            >
                                <FiSearch size={16} />
                            </InputLeftElement>

                            <Input
                                placeholder="Search Products..."
                                size="lg"
                                borderRadius="full"
                                {...register('search')}
                            />
                        </InputGroup>
                    </Flex>
                </Flex>

                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
                    {isProductsFetched
                        ? products
                              .filter(
                                  (product) => product.status !== 'Disabled'
                              )
                              .filter((product) =>
                                  watch('search')
                                      ? ['name', 'price'].some((key) =>
                                            product[key]
                                                .toString()
                                                .toLowerCase()
                                                .includes(watch('search'))
                                        )
                                      : product
                              )
                              .map((product) => (
                                  <Flex
                                      position="relative"
                                      direction="column"
                                      gap={3}
                                      key={product._id}
                                  >
                                      <NextLink
                                          href={`/shop/${product._id}`}
                                          passHref
                                      >
                                          <Image
                                              borderRadius={12}
                                              alt={product.name}
                                              src={product.image}
                                          />
                                      </NextLink>

                                      <Flex
                                          direction="column"
                                          align="center"
                                          gap={1}
                                          textAlign="center"
                                      >
                                          <Text
                                              fontWeight="medium"
                                              color="accent-1"
                                          >
                                              {product.name}
                                          </Text>

                                          <Text
                                              fontWeight="medium"
                                              color="brand.default"
                                          >
                                              ₱
                                              {product.price
                                                  .toFixed(2)
                                                  .toLocaleString(undefined, {
                                                      maximumFractionDigits: 2
                                                  })}
                                          </Text>
                                      </Flex>
                                  </Flex>
                              ))
                        : [...Array(12)].map((data, index) => (
                              <AspectRatio ratio={1} key={index}>
                                  <Skeleton borderRadius={12} />
                              </AspectRatio>
                          ))}
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Shop

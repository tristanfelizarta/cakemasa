import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import {
    AspectRatio,
    chakra,
    Flex,
    Image,
    SimpleGrid,
    Skeleton,
    Text
} from '@chakra-ui/react'

const Featured = () => {
    const { data: products, isFetched: isProductsFetched } = useQuery(
        ['products'],
        () => api.all('/products')
    )

    return (
        <chakra.section pt={100} id="blogs">
            <Flex direction="column" gap={12}>
                <Flex align="center" direction="column" textAlign="center">
                    <Text fontSize={32} fontWeight="bold" color="accent-1">
                        Featured Products
                    </Text>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                    {isProductsFetched
                        ? products.slice(0, 6).map((product) => (
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
                        : [...Array(6)].map((data, index) => (
                              <AspectRatio ratio={1} key={index}>
                                  <Skeleton borderRadius={12} />
                              </AspectRatio>
                          ))}
                </SimpleGrid>
            </Flex>
        </chakra.section>
    )
}

export default Featured

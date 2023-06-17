import { Container } from '@chakra-ui/react'
import Hero from 'components/hero'
import Featured from 'components/featured'
import Incentives from 'components/incentives'
import Contact from 'components/contact'
import Footer from 'layouts/footer'

const Home = () => {
    return (
        <Container>
            <Hero />
            <Incentives />
            <Featured />
            <Contact />
            <Footer />
        </Container>
    )
}

export default Home

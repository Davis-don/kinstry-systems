import './homepage.css'
import Hero from '../../components/homepagehero/Hero'
import Homepageservices from '../../components/homepageservices/Homepageservices'

function Homepage() {
  return (
    <div className="overall-homepage-container">
      <Hero />
      <Homepageservices />
    </div>
  )
}

export default Homepage
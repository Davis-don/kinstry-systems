import './homepage.css'
import Hero from '../../components/homepagehero/Hero'
import Homepageservices from '../../components/homepageservices/Homepageservices'
import Featuredprojects from '../../components/featured/Featuredprojects'

function Homepage() {
  return (
    <div className="overall-homepage-container">
      <Hero />
      <Homepageservices />
      <Featuredprojects/>
    </div>
  )
}

export default Homepage
import './homepage.css'
import Hero from '../../components/homepagehero/Hero'
import Homepageservices from '../../components/homepageservices/Homepageservices'
import Featuredprojects from '../../components/featured/Featuredprojects'
import Whychoseus from '../../components/homepagewhyus/Whychoseus'
function Homepage() {
  return (
    <div className="overall-homepage-container">
      <Hero />
      <Homepageservices />
      <Featuredprojects/>
      <Whychoseus/>
    </div>
  )
}

export default Homepage
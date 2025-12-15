import NewsletterStats from "../nesletterstats/Newsletterstarts"
import Createnewsletter from "../createnewsletter/Createnewsletter"

function Newsletter() {
  return (
    <div className="overall-Newsletter-container">
      <NewsletterStats />
      <Createnewsletter />
    </div>
  )
}

export default Newsletter
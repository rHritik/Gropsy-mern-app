import BestSeller from "../Components/BestSeller"
import Category from "../Components/Category"
import Hero from "../Components/Hero"
import NewsLetter from "../Components/NewsLetter"

const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Category />
      <BestSeller/>
      <NewsLetter/>
    

    </div>
  )
}

export default Home

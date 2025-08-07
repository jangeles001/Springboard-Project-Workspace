import ContentBox from '../components/ContentBox'
import '../styles/Home.css'

const appFunctionsWithDescriptions = [
    {title: "Journey into the Future", content: "In a world where the impossible has become reality, where the stars are no longer out of reach, welcome to the future of humanity's survival and exploration. Witness the evolution of technology as it transforms barren planets into thriving havens. All made possible by the wonders of innovation and human determination"},
    {title: "From Neglect to innovation", content: "Once the cradle of civilization, Earth now stands as a solemn reminder of the consequences of neglect and environmental decline. But fear not, for the ingenuity of mankind has soared to new heights. With our relentless pursuit of advancement, we have not only healed our scars but extended our reach across the cosmos."},
    {title: "Enter Space Travel: Where Dreams Take Flight", content: "Embark on an extraordinary journey with our groundbreaking web application, aptly name  &quot;Space Travel.&quot; As a commander engineer, the fate of humanity's exodus rests in your capable hands. Prepare to face the ultimate challenge: evacuating humankind form their birthplace and guiding them towards a future among the stars."},
    {title: "Engineer, Explorer, Leader", content: "Space Travel empowers you to engineer, design, and even dismantle spacecrafts. Craft vessels that defy the boundaries of imagination, envisioning a future where life flourishes beyond the stars. But remember, your role extends beyond construction - you are a leader, an explorer, a commander steering humanity's destiny."},
    {title: "A Universe of Possibilities Awaits", content: "Immerse yourself in the thrill of exploration as you chart interplanetary courses within our solar system. Seamlessly navigate your fleet of spacecrafts, hurtling through the cosmic void from one celestial body to another. The universe becomes your playground, and every planet a potential new home."}
]

const Home = () => {
  return (
    <div className='home__content'>
        {appFunctionsWithDescriptions.map((entry, idx) => {
            return <ContentBox key={idx} title={entry.title} content={entry.content} />
        })}
        <span className='home__content--footer'>
            <h3>The solar system: the new home</h3>
            <p>🌍🚀🧑‍🚀🪐</p>
        </span>
    </div>
  )
}

export default Home
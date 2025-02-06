import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';


const Header = () => {
  return (
    <div>

      <SearchBar />
      <Link to="/">home</Link>
      <Link to="/advanced">advanced</Link>
    </div>
  )
}

const SearchBar = () => {
  return (
    <div>
      <form action="/search">
        <input type="text"/>
      </form>
    </div>    
  )
}

const Home = () => {

  return (
    <div>

      <h1>
        Enter something in the textbox to search, or don't
      </h1>

      <SearchBar />
        
      <div>
        <Link to="/">home</Link>
        <Link to="/advanced">advanced</Link>
      </div>

    </div>
  )
}

const Advanced = () => {

  return (
    <div>
      <Header />
      <h1>
        Advanced search
      </h1>
      

    </div>
  )
}

const Search = (props) => {
  const { cards } = props
  
  if (cards.length === 0) {
    return (
      <div>
        <Header />
        <div>
          No cards returned in search. Try searching something else.
        </div>
      </div>
      
    )
  }
  return (
    
    <div>
      <Header />
      <div>
        {cards.data.map(card => 
          <Link key={card.id} 
          to={`/card/${card.name.replace(/ \/\/ /g, '-').replace(/\s/g, '-')}`}>
            
            {card.image_uris ? <img src={card.image_uris.small}/> :
              <div>
                <img src={card.card_faces[0].image_uris.small}/>
              </div>
            } 
            
          </Link>
        )}
        
      
      </div>
    </div>
  )
}

const Card = () => {
  const { name: cardName } = useParams()
  const [face, setFace] = useState(0)
  const [card, setCard] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
      .then(response => setCard(response.data))
      .catch(error => console.error("Failed to fetch card:", error))
  }, [cardName])

  if (!card) return <div><Header /><div>Loading...</div></div>
  
  const faceData = card.card_faces ? card.card_faces[face] : card
  const imageUrl = card.image_uris
    ? card.image_uris.small
    : card.card_faces[face].image_uris.small

  return (
    <div>
      <Header />
      <div>
        <img src={imageUrl} alt={faceData.name} />
        {card.card_faces && (
          <button onClick={() => setFace((face + 1) % card.card_faces.length)}>
            Flip
          </button>
        )}
        <div>{faceData.name} {faceData.mana_cost}</div>
        <div>{faceData.type_line}</div>
        <div>{faceData.oracle_text}</div>
        <div>{faceData.power}/{faceData.toughness}</div>
        <div>Illustrated by {faceData.artist}</div>
      </div>
      
    </div>
  )

}


const App = () => {

  const [cards, setCards] = useState([])


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCards(response.data)
      })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/search" element={<Search cards={cards}/>} />
        <Route path="/card/:name" element={<Card />} />
      </Routes>

      <div>
        <i>Footer</i>
      </div>
    </Router>
  )
}

export default App


import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, useParams
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
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const uri = encodeURIComponent(query).replace(/%20/g, '+')
    navigate(`/search/${uri}`)
  }
  
  return (
    <div>
      <form onSubmit={submitSearch}>
        <input type="text" value={query} onChange={handleQueryChange}/>
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

const Search = () => {
  const { uri } = useParams()
  const [cards, setCards] = useState([])
  
  
  useEffect(() => {

    axios
      .get(`https://api.scryfall.com/cards/search?order=cmc&q=${uri}`)
      .then(response => setCards(response.data.data))
      .catch(error => console.error("Failed to fetch card:", error))
  }, [uri])

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
        {cards.map(card => 
          <Link key={card.id} 
          to={`/card/${card.name.replace(/ \/\/ /g, '-').replace(/\s/g, '-')}`}>
            
            {card.image_uris ? <img src={card.image_uris.normal}/> :
              <div>
                <img src={card.card_faces[0].image_uris.normal}/>
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
    ? card.image_uris.normal
    : card.card_faces[face].image_uris.normal

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/search/:uri" element={<Search />} />
        <Route path="/card/:name" element={<Card />} />
      </Routes>

      <div>
        <i>Footer</i>
      </div>
    </Router>
  )
}

export default App


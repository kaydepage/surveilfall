import {
  BrowserRouter as Router,
  Routes, Route, Link
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
          <Link to={`/card/${card.name}`}>
            <div key={card.id}>
              {card.image_uris ? <img src={card.image_uris.small}/> :
                <div>
                  <img src={card.card_faces[0].image_uris.small}/>
                </div>
              } 
            </div>
          </Link>
        )}
        
      
      </div>
    </div>
  )
}

const Card = (props) => {
  const {card} = props
  const [face, setFace] = useState(0)
  const faceData = card.card_faces ? card.card_faces[face] : card
  
  return (
    <div>

      {card.image_uris ? <img src={card.image_uris.small}/> :
        <div>
          <img src={card.card_faces[face].image_uris.small}/>
          <button onClick={() => face ? setFace(0) : setFace(1)}>Flip</button>
        </div>
      }        

      <div>{faceData.name} {faceData.mana_cost}</div>
      <div>{faceData.type_line}</div>
      <div>{faceData.oracle_text}</div>
      <div>{faceData.power}/{faceData.toughness}</div>
      <div>Illustrated by {faceData.artist}</div>
      <div>----------------</div>
        
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
      </Routes>

      <div>
        <i>Footer</i>
      </div>
    </Router>
  )
}

export default App


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
          <div key={card.id}>
            <Card card={card} />
          </div>
        )}
        
      
      </div>
    </div>
  )
}

const Card = (props) => {
  const {card} = props
  const [face, setFace] = useState(0)

  
  return (
    <div>

      {card.image_uris ? <img src={card.image_uris.small}/> :
        <div>
          <img src={card.card_faces[face].image_uris.small}/>
          <button onClick={() => face ? setFace(0) : setFace(1)}>Flip</button>
        </div>
      }
      {card.card_faces ? 
      <div>
        <div>{card.card_faces[face].name} {card.card_faces[face].mana_cost}</div>
        <div>{card.card_faces[face].type_line}</div>
        <div>{card.card_faces[face].oracle_text}</div>
        <div>{card.card_faces[face].power}/{card.card_faces[face].toughness}</div>
        <div>Illustrated by {card.card_faces[face].artist}</div>
        <div>----------------</div>
      </div> :
      <div>
        
        <div>{card.name} {card.mana_cost}</div>
        <div>{card.type_line}</div>
        <div>{card.oracle_text}</div>
        <div>{card.power}/{card.toughness}</div>
        <div>Illustrated by {card.artist}</div>
        <div>----------------</div>
      </div>
        }
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


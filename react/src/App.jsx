import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState } from 'react';

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
        <div>
          {cards.map(card => <div key={card.key}>{card.name}<img src={card.img} /></div>)}
        </div>
      </div>
    </div>
  )
}


const App = () => {

  const [cards, setCards] = useState([{key: 1, name: "Overwhelming Forces", img: "https://cards.scryfall.io/large/front/c/5/c56c7fb4-8b7b-40fc-879c-76cfb5d417b8.jpg?1562257531"}])

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


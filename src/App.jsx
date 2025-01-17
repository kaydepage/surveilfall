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
        No cards returned in search. Try searching something else.
      </div>
    )
  }
  return (
    
    <div>
      <Header />
      <div>
        {cards.map(card => <div>{card.content}</div>)}
      </div>
    </div>
  )
}


const App = () => {

  const [cards, setCards] = useState([1])

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


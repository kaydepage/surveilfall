import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, useParams
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import otagList from './otagList';


const Header = () => {
  return (
    <div>

      <SearchBar />
      <Link to="/"> home </Link>
      <Link to="/advanced"> advanced </Link>
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
  const [oracleTags, setOracleTags] = useState(otagList)
  return (
    <div>
      <Header />
      <form>
        <div>
          <label>Card Name </label>
          <input type="text" placeholder='Any words in the name, e.g."Ice"'></input>
        </div>

        <div>
          <label>Text </label>
          <input type="text" placeholder='Any text, e.g. "draw a card"'></input>
        </div>

        <div>
          <label>Type Line </label>
          <input type="text" placeholder='Enter a type or choose from the list'></input>
        </div>

        <div>
          <label>Colors </label>
          <div>
            <label>
              <input type="checkbox"/>
              White
            </label>
            
            <label>
              <input type="checkbox"/>
              Blue 
            </label>
            
            <label>
              <input type="checkbox"/>
              Black
            </label>
            
            <label>
              <input type="checkbox"/>
              Red
            </label>
            
            <label>
              <input type="checkbox"/>
              Green
            </label>
        
            <label>
              <input type="checkbox"/>
              Colorless
            </label>
          </div>
          <div>
            <select>
              <option value="=">Exactly these colors</option>
              <option value=">=">Including these colors</option>
              <option value="<=">At most these colors</option>
            </select>
          </div>
        </div>

        <div>
          <label>Commander </label>
          <div>
            <label>
              <input type="checkbox"/>
              White
            </label>
            
            <label>
              <input type="checkbox"/>
              Blue 
            </label>
            
            <label>
              <input type="checkbox"/>
              Black
            </label>
            
            <label>
              <input type="checkbox"/>
              Red
            </label>
            
            <label>
              <input type="checkbox"/>
              Green
            </label>
        
            <label>
              <input type="checkbox"/>
              Colorless
            </label>
          </div>
        </div>

        <div>
          <label>Mana Cost </label>
          <input type="text" placeholder='Any mana symbols, e.g. "{W}{W}"'></input>
        </div>

        <div>
          <label>Stats </label>
          <input type="text" placeholder='Any value, e.g. "3"'></input>
        </div>

        <div>
          <label>Oracle Tags </label>
          <input list="oracle-tags" placeholder='Enter a tag or choose from the list' multiple></input>
          <datalist id="oracle-tags">
            {oracleTags.map(tag =>
              <option value={tag}/>
            )}
          </datalist>
        </div>

        {/* <div>
          <label>Games </label>
        </div>

        <div>
          <label>Formats </label>
        </div> */}

        <div>
          <label>Sets </label>
          <input type="text" placeholder='Enter a set name or choose from the list'></input>
          <input type="text" placeholder='Enter a block name or choose from the list'></input>
        </div>

        <div>
          <label>Rarity </label>
        </div>

        {/* <div>
          <label>Criteria </label>
          <input type="text" placeholder='Enter a criterion or choose from the list'></input>
        </div> */}

        <div>
          <label>Prices </label>
          <select>
            <option value="usd">USD</option>
            <option value="eur">Euro</option>
            <option value="tix">MTGO Tickets</option>
          </select>
          <select>
            <option value="<">less than</option>
            <option value=">">greater than</option>
            <option value="<=">less than or equal to</option>
            <option value=">=">greater than or equal to</option>
          </select>
          <input type="text" placeholder='Any value, e.g."10.00"'></input>
        </div>

        <div>
          <label>Artist </label>
          <input type="text" placeholder='Any artist name, e.g. "Magali"'></input>
        </div>

        <div>
          <label>Flavour Text </label>
          <input type="text" placeholder='Any flavour text, e.g. "Kjeldoran"'></input>
        </div>

        <div>
          <label>Lore Finder </label>
          <input type="text" placeholder='Any Text, especially names, e.g. "Jhoira"'></input>
        </div>
        
        <div>
          <label>Language </label>
          <select>

          </select>
        </div>

        <div>
          <label>Preferences </label>
        </div>

        <div>
          <button type="submit">Search with selected options</button>
        </div>
      </form>
      

    </div>
  )
}

const SearchControls = (props) => {
  const { setUnique, setView, setOrder, setDir } = props
  
  return (

    <div>
      <div>
        <label></label>
        <select defaultValue="cards" onChange={(event) => {setUnique(event.target.value)}}>
          <option value="cards" >Cards</option>
          <option value="prints">All prints</option>
          <option value="art">Unique art</option>
        </select>

        <label> as </label>
        <select defaultValue="grid" onChange={(event) => {setView(event.target.value)}}>
          <option value="grid">Images</option>
          <option value="checklist">Checklist</option>
          <option value="text">Text Only</option>
          <option value="full">Full</option>
        </select>

        <label> sorted by </label>   
        <select defaultValue="cmc" onChange={(event) => {setOrder(event.target.value)}}>
          <option value="name">Name</option> 
          <option value="released">Release Date</option> 
          <option value="set">Set/Number</option> 
          <option value="rarity">Rarity</option> 
          <option value="color">Color</option> 
          <option value="usd">Price: USD</option> 
          <option value="tix">Price: TIX</option> 
          <option value="eur">Price: EUR</option> 
          <option value="cmc">Mana Value</option> 
          <option value="power">Power</option> 
          <option value="toughness">Toughness</option> 
          <option value="artist">Artist Name</option> 
          <option value="review">Set Review</option>
          <option value="edhrec">EDHREC Rank</option>
        </select>

        <label> : </label>    
        <select defaultValue="" onChange={(event) => {setDir(event.target.value)}}>
          <option value="">Auto</option>
          <option value="asc">Asc</option> 
          <option value="desc">Desc</option>
        </select>            
      </div>
    </div>
  )
}

const Search = () => {
  const { uri } = useParams()
  const [cards, setCards] = useState([])

  const [unique, setUnique] = useState('cards')
  const [view, setView] = useState('grid')
  const [order, setOrder] = useState('cmc')
  const [dir, setDir] = useState('')
  
  
  useEffect(() => {

    axios
      .get(`https://api.scryfall.com/cards/search?unique=${unique}&as=${view}&order=${order}&dir=${dir}&q=${uri}`)
      .then(response => setCards(response.data.data))
      .catch(error => console.error("Failed to fetch card:", error))
  }, [uri, unique, view, order, dir])

  if (cards.length === 0) {
    return (
      <div>
        <Header />
        <SearchControls setUnique={setUnique} setView={setView} setOrder={setOrder} setDir={setDir}/>
        <div>
          No cards returned in search. Try searching something else.
        </div>
      </div>
      
    )
  }
  return (
    
    <div>
      <Header />
      <SearchControls setUnique={setUnique} setView={setView} setOrder={setOrder} setDir={setDir}/>
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


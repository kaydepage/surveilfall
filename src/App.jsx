import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const Home = () => {

  return (
    <div>
      <h1>
        Enter something in the textbox to search, or don't
      </h1>
      <form>
        <input type="text"/>
      </form>
    </div>
  )
}

const Advanced = () => {

  return (
    <div>
      <h1>
        Advanced search
      </h1>
    </div>
  )
}


const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/advanced">advanced</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}

export default App


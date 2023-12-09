import NavComponent from "./assets/components/nav"
import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Upload from "./pages/upload"
import axios from "axios"
import Layout from "./Layout"
axios.defaults.baseURL ='http://localhost:3000'

function App() {



  return (
      <div>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<MainPage/>}></Route>
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </div>
  )
}

export default App

import NavComponent from "./assets/components/nav"
import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import Layout from "./Layout"
function App() {



  return (
      <div>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<MainPage/>}></Route>
          </Route>
        </Routes>
      </div>
  )
}

export default App

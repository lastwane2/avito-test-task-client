import { BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import { ListPage } from "./pages/List";
import { ItemPage } from "./pages/Item";
import { Layout } from "./app/Layout";
import { StatsPage } from "@/pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/list" element={<ListPage />} />        
          <Route path='/item/:id' element={<ItemPage/>}/>
          <Route path="/stats" element={<StatsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

import {  BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import './App.css'
import Index from './Components/Index'
import NavBar from './Components/NavBar';
import { SalesDataProvider } from './context/SalesDataContext';
import ViewInvoice from './Components/ViewInvoice';

function App() {
    return (
        <SalesDataProvider>
          <Router>
            <NavBar/>
              <Routes>
                <Route path='https://sales-table-orpin.vercel.app/' element={<Index />}></Route>
                <Route path='/invoice/:id' element={<ViewInvoice />}></Route>
              </Routes>
          </Router>
        </SalesDataProvider>
    );
}

export default App;

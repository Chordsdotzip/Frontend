import Home from './pages/Home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';
import Result from './pages/Result';
import { Provider } from 'react-redux';
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/result"
            element={
              <>
                <Navbar />
                <Result />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

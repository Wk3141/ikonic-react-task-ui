
import './App.css';
import ApplicationRoutes from "./routes/ApplicationRoutes"
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      <ApplicationRoutes/>
      <ToastContainer />
      </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;

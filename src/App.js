
import './App.css';
import ApplicationRoutes from "./routes/ApplicationRoutes"
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ApplicationRoutes/>
      <ToastContainer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;

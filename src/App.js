
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from "./Pages/Homepage"
import Coinpage from "./Pages/Coinpage"




function App() {

  // const useStyles = makeStyles(() => ({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },

  // }));
  // const classes = useStyles();

  return (
    // <div className={classes.App}>
    <div>
      <BrowserRouter>

        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;

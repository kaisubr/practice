import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component"
import PracticesList from "./components/practices-list.component";
import EditPractice from "./components/edit-practice.component";
import CreatePractice from "./components/create-practice.component";
import CreateUser from "./components/create-user.component";

function App() {
 return (
   <Router>
     <div className="container">
       <Navbar />
        <br/>
        <Route path="/" exact component={PracticesList} />
        <Route path="/edit/:id" component={EditPractice} />
        <Route path="/create" component={CreatePractice} />
        <Route path="/user" component={CreateUser} />
     </div>
   </Router> 
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

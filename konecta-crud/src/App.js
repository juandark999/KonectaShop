import './App.css';

import Listar from './components/Listar';
import Crear from './components/Crear';
import Editar from './components/Editar';
import Venta from './components/Venta';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';




function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to={"/"}>Inicio</Link>
          </div>
      </nav>
    <div className="container">
      <br></br>
        <Route exact activeClassName="active" path="/" component={Listar}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/venta" component={Venta}></Route>
        <Route path="/editar/:id" component={Editar}></Route>
    </div>
    </Router>
  );
}

export default App;

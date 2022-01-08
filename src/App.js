import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/Register'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <div className="app-container">
    <div className="responsive-container">
      <div className="app-body">
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterForm} />
        </Switch>
      </div>
    </div>
  </div>
)

export default App

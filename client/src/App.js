import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'

function App() {
  return (
    <>
      <Route exact path='/' component={Landing}/>
      <Route path='/home' render={() => <Home/>}/>
    </>
  );
}

export default App;

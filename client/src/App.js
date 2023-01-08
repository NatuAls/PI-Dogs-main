import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <>
      <Route exact path='/' component={Landing}/>
      <Route path='/home' render={() => <Home/>}/>
      <Route path='/dog/:id' render={() => <DogDetail/>}/>
    </>
  );
}

export default App;

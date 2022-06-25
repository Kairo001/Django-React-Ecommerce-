import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Error404 from './containers/erros/Error404';

import SignUp from './containers/auth/SignUp';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Active';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          {/* Authentication */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/activate/:uid/:token" element={<Activate/>}/>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

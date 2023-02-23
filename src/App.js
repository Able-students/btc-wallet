import store from "./store/store";
import { Provider } from 'react-redux';
import Wallet from './components/Wallet';

function App() {
  return (
    <Provider store={store}>
      <Wallet/>
    </Provider>
  );
}

export default App;

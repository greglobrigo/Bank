import './App.css'
import Layout from './components/Layout';
import AppProvider from './components/Global/AppContext'

function App() {
  return (
    <>
      <AppProvider>
        <Layout />
      </AppProvider>
    </>
  );
}

export default App;

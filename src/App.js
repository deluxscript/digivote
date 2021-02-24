import './App.css';
import Layout from './hoc/Layout/Layout.component';
import Home from './pages/home/home.component';

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;

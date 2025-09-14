import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Jane Doe" age="25" bio="Loves traveling and coding." />
      <MainContent />
      <Counter />
      <Footer />
    </div>
  );
}

export default App;


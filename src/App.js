import Routes from "./routes";
import { LanguageProvider } from "./components/languageSelector/LanguageContext";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <Routes />
    </LanguageProvider>
  );
}

export default App;

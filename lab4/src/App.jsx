import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ClockPage from "./pages/ClockPage";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/" element={<ClockPage />} />
                <Route path="/ClockPage" element={<ClockPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

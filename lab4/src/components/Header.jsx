import { Link } from "react-router-dom";
import "../css/common.css";

import logoITMO from "../assets/logoITMO.png";


export default function Header() {
    return (
        <header>

            <nav className="navigation">
                <div className="container">
                    <img className="Logo" src={logoITMO} alt="itmo_logo" width="1040" />                   <h1>Веб-программирование: Лабораторная работа №4</h1>
                    <p className="FIO">Кузьмина Ольга Игоревна 412986</p>

                    <Link to="/MainPage" className="login-link">Поинтер</Link>
                    <Link to="/loginPage" className="login-link">Войти</Link>
                    <Link to="/ClockPage" className="login-link">Часы</Link>

                </div>
            </nav>
        </header>
    );
}

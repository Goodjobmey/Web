import "../css/common.css";

import win from "../assets/win.gif";


export default function Footer() {
    return (
        <footer className="footer">
            <p>Разработано в рамках курса: Веб-программирование</p>
            <p>Университет ИТМО, осень 2024</p>
            <img className="win" src={win} alt="win" width="235"/>

        </footer>
    );
}

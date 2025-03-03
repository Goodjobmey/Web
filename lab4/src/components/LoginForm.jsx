import { useState, useEffect } from "react";
import axios from "axios";
import "../css/login.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.username) {
                    localStorage.setItem("isAuthenticated", "true");
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem("authUser");
                }
            } catch (error) {
                console.error("Ошибка парсинга localStorage:", error);
                localStorage.removeItem("authUser");
            }
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8090/backend-1.0-SNAPSHOT/api/users/login", {
                username,
                password,
            });

            console.log("Ответ сервера:", response.data);

            if (response.data.username) {
                localStorage.setItem("authUser", JSON.stringify(response.data));
                setUser(response.data);
                setIsAuthenticated(true);
            } else {
                alert("Ошибка: сервер не вернул корректные данные.");
            }
        } catch (error) {
            console.error("Ошибка авторизации:", error);
            alert("Ошибка входа! Неверный логин или пароль.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="login_container">
            {isAuthenticated ? (
                <div className="profile">
                    <h2>Личный кабинет</h2>
                    <p>Вы авторизованы как: <b>{user.username}</b></p>
                    <button className="logout_button" onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div className="login_form">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="form_title"><b>ВХОД</b></h1>
                        <div className="form_group">
                            <input
                                id="username"
                                type="text"
                                className="form_input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label className="form_mark">Имя пользователя</label>
                        </div>
                        <div className="form_group">
                            <input
                                id="password"
                                type="password"
                                className="form_input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="form_mark">Пароль</label>
                        </div>
                        <button className="form_button" type="submit">ВОЙТИ</button>
                    </form>
                </div>
            )}
        </div>
    );
}

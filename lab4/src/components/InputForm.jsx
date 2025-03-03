import { useState, useEffect } from "react";
import "../css/area.css";
import axios from "axios";

export default function InputForm({ setR, fetchResults }) {
    const [xValue, setXValue] = useState(null);
    const [yValue, setYValue] = useState("");
    const [rValue, setRValue] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        console.log("Статус авторизации:", authStatus);
        setIsAuthenticated(authStatus);

        const storedUser = localStorage.getItem("authUser");
        console.log("Данные из localStorage:", storedUser);

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Парсинг пользователя:", parsedUser);
                setUserId(parsedUser.userId);
            } catch (error) {
                console.error("Ошибка парсинга authUser:", error);
            }
        }
    }, []);

    const handleXChange = (event) => {
        setXValue(event.target.value);
    };

    const handleYChange = (event) => {
        const value = event.target.value;
        if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setYValue(value);
        }
    };

    const handleRChange = (event) => {
        const r = event.target.value;
        setRValue(r);
        setR(Number(r));
    };

    const handleDelete = (event) => {
        event.preventDefault();
        if (!isAuthenticated) {
            alert("Пожалуйста, авторизуйтесь перед удалением данных!");
            return;
        }

        // Отправляем запрос на удаление данных
        axios.delete(`http://localhost:8090/backend-1.0-SNAPSHOT/api/results/${userId}`)
            .then(response => {
                console.log("Результат удален", response);
                fetchResults(); // Обновляем таблицу
            })
            .catch(error => {
                console.error("Ошибка при удалении данных", error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isAuthenticated) {
            alert("Пожалуйста, авторизуйтесь перед отправкой данных!");
            return;
        }

        const yNum = parseFloat(yValue);

        if (isNaN(yNum) || yNum < -5 || yNum > 3) {
            alert("Y должен быть числом от -5 до 3!");
            return;
        }

        console.log(`X: ${xValue}, Y: ${yNum}, R: ${rValue}`);

        // Отправляем данные на сервер, включая userId
        axios.post(`http://localhost:8090/backend-1.0-SNAPSHOT/api/results/${userId}`, {
            x: xValue,
            y: yNum,
            r: rValue
        })
            .then((response) => {
                console.log("Результат сохранен", response);
                fetchResults(); // Обновляем таблицу
            })
            .catch((error) => {
                console.error("Ошибка при отправке данных", error);
            });
    };

    return (
        <div className="container">
            <div className="input-group">
                <label htmlFor="x">Выберите X: </label>
                <div className="input-part" id="x">
                    {[...Array(9).keys()].map(i => {
                        const value = i - 3;
                        return (
                            <label key={value}>
                                <input
                                    className="buttonX"
                                    type="radio"
                                    name="x"
                                    value={value}
                                    onChange={handleXChange}
                                    checked={xValue === String(value)}
                                />
                                {value}
                            </label>
                        );
                    })}
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="y">Введите Y: </label>
                <input
                    className="inputY"
                    type="text"
                    id="y"
                    name="y"
                    value={yValue}
                    onChange={handleYChange}
                    placeholder="(-5 ... 3)"
                />
            </div>
            <div className="input-group">
                <label htmlFor="r">Выберите R: </label>
                <div className="input-part" id="r">
                    {[1, 1.5, 2, 2.5, 3].map(r => (
                        <label key={r}>
                            <input
                                className="buttonR"
                                type="radio"
                                name="r"
                                value={r}
                                onChange={handleRChange}
                                checked={rValue === String(r)}
                            />
                            {r}
                        </label>
                    ))}
                </div>
            </div>
            <button className="button" type="submit" id="main_button" onClick={handleSubmit}>Проверить</button>
            <button className="button" type="button" id="delete_button" onClick={handleDelete}>Удалить</button>
        </div>
    );
}


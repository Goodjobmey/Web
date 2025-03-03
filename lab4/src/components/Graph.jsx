import "react";
import "../css/area.css";
import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Graph = ({ rValue, fetchResults }) => {
    const [points, setPoints] = useState([]);
    const [isValidR, setIsValidR] = useState(true); // Состояние для проверки, выбран ли R
    const [userId, setUserId] = useState(localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).userId : null); // Получаем userId из localStorage
    const [isMobile, setIsMobile] = useState(false); // Состояние для проверки, мобильное ли устройство

    // Определяем мобильное устройство при загрузке компонента
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 767) {
                setIsMobile(true); // Если ширина экрана меньше или равна 767px, то это мобильное устройство
            } else {
                setIsMobile(false); // Иначе это не мобильное устройство
            }
        };

        checkMobile(); // Проверяем при монтировании компонента

        // Добавляем слушатель на изменение размера окна
        window.addEventListener("resize", checkMobile);

        // Убираем слушатель при размонтировании компонента
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleGraphClick = async (event) => {
        if (!rValue) {
            setIsValidR(false);
            setTimeout(() => setIsValidR(true), 500);
            return;
        }

        const svg = event.currentTarget;
        const rect = svg.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log("Clicked at:", x, y);

        // Преобразуем координаты x, y в значения, подходящие для вашей системы координат
        const normalizedX = (x - (isMobile ? 100 : 300)) / (isMobile ? 50 : 100); // Пример преобразования
        const normalizedY = (300 - y) / (isMobile ? 50 : 100); // Пример преобразования

        const point = { x: normalizedX, y: normalizedY, r: rValue, userId: userId }; // Добавляем userId в точку

        // Отправляем точку на сервер
        try {
            const response = await axios.post(`http://localhost:8090/backend-1.0-SNAPSHOT/api/results/${userId}`, point);
            console.log("Response from server:", response.data);
            fetchResults(); // Обновляем таблицу

            // Если сервер успешно принял точку, добавляем её на график
            if (response.data) {
                setPoints([...points, { x, y }]);
            } else {
                alert("Ошибка при добавлении точки на сервер!");
            }
        } catch (error) {
            console.error("Ошибка отправки данных на сервер:", error);
            alert("Ошибка при отправке данных на сервер!");
        }
    };

    return (
        <div className={`graph ${!isValidR ? "error" : ""}`}> {/* Добавляем класс для окрашивания графика в красный при ошибке */}
            <svg
                id="graph"
                width={isMobile ? 200 : 800} // Меняем ширину графика в зависимости от устройства
                height={isMobile ? 200 : 600} // Меняем высоту графика в зависимости от устройства
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleGraphClick}
                style={{ border: "1px solid black", cursor: "pointer" }}
            >
                {/* Статический слой (оси и метки) */}
                <g id="static-layer">
                    {/* Оси */}
                    <line x1="0" y1={isMobile ? 100 : 300} x2={isMobile ? 200 : 800} y2={isMobile ? 100 : 300} stroke="black" />
                    <line x1={isMobile ? 100 : 300} y1="0" x2={isMobile ? 100 : 300} y2={isMobile ? 200 : 600} stroke="black" />

                    {/* Деления по оси X */}
                    <line x1={isMobile ? 100 : 400} y1={isMobile ? 95 : 295} x2={isMobile ? 100 : 400} y2={isMobile ? 105 : 305} stroke="black" />
                    <text x={isMobile ? 95 : 395} y={isMobile ? 90 : 290} fontSize="8">R</text>
                    <line x1={isMobile ? 150 : 350} y1={isMobile ? 95 : 295} x2={isMobile ? 150 : 350} y2={isMobile ? 105 : 305} stroke="black" />
                    <text x={isMobile ? 145 : 345} y={isMobile ? 90 : 290} fontSize="8">R/2</text>
                    <line x1={isMobile ? 50 : 250} y1={isMobile ? 95 : 295} x2={isMobile ? 50 : 250} y2={isMobile ? 105 : 305} stroke="black" />
                    <text x={isMobile ? 45 : 235} y={isMobile ? 90 : 290} fontSize="8">-R/2</text>
                    <line x1={isMobile ? 0 : 200} y1={isMobile ? 95 : 295} x2={isMobile ? 0 : 200} y2={isMobile ? 105 : 305} stroke="black" />
                    <text x={isMobile ? -5 : 195} y={isMobile ? 90 : 290} fontSize="8">-R</text>

                    {/* Деления по оси Y */}
                    <line x1={isMobile ? 95 : 295} y1={isMobile ? 50 : 200} x2={isMobile ? 105 : 305} y2={isMobile ? 50 : 200} stroke="black" />
                    <text x={isMobile ? 110 : 310} y={isMobile ? 55 : 205} fontSize="8">R</text>
                    <line x1={isMobile ? 95 : 295} y1={isMobile ? 100 : 250} x2={isMobile ? 105 : 305} y2={isMobile ? 100 : 250} stroke="black" />
                    <text x={isMobile ? 110 : 310} y={isMobile ? 105 : 255} fontSize="8">R/2</text>
                    <line x1={isMobile ? 95 : 295} y1={isMobile ? 150 : 350} x2={isMobile ? 105 : 305} y2={isMobile ? 150 : 350} stroke="black" />
                    <text x={isMobile ? 110 : 310} y={isMobile ? 155 : 355} fontSize="8">-R/2</text>
                    <line x1={isMobile ? 95 : 295} y1={isMobile ? 200 : 400} x2={isMobile ? 105 : 305} y2={isMobile ? 200 : 400} stroke="black" />
                    <text x={isMobile ? 110 : 310} y={isMobile ? 205 : 405} fontSize="8">-R</text>
                </g>

                {/* Динамический слой с фигурами, изменяющийся в зависимости от R */}
                <g id="dynamic-layer">
                    <polygon points={`300,300 300,${300 + rValue * 100} ${300 - rValue * 100},300`} fill="#333" fillOpacity="0.5" stroke="#333" />
                    <polygon points={`300,300 300,${300 - rValue * 50} ${300 + rValue * 100},${300 - rValue * 50} ${300 + rValue * 100},300`} fill="#333" fillOpacity="0.5" stroke="#333" />
                    <path d={`M300,300 ${300 + rValue * 100},300 A${rValue * 100},${rValue * 100} 0,0,1 300,${300 + rValue * 100} Z`} fill="#333" fillOpacity="0.5" stroke="#333" />
                </g>

                {/* Слой точек */}
                <g id="points-layer">
                    {points.map((point, index) => (
                        <circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default Graph;

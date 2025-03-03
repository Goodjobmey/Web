import { useState, useEffect } from "react";
import "../css/area.css"

export default function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            <h2>Текущее время:</h2>
            <div>{time}</div>
            <a>
            </a>
        </div>
    );
}

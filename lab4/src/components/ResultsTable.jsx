import { useState, useEffect } from "react";
import "../css/table.css";
import axios from "axios";

export default function ResultsTable({refresh}) {
    const [results, setResults] = useState([]);


    const fetchResults = () => {
        const userId = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).userId : null;

        if (userId) {
            axios.get(`http://localhost:8090/backend-1.0-SNAPSHOT/api/results/${userId}`)
                .then(response => {
                    setResults(response.data);
                })
                .catch(error => {
                    console.error("Ошибка при получении данных", error);
                });
        }
    };

    useEffect(() => {
        fetchResults();
    }, [refresh]);

    return (
        <div className="table">
            <table id="resultsTable">
                <thead>
                <tr>
                    <th>№</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время Запроса</th>
                </tr>
                </thead>
                <tbody id="resultTable">
                {results.map((result, index) => (
                    <tr key={result.resultId}>
                        <td>{index + 1}</td>
                        <td>{result.x}</td>
                        <td>{result.y}</td>
                        <td>{result.r}</td>
                        <td>{result.status}</td>
                        <td>{result.now}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}


import "react";
import "../css/area.css";

import Graph from "../components/Graph";
import InputForm from "../components/InputForm.jsx";
import ResultsTable from "../components/ResultsTable.jsx";
import {useState} from "react";

export default function GraphPage() {
    const [r, setR] = useState(1);
    const [refresh, setRefresh] = useState(false);

    const fetchResults = () => {
        setRefresh(prev => !prev); // Триггер обновления
    };

    return (
        <div className="area">
            <Graph rValue={r} fetchResults={fetchResults}/>
            <InputForm setR={setR} fetchResults={fetchResults}/>
            <ResultsTable refresh={refresh}/>
        </div>
    );
}

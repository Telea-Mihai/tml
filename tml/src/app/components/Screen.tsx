import React from "react";
import Style from "./Screen.module.css";
import { Summary } from "@/lib/summary";


export default function Screen({sum}: {sum?: Summary|null}) {
    return <div className={Style.container}>
        {sum ? <div></div> : <div>No data to visualize, please load data...</div>}
    </div>;
}
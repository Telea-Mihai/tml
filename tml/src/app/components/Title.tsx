import React from "react";
import Style from "./Title.module.css";

export default function Title({content, color}: {content: string, color:string}) {
    return <h1 className={Style.title} style={{ backgroundColor: color }} >{content}</h1>;
}
"use client";
import React from "react";
import Style from "./Button.module.css";

type Props = {
    content: string;
    color?: string;
    selected?: boolean;
    onClick?: () => void;
}

export default function Button(props: Props) {
        const buttonStyle = {
            '--button-color': props.color || '#1f2c44',
        } as React.CSSProperties;
    return <button 
        className={`${Style.button} textFlicker ${props.selected ? Style.selected : ''} `}
        onClick={props.onClick}
        style={buttonStyle}
    >
        {props.content}
    </button>;
}
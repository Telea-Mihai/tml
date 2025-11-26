"use client";
import React, { useEffect, useState } from "react";
import Style from "./Screen.module.css";
import { Summary } from "@/lib/summary";
import Button from "./Button";

export default function Screen({ sum }: { sum?: Summary | null }) {
    const [dotIndex, setDotIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(true);
    const dotSequence = [".", "..", "...", ""];

    useEffect(() => {
        const interval = setInterval(() => {
            setDotIndex((prev) => (prev + 1) % dotSequence.length);
        }, 600);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timer: number | undefined;
        if (sum) {
            setEmpty(true);
            timer = window.setTimeout(() => { setEmpty(false) }, 3000);
            setLoading(true);
            timer = window.setTimeout(() => setLoading(false), 6100);
        }
    }, [sum]);

    async function redirect(){
        window.location.href = `/view?id=${sum?.catId}`;
    }

    return <div className={Style.container + " textFlicker screenGlare"}>
        <div className={Style.cover} aria-hidden="true" />
        <div className={Style.content}>
            {sum && !empty ? <div>
                {loading ? <div>Reading disk{dotSequence[dotIndex]}</div> :
                    <div className={Style.summary}>
                        <div className="flex flex-col gap-[1rem]">
                            <div className={Style.title}>
                                <h1>Loaded disk:</h1>
                                <h1>{sum.title}</h1>
                            </div>
                            <div>
                                <h2 className="underline">Projects found:</h2>
                                <h2>{sum.counted}</h2>
                            </div>
                            <div className="flex flex-col h-[180px]">
                                {sum.projects.map((proj) => <div key={proj} className={Style.project}>
                                    <h3>-{proj}</h3>
                                </div>)}
                            </div>
                            <div>
                                <h3>Load contents?</h3>
                                <div className="flex gap-[4rem] justify-between w-[320px]">
                                    <Button content="Yes" color="Green" onClick={() => {redirect()}} />
                                    <Button content="No" color="Red" onClick={() => { }} />
                                </div>
                            </div>
                        </div>
                        <img src={sum.imageUrl} alt={sum.title} />
                    </div>}
            </div>
                : <div aria-live="polite" role="status">
                    No data to visualize, please load a disk{dotSequence[dotIndex]}
                </div>}
            </div>

    </div>;
}
"use client";
import React, { useEffect, useState } from "react";
import Style from "./Screen.module.css";
import { Summary } from "@/lib/summary";
import Button from "./Button";

export default function Screen({ sum, children }: { sum?: Summary | null, children: React.ReactNode | null }) {
    const [dotIndex, setDotIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(true);
    const [childrenLoading, setChildrenLoading] = useState(false);
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
            setLoading(true);
            timer = window.setTimeout(() => setLoading(false), 3100);
        }
    }, [sum]);

    useEffect(() => {
        let timer: number | undefined;
        if (children) {
            setChildrenLoading(true);
            timer = window.setTimeout(() => setChildrenLoading(false), 3000);
        }
        return () => {
            if (timer) window.clearTimeout(timer);
        };
    }, [children]);

    async function redirect() {
        if ((sum as any)?.specialId) {
            window.location.href = `/aboutme?type=${(sum as any).specialId}`;
        } else {
            window.location.href = `/view?id=${sum?.catId}`;
        }
    }

    const isSpecialSummary = (sum as any)?.specialId !== undefined;

    return <div className={Style.container + " textFlicker screenGlare"}>
        <div className={Style.cover} aria-hidden="true" />
        <div className={Style.content}>
            {children!=null ? (
                childrenLoading ? <div>Reading disk{dotSequence[dotIndex]}</div> : children
            ) : (
                sum ? (
                    loading ? <div>Reading disk{dotSequence[dotIndex]}</div> :
                        <div className={Style.summary}>
                            <div className="flex flex-col gap-[0.5rem]">
                                <div className={Style.title}>
                                    <h1>Loaded disk:</h1>
                                    <h1>{sum.title}</h1>
                                </div>
                                {isSpecialSummary ? (
                                    <>
                                        <div>
                                            <h2 className="underline">Description:</h2>
                                            <h2>{(sum as any).description}</h2>
                                        </div>
                                        <div className="flex flex-col h-[180px]">
                                            <h2 className="underline mb-[0.5rem]">Sections:</h2>
                                            {(sum as any).sections.map((section: string) => <div key={section} className={Style.project}>
                                                <h3>-{section}</h3>
                                            </div>)}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h2 className="underline">Projects found:</h2>
                                            <h2>{sum.counted}</h2>
                                        </div>
                                        <div className="flex flex-col h-[180px]">
                                            {sum.projects.map((proj) => <div key={proj} className={Style.project}>
                                                <h3>-{proj}</h3>
                                            </div>)}
                                        </div>
                                    </>
                                )}
                                <div>
                                    <h3>Load contents?</h3>
                                    <div className="flex gap-[4rem] justify-between">
                                        <Button content="Yes" color="Green" onClick={() => { redirect() }} />
                                        <Button content="No" color="Red" onClick={() => { }} />
                                    </div>
                                </div>
                            </div>
                            {sum.imageUrl && <img src={sum.imageUrl} alt={sum.title} />}
                        </div>
                ) : (
                    <div aria-live="polite" role="status" className="title">
                        No data to visualize, please load a disk{dotSequence[dotIndex]}
                    </div>
                )
            )}
        </div>

    </div>;
}
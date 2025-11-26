"use client"

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './Floppy.module.css';

type FloppyProps = {
	text: string;
	catId?: number;
	color?: string|null;
	loaded?: boolean;
	onClick? : (id:number) => void;
};

const Floppy = ({ text, catId, color = '#1f2c44', loaded = false, onClick }: FloppyProps) => {
	const floppyStyle = {
		'--floppy-color': color,
	} as CSSProperties;

	const [isReturning, setIsReturning] = useState(false);
	const prevLoadedRef = useRef(loaded);

	useEffect(() => {
		let timer: number | undefined;
		if (prevLoadedRef.current && !loaded) {
			setIsReturning(true);
			timer = window.setTimeout(() => setIsReturning(false), 3100);
		} else if (loaded) {
			setIsReturning(false);
		}

		prevLoadedRef.current = loaded;

		return () => {
			if (timer) {
				window.clearTimeout(timer);
			}
		};
	}, [loaded]);

	const classNames = [styles.floppy];
	if (loaded) classNames.push(styles.loaded);
	if (isReturning) classNames.push(styles.returning);

	return (
	<div className={styles.cont}>

		<div className={classNames.join(' ')} style={floppyStyle} onClick={onClick && catId ? () => onClick(catId) : undefined}>
			<div className={styles.shutter}/>
        	<div className={styles.label}>
            	<div className={styles.header}>tml-soft</div>
            	{text}
        	</div>
		</div>
	</div>
	);
};

export default Floppy;

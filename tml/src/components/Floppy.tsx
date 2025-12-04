"use client"

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import styles from './Floppy.module.css';

type FloppyProps = {
	text: string;
	catId?: number;
	color?: string|null;
	loaded?: boolean;
	onClick?: (id?: number) => void;
	isDraggable?: boolean;
	onDragEnd?: (catId: number | undefined, info: PanInfo, element: HTMLElement) => void;
	isInserting?: boolean;
	isEjecting?: boolean;
};

const Floppy = ({ 
	text, 
	catId, 
	color = '#1f2c44', 
	loaded = false, 
	onClick,
	isDraggable = false,
	onDragEnd,
	isInserting = false,
	isEjecting = false
}: FloppyProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [windowHeight, setWindowHeight] = useState(2000);
	const prevLoadedRef = useRef(loaded);
	const elementRef = useRef<HTMLDivElement>(null);

	const floppyStyle = {
		'--floppy-color': color,
	} as CSSProperties;

	useEffect(() => {
		// Set window height on client side only
		if (typeof window !== 'undefined') {
			setWindowHeight(window.innerHeight);
		}
	}, []);

	useEffect(() => {
		if (loaded && !prevLoadedRef.current) {
			setIsAnimating(true);
		} else if (!loaded && prevLoadedRef.current) {
			setIsAnimating(true);
		}

		prevLoadedRef.current = loaded;
	}, [loaded]);

	const floppyClassNames = [styles.floppy];
	
	if (!loaded && !isAnimating && !isDragging && !isInserting) {
		floppyClassNames.push(styles.hoverable);
	}

	const loadAnimation = {
		initial: {

			scale: 1,
		},
		animate: {
			y: [0, -50, windowHeight * 2],
			rotate: [0, 0, 0],
			scale: [1, 1.05, 1],
			transition: {
				duration: 2.5,
				times: [0, 0.3, 1],
				ease: [0.34, 1.56, 0.64, 1],
			},
			zindex: 200
		},
		exit: {
			y: [windowHeight * 2, -50, 0],
			rotate: [0, 0, 0],
			scale: [0.9, 1.05, 1],
			transition: {
				duration: 2.5,
				times: [0, 0.7, 1],
				ease: [0.34, 1.56, 0.64, 1],
			}
		}
	};

	// Insertion animation - floppy moves to disk reader and scales down
	const target = typeof window !== 'undefined' 
		? ((window as any).__floppyInsertTarget || { x: 0, y: -200 })
		: { x: 0, y: -200 };
	const insertingAnimation = {
		x: [target.x, target.x , target.x],
		y: [target.y+550, target.y + 300, target.y],
		transition: {
			duration: 0.6,
			times: [0, 0.5, 1],
			ease: "easeInOut" as const
		}
	};

	// Ejecting animation - floppy returns to deck
	const ejectingAnimation = {
		opacity: [0, 1],
		scale: [0.5, 1],
		y: [-50, 0],
		transition: {
			type: "spring" as const,
			stiffness: 200,
			damping: 25,
			opacity: { duration: 0.2 }
		}
	};

	return (
	<>
		<div className={styles.cont}>
			<AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
				{loaded ? (
					<motion.div
						key="loaded"
						className={floppyClassNames.join(' ')}
						style={{
							...floppyStyle,
						}}
						variants={loadAnimation as any}
						initial="initial"
						animate="animate"
						exit="exit"
						onClick={onClick ? (e) => { if (catId !== undefined) { onClick(catId); } else { onClick(); } } : undefined}
					>
						<div className={styles.shutter}/>
						<div className={styles.label}>
							<div className={styles.header}>tml-soft</div>
							{text}
						</div>
					</motion.div>
				) : isInserting || isEjecting || isDraggable ? (
					<motion.div
						ref={elementRef}
						key={isInserting ? 'inserting' : isEjecting ? 'ejecting' : 'draggable'}
						className={floppyClassNames.join(' ')}
						style={{
							...floppyStyle,
							cursor: isDragging ? 'grabbing' : 'grab',
						}}
						drag={isDraggable && !isInserting && !isEjecting}
						dragMomentum={false}
						dragElastic={0.2}
						dragSnapToOrigin={true}
						onDragStart={() => setIsDragging(true)}
						onDragEnd={(event, info) => {
							setIsDragging(false);
							if (onDragEnd && elementRef.current) {
								onDragEnd(catId, info, elementRef.current);
							}
						}}
						initial={false}
						animate={isInserting ? insertingAnimation : isEjecting ? ejectingAnimation : {}}
						whileDrag={isDraggable ? { scale: 1.05, zIndex: 1000 } : {}}
					>
						<div className={styles.shutter}/>
						<div className={styles.label}>
							<div className={styles.header}>tml-soft</div>
							{text}
						</div>
					</motion.div>
				) : (
					<motion.div
						key="unloaded"
						className={floppyClassNames.join(' ')}
						style={floppyStyle}
						onClick={onClick ? (e) => { if (catId !== undefined) { onClick(catId); } else { onClick(); } } : undefined}
					>
						<div className={styles.shutter}/>
						<div className={styles.label}>
							<div className={styles.header}>tml-soft</div>
							{text}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	</>
	);
};

export default Floppy;

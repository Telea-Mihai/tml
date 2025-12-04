"use client"

import { motion } from 'framer-motion';
import styles from './DiskReader.module.css';

type DiskReaderProps = {
	hasInsertedDisk: boolean;
	onEject: () => void;
	insertedDiskColor?: string | null;
};

const DiskReader = ({ hasInsertedDisk, onEject, insertedDiskColor }: DiskReaderProps) => {
	return (
		<div className={styles.diskReaderContainer}>
			<div className={styles.diskReader}>
				<div className={styles.slot} data-drop-zone="true">
					<div className={styles.slotOpening}>
						{hasInsertedDisk && insertedDiskColor ? (
							<motion.div 
								className={styles.insertedDisk}
								style={{ backgroundColor: insertedDiskColor }}
								initial={{ height: '30%', width:'85%' }}
								animate={{ height: '65%' }}
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							/>
						) : (
							<div className={styles.emptyIndicator}>
								<div className={styles.guides} />
							</div>
						)}
					</div>
				</div>
				<motion.button
					className={styles.ejectButton}
					onClick={onEject}
					disabled={!hasInsertedDisk}
					whileHover={hasInsertedDisk ? { scale: 1.05 } : {}}
					whileTap={hasInsertedDisk ? { scale: 0.95 } : {}}
				>
					⏏
				</motion.button>
			</div>
		</div>
	);
};

export default DiskReader;

// components/RetroBackground.tsx
import React from 'react';
import styles from './RetroBackground.module.css';

export default function RetroBackground() {
  return (
    <div className={styles.container}> {/* Main wrapper to replace body styles */}
      
      <div className={styles.hey}>
        <div className={styles.layerUp}></div>
      </div>

      <div className={styles.layer0}>
        <div className={styles.layer1}>
          <div className={styles.layer2}>
            <div className={styles.lines}>
              <div className={styles.layerCorner}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
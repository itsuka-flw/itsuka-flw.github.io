"use client";

import { useEffect, useState } from 'react';
import styles from './FallingImages.module.css';

const FALL_SETTING = {
    IMAGE_URLS: [
        '/images/snow.png', 
        '/images/sakura.png',
    ],
    IMAGE_COUNT: 20,
    DURATION_MAX: 12000, 
    DURATION_MIN: 6000,
    SIZE_MIN: 15, 
    SIZE_MAX: 30
};

export default function FallingImages() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const newParticles = Array.from({ length: FALL_SETTING.IMAGE_COUNT }).map((_, i) => ({
            id: i,
            url: FALL_SETTING.IMAGE_URLS[Math.floor(randomRange(0, FALL_SETTING.IMAGE_URLS.length))],
            size: randomRange(FALL_SETTING.SIZE_MIN, FALL_SETTING.SIZE_MAX),
            left: `${randomRange(0, 100)}vw`,
            delay: `${randomRange(0, 5000)}ms`,
            duration: `${randomRange(FALL_SETTING.DURATION_MIN, FALL_SETTING.DURATION_MAX)}ms`,
        }));

        setParticles(newParticles);
    }, []);

    return (
        <div className={styles.container}>
            {particles.map((p) => (
                <img
                    key={p.id}
                    src={p.url}
                    className={styles.fallingImage}
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        left: p.left,
                        animationName: 'fallAndRotate', // グローバルなkeyframesは文字列で指定
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        animationIterationCount: 'infinite',
                        animationFillMode: 'both',
                        position: 'absolute'
                    }}
                    alt=""
                />
            ))}
            <style jsx>{`
                /* CSS Modules内で定義した@keyframesを適用するためのハック、
                   またはグローバルCSSに定義するのが一般的です */
                @keyframes fallAndRotate {
                    0% { transform: translateY(-50px) rotateZ(0deg); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(110vh) rotateZ(1080deg); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}
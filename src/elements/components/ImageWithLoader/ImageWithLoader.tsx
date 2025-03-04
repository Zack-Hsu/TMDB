import { useState } from 'react';
import Image from 'next/image';

function ImageWithLoader(props: { src: string, alt: string, width: number, height: number, sizes?: string, style?: object, className?: string }) {
    const { src, alt, width, height, sizes, style, className } = props;
    const [isLoading, setIsLoading] = useState(true);  // 設定加載狀態
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                }}>
                    <div className="loader">
                        <div className="spinner-border" role="status">
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                loading='lazy'
                className={className}
                onLoadingComplete={() => { setIsLoading(false) }}
                style={isLoading ? { display: 'none' } : style}
            />
        </div>
    );
};

export default ImageWithLoader;
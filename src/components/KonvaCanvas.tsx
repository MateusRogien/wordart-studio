'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';

interface Props {
  insertTrigger: number;
  imageDataUrl: string;
}

const KonvaCanvas = ({ insertTrigger, imageDataUrl }: Props) => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    if (!imageDataUrl) return;

    const img = new window.Image();
    img.src = imageDataUrl;
    img.onload = () => {
      setImages((prev) => [...prev, { image: img, x: 150, y: 100 }]);
    };
  }, [insertTrigger]);

  return (
    <Stage width={800} height={500} className="bg-white border shadow-md">
      <Layer>
        {images.map((item, i) => (
          <KonvaImage key={i} image={item.image} x={item.x} y={item.y} draggable />
        ))}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

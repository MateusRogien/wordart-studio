'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';

interface Props {
  insertTrigger: number;
  imageDataUrl: string;
}

const KonvaCanvas = ({ insertTrigger, imageDataUrl }: Props) => {
  const [images, setImages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (!imageDataUrl) return;

    const img = new window.Image();
    img.src = imageDataUrl;
    img.onload = () => {
      setImages((prev) => [...prev, { 
        image: img, 
        x: 150, 
        y: 100,
        width: img.width,
        height: img.height,
        id: Date.now() // Unique ID for each image
      }]);
    };
  }, [insertTrigger]);

  useEffect(() => {
    if (selectedId !== null && transformerRef.current) {
      const selectedNode = images.find(img => img.id === selectedId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, images]);

  return (
    <Stage width={800} height={500} className="bg-white border shadow-md">
      <Layer>
        {images.map((item, i) => (
          <KonvaImage
            key={item.id}
            image={item.image}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            draggable
            onClick={() => setSelectedId(item.id)}
            onTap={() => setSelectedId(item.id)}
            onTransformEnd={(e) => {
              const node = e.target;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              
              setImages(images.map(img => {
                if (img.id === item.id) {
                  return {
                    ...img,
                    x: node.x(),
                    y: node.y(),
                    width: node.width() * scaleX,
                    height: node.height() * scaleY,
                    scaleX: 1,
                    scaleY: 1,
                  };
                }
                return img;
              }));
            }}
          />
        ))}
        {selectedId !== null && (
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default KonvaCanvas;

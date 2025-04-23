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
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<any>({});

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!imageDataUrl) return;

    const img = new window.Image();
    img.src = imageDataUrl;
    img.onload = () => {
      const id = Date.now();
      setImages((prev) => [...prev, { 
        image: img, 
        x: 150, 
        y: 100,
        id,
        width: img.width,
        height: img.height
      }]);
    };
  }, [insertTrigger]);

  useEffect(() => {
    if (selectedId !== null && transformerRef.current) {
      const node = imageRefs.current[selectedId];
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  const handleDelete = () => {
    if (selectedId !== null) {
      setImages(images.filter(img => img.id !== selectedId));
      setSelectedId(null);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Stage 
        width={dimensions.width} 
        height={dimensions.height} 
        className="bg-white border shadow-md"
        onClick={(e) => {
          // Deselect when clicking on empty space
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {images.map((item) => (
            <KonvaImage
              key={item.id}
              ref={(node) => {
                imageRefs.current[item.id] = node;
              }}
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
                setImages(images.map(img => {
                  if (img.id === item.id) {
                    return {
                      ...img,
                      x: node.x(),
                      y: node.y(),
                      width: node.width() * node.scaleX(),
                      height: node.height() * node.scaleY(),
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
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
      {selectedId !== null && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default KonvaCanvas;

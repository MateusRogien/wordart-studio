'use client';
import React, { useRef, useState } from 'react';
import TextInput from '@/components/TextInput';
import FontSelector from '@/components/FontSelector';
import InsertButton from '@/components/InsertButton';
import KonvaCanvas from '@/components/KonvaCanvas';
import * as htmlToImage from 'html-to-image';

export default function HomePage() {
  const [text, setText] = useState('WordArt Studio');
  const [font, setFont] = useState('Impact');
  const [insertTrigger, setInsertTrigger] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleInsert = async () => {
    if (!imageRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(imageRef.current);
      setImageDataUrl(dataUrl);
      setInsertTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error converting to image:', error);
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🎨 WordArt Studio</h1>
      <TextInput value={text} onChange={setText} />
      <FontSelector value={font} onChange={setFont} />
      <InsertButton onInsert={handleInsert} />
      <div className="my-6">
        <KonvaCanvas insertTrigger={insertTrigger} imageDataUrl={imageDataUrl} />
      </div>

      {/* Hidden styled WordArt to convert */}
      <div
        ref={imageRef}
        style={{
          fontFamily: font,
          fontSize: '64px',
          color: '#000',
          padding: '20px',
          position: 'absolute',
          left: '-9999px', // hide off-screen
        }}
      >
        {text}
      </div>
    </main>
  );
}

'use client';
import React, { useRef, useState } from 'react';
import TextInput from '@/components/TextInput';
import FontSelector from '@/components/FontSelector';
import InsertButton from '@/components/InsertButton';
import dynamic from 'next/dynamic';
import * as htmlToImage from 'html-to-image';

const KonvaCanvas = dynamic(() => import('@/components/KonvaCanvas'), {
  ssr: false
});

export default function HomePage() {
  const [text, setText] = useState('WordArt Studio');
  const [font, setFont] = useState('Impact');
  const [insertTrigger, setInsertTrigger] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleInsert = async () => {
    if (!imageRef.current) return;
    try {
      console.log("Insert button clicked");
      
      // Create a temporary clone for capture
      const clone = imageRef.current.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.backgroundColor = '#fff';
      clone.style.zIndex = '-1';
      clone.style.display = 'block'; // Ensure clone is visible
      document.body.appendChild(clone);

      const dataUrl = await htmlToImage.toPng(clone);
      document.body.removeChild(clone);
      
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

      {/* Off-screen preview */}
      <div
        ref={imageRef}
        style={{
          fontFamily: font,
          fontSize: '64px',
          color: '#000',
          backgroundColor: 'transparent',
          width: 'fit-content',
          position: 'absolute',
          left: '-9999px', // Position off-screen
          top: '-9999px',
        }}
      >
        {text}
      </div>
    </main>
  );
}

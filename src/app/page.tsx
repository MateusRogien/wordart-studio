'use client';
import React, { useState } from 'react';
import TextInput from '@/components/TextInput';
import FontSelector from '@/components/FontSelector';
import CanvasDisplay from '@/components/CanvasDisplay';

export default function HomePage() {
  const [text, setText] = useState('WordArt Studio');
  const [font, setFont] = useState('Impact');
  const [insertTrigger, setInsertTrigger] = useState(0); // For triggering insertion
  

  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🎨 WordArt Studio</h1>
      <TextInput value={text} onChange={setText} />
      <FontSelector value={font} onChange={setFont} />
      <CanvasDisplay text={text} font={font} />
    </main>
  );
}

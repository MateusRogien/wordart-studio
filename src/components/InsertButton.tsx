'use client';
import React from 'react';

export default function InsertButton({ onInsert }: { onInsert: () => void }) {
  return (
    <button
      onClick={onInsert}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Insert WordArt
    </button>
  );
}

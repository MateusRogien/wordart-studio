'use client';
import React from 'react';

interface Props {
  text: string;
  font: string;
}

const CanvasDisplay = ({ text, font }: Props) => (
  <div className="w-full h-96 bg-white border border-gray-400 rounded-lg flex items-center justify-center shadow-md">
    <span style={{ fontFamily: font, fontSize: '3rem' }}>{text}</span>
  </div>
);

export default CanvasDisplay;

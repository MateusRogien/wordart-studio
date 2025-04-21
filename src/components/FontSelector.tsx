'use client';
import React from 'react';
import { wordArtFonts } from '@/lib/fonts';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const FontSelector = ({ value, onChange }: Props) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-3 rounded-md border border-gray-300 mb-4"
  >
    {wordArtFonts.map((font) => (
      <option key={font} value={font}>
        {font}
      </option>
    ))}
  </select>
);

export default FontSelector;

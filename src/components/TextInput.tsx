'use client';
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const TextInput = ({ value, onChange }: Props) => (
  <input
    type="text"
    placeholder="Type your WordArt text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-3 rounded-md border border-gray-300 mb-4"
  />
);

export default TextInput;

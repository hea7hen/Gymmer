import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    const newValue: [number, number] = [newMin, Math.max(newMin, localValue[1])];
    setLocalValue(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    const newValue: [number, number] = [Math.min(localValue[0], newMax), newMax];
    setLocalValue(newValue);
  };

  const handleMouseUp = () => {
    onChange(localValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>₹{localValue[0].toLocaleString('en-IN')}</span>
        <span>₹{localValue[1].toLocaleString('en-IN')}</span>
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-primary rounded-full"
          style={{
            left: `${((localValue[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      <div className="flex gap-2 text-xs text-gray-600 mt-6">
        <span className="px-2 py-1 bg-gray-100 rounded">Budget: Under ₹1,500</span>
        <span className="px-2 py-1 bg-gray-100 rounded">Mid: ₹1,500-₹3,000</span>
        <span className="px-2 py-1 bg-gray-100 rounded">Premium: Above ₹3,000</span>
      </div>
    </div>
  );
}


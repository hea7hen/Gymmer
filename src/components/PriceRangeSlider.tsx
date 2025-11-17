import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PRICE_CATEGORIES: Array<{ id: string; label: string; sublabel: string; range: number[] }> = [
  { id: 'budget', label: 'Budget', sublabel: 'Under ₹1,500', range: [350, 1500] },
  { id: 'mid', label: 'Mid', sublabel: '₹1,500-₹3,000', range: [1500, 3000] },
  { id: 'premium', label: 'Premium', sublabel: 'Above ₹3,000', range: [3000, 9000] },
];

export default function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= maxVal) {
      setMinVal(newMin);
      onChange([newMin, maxVal]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= minVal) {
      setMaxVal(newMax);
      onChange([minVal, newMax]);
    }
  };

  const handleCategoryClick = (range: number[]) => {
    setMinVal(range[0]);
    setMaxVal(range[1]);
    onChange([range[0], range[1]]);
  };

  const getMinPercent = () => ((minVal - min) / (max - min)) * 100;
  const getMaxPercent = () => ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-gray-900">₹{minVal.toLocaleString()}</span>
        <span className="text-gray-900">₹{maxVal.toLocaleString()}</span>
      </div>

      {/* Custom Slider */}
      <div className="relative pt-2 pb-6">
        {/* Track */}
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Active Track */}
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${getMinPercent()}%`,
              right: `${100 - getMaxPercent()}%`,
            }}
          />
        </div>

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none top-2 range-thumb"
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none top-2 range-thumb"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Quick Select Categories */}
      <div className="grid grid-cols-3 gap-2">
        {PRICE_CATEGORIES.map((category) => {
          const isActive =
            minVal === category.range[0] && maxVal === category.range[1];

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.range)}
              className={`
                p-3 rounded-lg text-center transition-all
                ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div className="font-semibold text-sm">{category.label}:</div>
              <div className={`text-xs ${isActive ? 'text-cream' : 'text-gray-600'}`}>
                {category.sublabel}
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        input[type='range'].range-thumb {
          pointer-events: all;
        }
        
        input[type='range'].range-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FF8C42;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          pointer-events: all;
          position: relative;
          z-index: 10;
        }
        
        input[type='range'].range-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FF8C42;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          pointer-events: all;
        }
        
        input[type='range'].range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        input[type='range'].range-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

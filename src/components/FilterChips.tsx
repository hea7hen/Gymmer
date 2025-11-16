import { X } from 'lucide-react';

interface FilterChip {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipsProps {
  chips: FilterChip[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  multiSelect?: boolean;
}

export default function FilterChips({ chips, selectedIds, onChange, multiSelect = true }: FilterChipsProps) {
  const handleChipClick = (id: string) => {
    if (multiSelect) {
      if (selectedIds.includes(id)) {
        onChange(selectedIds.filter((selectedId) => selectedId !== id));
      } else {
        onChange([...selectedIds, id]);
      }
    } else {
      if (selectedIds.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isSelected = selectedIds.includes(chip.id);
        return (
          <button
            key={chip.id}
            onClick={() => handleChipClick(chip.id)}
            className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
              isSelected
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className={`text-sm ${isSelected ? 'text-cream' : 'text-gray-500'}`}>
                ({chip.count})
              </span>
            )}
            {isSelected && multiSelect && <X className="w-4 h-4" />}
          </button>
        );
      })}
    </div>
  );
}


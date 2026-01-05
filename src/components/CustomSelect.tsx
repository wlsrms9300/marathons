import { useState, useRef, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  icon: LucideIcon;
  iconColor: string;
  placeholder?: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  icon: Icon,
  iconColor,
  placeholder = "선택하세요",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white/60 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105"
      >
        <Icon className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
        <span className="text-xs font-medium text-card-foreground leading-5">
          {selectedOption?.label || placeholder}
        </span>
        <span
          className={`${iconColor} text-xs transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border-2 border-primary/10 py-2 min-w-[140px] z-50 animate-slideDown">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-all hover:bg-gradient-to-r leading-5 ${
                value === option.value
                  ? `bg-gradient-to-r from-primary/10 to-blue-100 text-primary ${iconColor.replace(
                      "text-",
                      "border-l-4 border-"
                    )}`
                  : "text-card-foreground hover:from-gray-50 hover:to-blue-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

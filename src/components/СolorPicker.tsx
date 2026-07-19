interface ColorPickerProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function ColorPicker({ id, label, value, onChange }: ColorPickerProps) {
    return (
      <div className="flex items-center gap-2">
        <label htmlFor={id}>{label}</label>
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
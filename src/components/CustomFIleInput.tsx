import React, { useRef } from "react";

interface CustomFileInputProps {
  id: string;
  disabled?: boolean;
  accept?: string;
  onChange: (file: File | null) => void;
  label?: string;
  selectedFileName?: string; // optional to display chosen file name
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  id,
  disabled,
  accept,
  onChange,
  label = "Choose File",
  selectedFileName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <div>
      <input
        type="file"
        id={id}
        ref={inputRef}
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        style={{ display: "none" }} // hide native file input
      />
      <button
        type="button"
        onClick={openFileDialog}
        disabled={disabled}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {label}
      </button>
      {selectedFileName && (
        <div className="mt-2 text-sm text-gray-600">Selected: {selectedFileName}</div>
      )}
    </div>
  );
};

export default CustomFileInput;

import { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, value, onChange, placeholder = "Select...", color }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className="relative inline-block w-48" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                style={{backgroundColor: color}}
                className="w-full text-white px-4 py-2 rounded-lg flex justify-between items-center"
            >
                {selectedOption ? selectedOption.label : placeholder}
                <span className="ml-2">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <ul className="absolute mt-2 w-full bg-primary border p-2 rounded-lg shadow-lg z-50">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-secondary ${value === opt.value ? "bg-primary font-semibold" : ""
                                }`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;

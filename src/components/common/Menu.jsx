import { useEffect, useRef } from "react";

const CustomMenu = ({
    anchorEl,
    open,
    onClose,
    options = [],
    offsetX = 0,
    offsetY = 8,
}) => {
    const menuRef = useRef(null);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onClose]);

    if (!open) return null;

    const rect = anchorEl?.getBoundingClientRect();
    const styles = rect
        ? {
            top: rect.bottom + offsetY,
            left: rect.left + offsetX,
        }
        : {};

    return (
        <div
            ref={menuRef}
            className="absolute z-50 min-w-[180px] rounded-lg bg-primary shadow-lg border py-2"
            style={styles}
        >
            {options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                        option.onClick();
                        onClose();
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${option.danger
                            ? "text-red-600 hover:bg-red-200"
                            : "text-secondary hover:bg-secondary"
                        }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default CustomMenu;

import { FileSpreadsheet, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(isOpen);
    const [animateIn, setAnimateIn] = useState(false);
    const panelRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // Wait for next frame before starting animation
            requestAnimationFrame(() => setAnimateIn(true));
        } else {
            setAnimateIn(false);
            const t = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !panelRef.current) return;
        const first = panelRef.current.querySelector(
            'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus?.();
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"
                    }`}
                onClick={() => onClose?.()}
                aria-hidden="true"
            />
            <aside
                ref={panelRef}
                className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-primary shadow-lg transition-all duration-300 ease-out ${animateIn ? "translate-x-0" : "-translate-x-full"
                    }`}
                role="navigation"
                aria-label="Main menu"
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <div className="text-lg font-medium">Menu</div>
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="p-1 rounded hover:bg-secondary"
                    >
                        ✕
                    </button>
                </div>

                <nav className="px-4 py-6 space-y-2">
                    <Link
                        to="/"
                        onClick={onClose}
                        className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-secondary"
                    >
                        <FileText size={24} color="#4385F3" />
                        Docs
                    </Link>
                    <Link
                        to="/spreadsheets"
                        onClick={onClose}
                        className="flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-secondary"
                    >
                        <FileSpreadsheet size={24} color="#2bff00" />
                        Sheets
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default SidebarMenu;

function CustomToast({ title, message }) {
    return (
        <div className="p-4 text-primary bg-primary shadow-lg">
            <span className="font-bold text-[var(--color-text-primary)]">{title}</span>
            <span className="text-sm text-[var(--color-text-secondary)]">{message}</span>
        </div>
    );
}

export default CustomToast;

/* eslint-disable react/prop-types */
const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const setLink = () => {
        const url = prompt("Enter URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = prompt("Enter image URL");
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    return (
        <div className="flex flex-wrap gap-2 border-b p-2 mb-3 bg-gray-50 text-sm">
            <button onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-blue-500 text-black px-2" : "px-2"}>B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-blue-500 text-black px-2" : "px-2"}>I</button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "bg-blue-500 text-black px-2" : "px-2"}>U</button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "bg-blue-500 text-black px-2" : "px-2"}>S</button>
            <button onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? "bg-blue-500 text-black px-2" : "px-2"}>{"</>"}</button>

            {[1, 2, 3].map(level => (
                <button key={level} onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    className={editor.isActive("heading", { level }) ? "bg-blue-500 text-black px-2" : "px-2"}>
                    H{level}
                </button>
            ))}

            <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-blue-500 text-black px-2" : "px-2"}>• List</button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-blue-500 text-black px-2" : "px-2"}>1. List</button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "bg-blue-500 text-black px-2" : "px-2"}>❝</button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "bg-blue-500 text-black px-2" : "px-2"}>Code Block</button>
            <button onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "bg-blue-500 text-black px-2" : "px-2"}>Highlight</button>

            <button onClick={setLink} className="px-2">🔗 Link</button>
            <button onClick={() => editor.chain().focus().unsetLink().run()} className="px-2">❌ Link</button>
            <input type="color" onInput={e => editor.chain().focus().setColor(e.target.value).run()} className="w-8 h-6 border cursor-pointer" />
            <button onClick={addImage} className="px-2">🖼 Image</button>

            <button onClick={addTable} className="px-2">📊 Table</button>
            <button onClick={() => editor.chain().focus().addColumnBefore().run()} className="px-2">+Col</button>
            <button onClick={() => editor.chain().focus().addRowBefore().run()} className="px-2">+Row</button>
            <button onClick={() => editor.chain().focus().deleteTable().run()} className="px-2">❌ Table</button>

            <button onClick={() => editor.chain().focus().undo().run()} className="px-2">⎌ Undo</button>
            <button onClick={() => editor.chain().focus().redo().run()} className="px-2">↻ Redo</button>
        </div>
    );
};

export default MenuBar;

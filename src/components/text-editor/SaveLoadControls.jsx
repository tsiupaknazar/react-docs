/* eslint-disable react/prop-types */

const SaveLoadControls = ({ editor }) => {
    if (!editor) return null;

    const saveHTML = () => {
        const html = editor.getHTML();
        localStorage.setItem("documentHTML", html);
        alert("Document saved as HTML!");
    };

    const loadHTML = () => {
        const html = localStorage.getItem("documentHTML");
        if (html) editor.commands.setContent(html);
        else alert("No saved HTML found!");
    };

    const saveJSON = () => {
        const json = editor.getJSON();
        localStorage.setItem("documentJSON", JSON.stringify(json));
        alert("Document saved as JSON!");
    };

    const loadJSON = () => {
        const json = localStorage.getItem("documentJSON");
        if (json) editor.commands.setContent(JSON.parse(json));
        else alert("No saved JSON found!");
    };

    return (
        <div className="flex gap-2 mt-3 p-2 border-t bg-gray-50 rounded-b-lg">
            <button onClick={saveHTML} className="px-3 py-1 bg-blue-500 text-white rounded">Save HTML</button>
            <button onClick={loadHTML} className="px-3 py-1 bg-green-500 text-white rounded">Load HTML</button>
            <button onClick={saveJSON} className="px-3 py-1 bg-purple-500 text-white rounded">Save JSON</button>
            <button onClick={loadJSON} className="px-3 py-1 bg-yellow-500 text-black rounded">Load JSON</button>
        </div>
    );
};

export default SaveLoadControls;

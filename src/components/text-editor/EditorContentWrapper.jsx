/* eslint-disable react/prop-types */
import { EditorContent } from "@tiptap/react";

const EditorContentWrapper = ({ editor }) => {
    if (!editor) return null;

    return (
        <EditorContent
            editor={editor}
            className="p-2 min-h-[400px] max-w-none focus:outline-none bg-white"
        />
    );
};

export default EditorContentWrapper;

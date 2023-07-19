import { Editor } from "@tinymce/tinymce-react";
import Header from "../header/Header";

const TextEditor = () => {
  return (
    <div>
      <Header docName={userDoc?.name} handleSave={handleSave} />
      <div className="flex items-center justify-center">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={userDoc?.content || "Initial text editor value"}
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          init={{
            branding: false,
            width: "100%",
            resize: false,
            menubar: false,
            statusbar: false,
            plugins:
              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists help charmap quickbars emoticons",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | align lineheight checklist bullist numlist | charmap emoticons | insertfile codesample",
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: "30s",
            autosave_prefix: "{path}{query}-{id}-",
            autosave_restore_when_empty: false,
            autosave_retention: "2m",
            image_advtab: true,
            importcss_append: true,
            height: 900,
            content_style: `
            body {
              background: #fff;
            }
    
            @media (min-width: 840px) {
              html {
                background: #eceef4;
                min-height: 100%;
                padding: 0 .5rem;
              }
    
              body {
                background-color: #fff;
                box-sizing: border-box;
                margin: 1rem auto 0;
                max-width: 820px;
                min-height: calc(100vh - 1rem);
                padding: 4rem 6rem 6rem 6rem;
              }
            }
          `,
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;

import { BaseKit } from 'reactjs-tiptap-editor';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Image } from 'reactjs-tiptap-editor/image';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
// import { Mention } from 'reactjs-tiptap-editor/mention';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';

export const extensions = [
    BaseKit.configure({
        placeholder: {
            showOnlyCurrent: true,
        },
        characterCount: {
            limit: 50_000,
        },
    }),
    History,
    FontFamily.configure({ spacer: true }),
    Heading,
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    TextDirection,
    MoreMark,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Indent,
    LineHeight,
    Link,
    Image.configure({
        upload: (files) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(files))
                }, 500)
            })
        },
    }),
    Blockquote,
    Code.configure({
        toolbar: false,
    }),
    CodeBlock,
    ColumnActionButton,
    Table,
    Iframe,
    // Mention,
    // Attachment.configure({ ... }),
];
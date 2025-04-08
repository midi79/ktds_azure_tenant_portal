import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import { useEffect, useRef } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./TiptapEditor.css";

const Tiptap = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (v: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "질문 내용을 입력해 주세요. 플로팅 메뉴 또는 타이핑으로 마크다운 문법을 사용할 수 있습니다.",
      }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (editor && content && !hasInitialized.current) {
      editor.commands.setContent(content);
      hasInitialized.current = true;
    }
  }, [editor, content]);

  return (
    <div className="long__input__wrapper">
      <div className="long__input__content">
        {editor && (
          <BubbleMenu
            className="bubble-menu"
            editor={editor}
            tippyOptions={{ duration: 100 }}
          >
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu
            className="floating-menu"
            editor={editor}
            tippyOptions={{ duration: 100 }}
          >
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet list
            </button>
          </FloatingMenu>
        )}

        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;

import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Article } from "../../models/Article";
import { useStore } from "../../stores/StoreManager";
import "react-quill/dist/quill.snow.css";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";

function Editor() {
  const EditorPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore, articleStore } = useStore();

  useEffect(() => {
    if (EditorPreflight.current) {
      EditorPreflight.current = false;
    }
  }, []);

  const [value, setValue] = useState(
    articleStore.selectedArticle?.content ?? ""
  );
  return (
    <main>
      <ReactQuill
        className="editorBox"
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="submitFooter">
        <button
          onClick={() => {
            if (articleStore.selectedArticle) {
            } else {
            }
            navigate("/Home");
          }}
        >
          Save
        </button>
      </div>
      <div className="previewBox">
        <h1>PREVIEW:</h1>
        <hr />
        <br />
        <Markup content={value} />
      </div>
    </main>
  );
}

export default observer(Editor);

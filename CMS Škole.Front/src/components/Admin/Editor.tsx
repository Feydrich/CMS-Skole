import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Article } from "../../models/Article";
import { useStore } from "../../stores/StoreManager";
import "react-quill/dist/quill.snow.css";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

function Editor() {
  const EditorPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore, articleStore, categoriesStore } = useStore();

  useEffect(() => {
    if (EditorPreflight.current) {
      EditorPreflight.current = false;
    }
  }, []);

  const [localArticle, setLocalArticle] = useState<Article>(
    articleStore.articleForEdit ?? ({} as Article)
  );
  return (
    <main>
      <div className="headerCRUD">
        <TextField
          id="filled-multiline-flexible"
          label="Naslov"
          required
          value={localArticle.name ?? ""}
          onChange={(e) => {
            setLocalArticle({ ...localArticle, name: e.target.value });
          }}
        />
        <TextField
          id="filled-multiline-flexible"
          label="Kratki opis"
          multiline
          required
          maxRows={4}
          value={localArticle.description ?? ""}
          onChange={(e) => {
            setLocalArticle({ ...localArticle, description: e.target.value });
          }}
        />
        <span>
          <label>Unos slike</label>
          <br />
          <input
            type="file"
            required
            name="myImage"
            onChange={(event) => {
              toast(event.target.value);
            }}
          />
        </span>
        <Button
          onClick={() => {
            if (
              localArticle.name &&
              localArticle.description &&
              localArticle.content
            ) {
              if (articleStore.articleForEdit?.id) {
                categoriesStore.editArticle(localArticle);
              } else {
                categoriesStore.createArticle({
                  ...localArticle,
                  author: sharedStore.user!,
                  creationDate: new Date(),
                });
              }
              navigate("/Home");
            } else {
              toast("Jedno od obaveznih polja je ostavljeno prazno");
            }
          }}
        >
          Save
        </Button>
      </div>
      <ReactQuill
        className="editorBox"
        theme="snow"
        value={localArticle.content}
        onChange={(e) => {
          setLocalArticle({ ...localArticle, content: e });
        }}
      />
      <div className="previewBox">
        <h1>PREVIEW:</h1>
        <hr />
        <br />
        <Markup content={localArticle.content} />
      </div>
    </main>
  );
}

export default observer(Editor);

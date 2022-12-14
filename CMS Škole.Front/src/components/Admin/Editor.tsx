import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Article } from "../../models/Article";
import { useStore } from "../../stores/StoreManager";
import "react-quill/dist/quill.snow.css";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

function Editor() {
  const EditorPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore, articleStore, categoriesStore } = useStore();

  useEffect(() => {
    if (EditorPreflight.current) {
      EditorPreflight.current = false;
    }
  }, []);

  const request = async (file: any) => {
    const formData = new FormData();

    formData.append("File", file.image);
  };

  const [confirmFlag, setConfirmFlag] = useState(false);

  const [localArticle, setLocalArticle] = useState<Article>(
    articleStore.articleForEdit ?? ({} as Article)
  );
  return (
    <main>
      <Dialog
        open={confirmFlag}
        onClose={() => {
          setConfirmFlag(false);
        }}
      >
        <DialogTitle>
          Je ste li sigurni da želite izbrisati "
          {articleStore.articleForEdit?.title}"?
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setConfirmFlag(false);
              navigate("/Home");
              categoriesStore.deleteArticle(localArticle.id);
            }}
          >
            DA
          </Button>
          <Button
            onClick={() => {
              setConfirmFlag(false);
            }}
          >
            NE
          </Button>
        </DialogActions>
      </Dialog>
      <div className="headerCRUD">
        <TextField
          id="filled-multiline-flexible"
          label="Naslov"
          required
          value={localArticle.title ?? ""}
          onChange={(e) => {
            setLocalArticle({ ...localArticle, title: e.target.value });
          }}
        />
        <TextField
          id="filled-multiline-flexible"
          label="Kratki opis"
          multiline
          required
          maxRows={2}
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
              if (event.target.files) {
                console.log(event.target.files[0]);
                request({
                  file: JSON.stringify(event.target.files[0]),
                  image: event.target.files[0],
                });
              }
            }}
          />
        </span>
        <span>
          <Button
            onClick={() => {
              if (
                localArticle.title &&
                localArticle.description &&
                localArticle.html
              ) {
                if (articleStore.articleForEdit?.id) {
                  categoriesStore.editArticle(localArticle);
                } else {
                  categoriesStore.createArticle({
                    ...localArticle,
                    author: sharedStore.user!,
                    created: new Date(),
                  });
                }
                //navigate("/Home");
              } else {
                toast("Jedno od obaveznih polja je ostavljeno prazno");
              }
            }}
          >
            Save
          </Button>
          {localArticle.id && (
            <Button
              onClick={() => {
                setConfirmFlag(true);
              }}
            >
              DELETE
            </Button>
          )}
        </span>
      </div>
      <ReactQuill
        className="editorBox"
        theme="snow"
        value={localArticle.html}
        onChange={(e) => {
          setLocalArticle({ ...localArticle, html: e });
        }}
      />
      <div className="previewBox">
        <h1>PREVIEW:</h1>
        <hr />
        <br />
        <Markup content={localArticle.html} />
      </div>
    </main>
  );
}

export default observer(Editor);

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
    return await fetch("http://localhost:8081/api/image/save", {
      method: "POST",
      body: { file: "", image: formData } as any,
    });
    return await axios.post("image/save", {
      file: file.file,
      image: formData,
    });
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
          {articleStore.articleForEdit?.name}"?
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
                localArticle.name &&
                localArticle.description &&
                localArticle.content
              ) {
                if (articleStore.articleForEdit?.id) {
                  categoriesStore.editArticle(localArticle);
                } else {
                  categoriesStore.createArticle({
                    ...localArticle,
                    id: new Date().toISOString(),
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

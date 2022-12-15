import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
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
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Category } from "../../models/Category";
import axios from "axios";

function Editor() {
  const EditorPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore, articleStore, categoriesStore } = useStore();

  const [parsedCategoryList, setParsedCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    if (EditorPreflight.current) {
      EditorPreflight.current = false;
    }
  }, []);

  useMemo(() => {
    if (categoriesStore.categories) {
      let subCategories: Category[][] = categoriesStore.categories.map((x) => {
        if (x.subCategories) return x.subCategories as Category[];
        else return [];
      });
      let combinedArray: Category[] = [];
      subCategories.forEach((x) => {
        combinedArray = combinedArray.concat(x);
      });
      setParsedCategoryList(combinedArray);
    }
  }, [categoriesStore.categories]);

  const [confirmFlag, setConfirmFlag] = useState(false);

  const [localArticle, setLocalArticle] = useState<Article>(
    articleStore.articleForEdit ?? ({} as Article)
  );

  const handleChange = (value: number) => {
    setLocalArticle({
      ...localArticle,
      category: { id: value },
    } as Article);
  };

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
        <Select
          id="simple-select"
          value={localArticle.category?.id ?? -1}
          onChange={(e) => handleChange(e.target.value as number)}
          MenuProps={{
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          }}
        >
          {parsedCategoryList.map((x, index) => (
            <MenuItem value={x.id} key={x.name + index + 15478}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
        <span>
          <label>Unos slike</label>
          <br />
          <input type="file" required name="myImage" onChange={(event) => {}} />
        </span>
        <span>
          <Button
            onClick={() => {
              if (
                sharedStore.user &&
                localArticle.title &&
                localArticle.description &&
                localArticle.html &&
                localArticle.category
              ) {
                categoriesStore.createOrEditArticle({
                  ...localArticle,
                  author: sharedStore.user,
                });

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

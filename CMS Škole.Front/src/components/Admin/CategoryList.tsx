import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";
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

const CreateOrEditForm = (props: any) => {
  const {
    editFlag,
    setEditFlag,
    setCategoryForCrud,
    categoryForCrud,
    shouldSelect,
    handleSubmit,
  } = props;
  const { categoriesStore } = useStore();

  return (
    <Dialog
      open={editFlag}
      onClose={() => {
        setEditFlag(false);
        setCategoryForCrud(null);
      }}
    >
      <DialogTitle>{categoryForCrud?.id ? "Edit" : "Create"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          label="Naziv"
          value={categoryForCrud?.name ?? ""}
          onChange={(e) => {
            setCategoryForCrud({ ...categoryForCrud, name: e.target.value });
          }}
          variant="standard"
        />
        {shouldSelect && (
          <Select
            id="simple-select"
            value={categoryForCrud?.superCategory?.id ?? ""}
            onChange={(e) => {
              setCategoryForCrud({
                ...categoryForCrud,
                superCategory: { id: e.target.value },
              });
            }}
            MenuProps={{
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            }}
          >
            {!categoryForCrud?.id && (
              <MenuItem value={-1}>Novi viši naslov</MenuItem>
            )}
            {categoriesStore.categories?.map((x, index) => (
              <MenuItem value={x.id} key={x.name + index + 25478}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            let data: any = { name: categoryForCrud.name };
            categoryForCrud.id && (data.id = categoryForCrud.id);
            if (
              categoryForCrud.superCategory &&
              categoryForCrud.superCategory.id != -1
            ) {
              data.superCategory = {};
              data.superCategory.id = categoryForCrud.superCategory.id;
            }

            handleSubmit(data);
            setEditFlag(false);
            setCategoryForCrud(null);
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setEditFlag(false);
            setCategoryForCrud(null);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const DeleteForm = (props: any) => {
  const {
    categoryForCrud,
    setCategoryForCrud,
    deleteFlag,
    setDeleteFlag,
    deleteAction,
  } = props;
  return (
    <Dialog
      open={deleteFlag}
      onClose={() => {
        setDeleteFlag(false);
        setCategoryForCrud(null);
      }}
    >
      <DialogTitle>
        Da li ste sigurni da želite izbrisati ovu kategoriju?
      </DialogTitle>
      <DialogContent>
        {categoryForCrud && (
          <>
            <b>{categoryForCrud.name ?? ""}: </b>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setDeleteFlag(false);
            setCategoryForCrud(null);
            deleteAction(categoryForCrud.id);
          }}
        >
          Da
        </Button>
        <Button
          onClick={() => {
            setDeleteFlag(false);
            setCategoryForCrud(null);
          }}
        >
          Ne
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function CategoryList() {
  const authorListPreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (authorListPreflight.current) {
      authorListPreflight.current = false;
      categoriesStore.getCategories();
    }
  }, []);

  const [editFlag, setEditFlag] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [categoryForCrud, setCategoryForCrud] = useState<Category | null>(null);

  return (
    <main>
      <h1>Popis Kategorija</h1>
      <Button
        onClick={() => {
          setCategoryForCrud({} as Category);
          setEditFlag(true);
          setIsSuper(false);
        }}
      >
        CREATE
      </Button>
      <CreateOrEditForm
        editFlag={editFlag}
        setEditFlag={setEditFlag}
        setCategoryForCrud={setCategoryForCrud}
        categoryForCrud={categoryForCrud}
        shouldSelect={!isSuper}
        handleSubmit={categoriesStore.addCategory}
      />
      <DeleteForm
        categoryForCrud={categoryForCrud}
        setCategoryForCrud={setCategoryForCrud}
        deleteFlag={deleteFlag}
        setDeleteFlag={setDeleteFlag}
        deleteAction={categoriesStore.deleteCategory}
      />
      {categoriesStore.categories?.map((x, index) => (
        <>
          <div key={"item" + index + x.name}>
            <span>
              <h1>{x.name}</h1>
            </span>
            <span>
              <Button
                onClick={() => {
                  setCategoryForCrud(x);
                  setEditFlag(true);
                  setIsSuper(true);
                }}
              >
                EDIT
              </Button>
              <Button
                onClick={() => {
                  setCategoryForCrud(x);
                  setDeleteFlag(true);
                }}
              >
                DELETE
              </Button>
            </span>
          </div>
          {x.subCategories?.map((y, index) => (
            <div className="userBar" key={y.name + index + "item"}>
              <span>{y.name}</span>{" "}
              <span>
                <Button
                  onClick={() => {
                    setCategoryForCrud(y);
                    setEditFlag(true);
                    setIsSuper(false);
                  }}
                >
                  EDIT
                </Button>
                <Button
                  onClick={() => {
                    setCategoryForCrud(y);
                    setDeleteFlag(true);
                  }}
                >
                  DELETE
                </Button>
              </span>
            </div>
          ))}
        </>
      ))}
    </main>
  );
}

export default observer(CategoryList);

import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../models/Category";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "../Articles/ArticleCard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { toJS } from "mobx";

const CreateOrEditForm = (props: any) => {
  const {
    editFlag,
    setEditFlag,
    setUserForCrud,
    userForCrud,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <Dialog
      open={editFlag}
      onClose={() => {
        setEditFlag(false);
        setUserForCrud(null);
      }}
    >
      <DialogTitle>{userForCrud?.id ? "Edit" : "Create"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          label="Ime"
          value={userForCrud?.name ?? ""}
          onChange={(e) => {
            setUserForCrud({ ...userForCrud, name: e.target.value });
          }}
          variant="standard"
        />
        <TextField
          autoFocus
          id="email"
          type="email"
          label="email"
          value={userForCrud?.mail ?? ""}
          onChange={(e) => {
            setUserForCrud({ ...userForCrud, mail: e.target.value });
          }}
          variant="standard"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={userForCrud?.roles ?? []}
          onChange={(e) => handleChange(e.target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={{
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          }}
        >
          {/* Treba zamijeniti sa podatcima dohvacenim iz baze */}
          <MenuItem value="Admin" key="Admin">
            Admin
          </MenuItem>
          <MenuItem value="Regular user" key="Regular user">
            Regular user
          </MenuItem>
          <MenuItem value="Guest" key="Guest">
            Guest
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setEditFlag(false);
            setUserForCrud(null);
            handleSubmit(userForCrud);
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setEditFlag(false);
            setUserForCrud(null);
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
    userForCrud,
    setUserForCrud,
    deleteFlag,
    setDeleteFlag,
    deleteAction,
  } = props;
  return (
    <Dialog
      open={deleteFlag}
      onClose={() => {
        setDeleteFlag(false);
        setUserForCrud(null);
      }}
    >
      <DialogTitle>
        Da li ste sigurni da želite izbrisati ovog korisnika?
      </DialogTitle>

      <DialogActions>
        <Button
          onClick={() => {
            setDeleteFlag(false);
            setUserForCrud(null);
            deleteAction(userForCrud);
          }}
        >
          Da
        </Button>
        <Button
          onClick={() => {
            setDeleteFlag(false);
            setUserForCrud(null);
          }}
        >
          Ne
        </Button>
      </DialogActions>
    </Dialog>
  );
};
function UserList() {
  const authorListPreflight = useRef(true);

  const { sharedStore } = useStore();

  useEffect(() => {
    if (authorListPreflight.current) {
      authorListPreflight.current = false;
      /* DELETE */
      !sharedStore.userList && sharedStore.getUsers();
    }
  }, []);
  useEffect(() => {
    console.log(toJS(sharedStore.userList));
  }, [sharedStore.userList]);

  const [editFlag, setEditFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [userForCrud, setUserForCrud] = useState<User | null>(null);

  const handleChange = (value: string | string[]) => {
    setUserForCrud({
      ...userForCrud,
      roles: typeof value === "string" ? value.split(",") : value,
    } as User);
  };

  return (
    <main>
      <h1>Popis korisnika</h1>
      <button
        onClick={() => {
          setUserForCrud({} as User);
          setEditFlag(true);
        }}
      >
        CREATE
      </button>
      <CreateOrEditForm
        editFlag={editFlag}
        setEditFlag={setEditFlag}
        setUserForCrud={setUserForCrud}
        userForCrud={userForCrud}
        handleChange={handleChange}
        handleSubmit={
          userForCrud?.id ? sharedStore.editUser : sharedStore.createUser
        }
      />
      <DeleteForm
        userForCrud={userForCrud}
        setUserForCrud={setUserForCrud}
        deleteFlag={deleteFlag}
        setDeleteFlag={setDeleteFlag}
        deleteAction={sharedStore.deleteUser}
      />
      {sharedStore.userList?.map((x, index) => (
        <div
          className="userBar"
          key={"userBar" + index}
          style={
            index === sharedStore.userList!.length - 1
              ? { borderBottom: "solid 1px gray" }
              : {}
          }
        >
          <span>
            {x.name} {x.surname} - {x.mail}
          </span>
          <span>
            <button
              onClick={() => {
                setUserForCrud(x);
                setEditFlag(true);
              }}
            >
              EDIT
            </button>
            <button
              onClick={() => {
                setUserForCrud(x);
                setDeleteFlag(true);
              }}
            >
              DELETE
            </button>
          </span>
        </div>
      ))}
    </main>
  );
}

export default observer(UserList);

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

  const [userForCrud, setUserForCrud] = useState<User | null>(null);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    // setUserForCrud({
    //   ...userForCrud,
    //   roles: typeof value === "string" ? value.split(",") : value,
    // });
  };

  const CreateOrEditForm = () => {
    return (
      <Dialog
        open={userForCrud ? true : false}
        onClose={() => setUserForCrud(null)}
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
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={userForCrud?.roles}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            input={<OutlinedInput label="Name" />}
            MenuProps={{
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            }}
          >
            {/* Treba zamijeniti sa podatcima dohvacenim iz baze */}
            <MenuItem value="admin" key="1">
              Admin
            </MenuItem>
            <MenuItem value="reg" key="2">
              Regular user
            </MenuItem>
            <MenuItem value="guest" key="3">
              Guest
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button>Submit</Button>
          <Button onClick={() => setUserForCrud(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <main>
      <h1>Popis korisnika</h1>
      <button>CREATE</button>
      <CreateOrEditForm />
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
              }}
            >
              EDIT
            </button>
            <button>DELETE</button>
          </span>
        </div>
      ))}
    </main>
  );
}

export default observer(UserList);

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
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { toJS } from "mobx";
import RoleList from "./RoleList";

const CreateOrEditForm = (props: any) => {
  const {
    editFlag,
    setEditFlag,
    setUserForCrud,
    userForCrud,
    handleChange,
    handleSubmit,
  } = props;
  const { sharedStore } = useStore();
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
          label="roles"
          multiple
          value={userForCrud?.role ?? []}
          onChange={(e) => handleChange(e.target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={{
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          }}
        >
          {sharedStore.roleList.map((x, index) => (
            <MenuItem value={x.id} key={x.name + index + 2}>
              {x.name}
            </MenuItem>
          ))}
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

      sharedStore.getUsers();
    }
  }, []);

  const [editFlag, setEditFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [userForCrud, setUserForCrud] = useState<User | null>(null);

  const handleChange = (value: number[]) => {
    let roles: { id: number; name: string }[] = [];
    sharedStore.roleList.forEach(
      (x) => value.includes(x.id) && roles.push(toJS(x))
    );
    let item = {
      ...userForCrud,
      role: roles,
    };
    console.log(item);
    setUserForCrud(item as User);
  };

  return (
    <main>
      <RoleList />
      <h1>Popis korisnika</h1>
      <Button
        onClick={() => {
          setUserForCrud({} as User);
          setEditFlag(true);
        }}
      >
        CREATE
      </Button>
      <CreateOrEditForm
        editFlag={editFlag}
        setEditFlag={setEditFlag}
        setUserForCrud={setUserForCrud}
        userForCrud={userForCrud}
        handleChange={handleChange}
        handleSubmit={sharedStore.createOrEditUser}
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
            <Button
              onClick={() => {
                setUserForCrud(x);
                setEditFlag(true);
              }}
            >
              EDIT
            </Button>
            <Button
              onClick={() => {
                setUserForCrud(x);
                setDeleteFlag(true);
              }}
            >
              DELETE
            </Button>
          </span>
        </div>
      ))}
    </main>
  );
}

export default observer(UserList);

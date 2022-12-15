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
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { toJS } from "mobx";
import RoleList from "./RoleList";
import { finished } from "stream/promises";

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

  const [age, setAge] = useState("");

  const handleChange2 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
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
          id="mail"
          label="Email"
          value={userForCrud?.mail ?? ""}
          onChange={(e) => {
            setUserForCrud({ ...userForCrud, mail: e.target.value });
          }}
          variant="standard"
        />
        <TextField
          autoFocus
          id="username"
          label="Korisničko ime"
          value={userForCrud?.username ?? ""}
          onChange={(e) => {
            setUserForCrud({ ...userForCrud, username: e.target.value });
          }}
          variant="standard"
        />
        {userForCrud && !userForCrud.id && (
          <TextField
            autoFocus
            id="password"
            label="Lozinka"
            value={userForCrud?.password ?? ""}
            onChange={(e) => {
              setUserForCrud({ ...userForCrud, password: e.target.value });
            }}
            variant="standard"
          />
        )}

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
          id="surname"
          label="Prezime"
          value={userForCrud?.surname ?? ""}
          onChange={(e) => {
            setUserForCrud({ ...userForCrud, surname: e.target.value });
          }}
          variant="standard"
        />

        <Select
          id="simple-select"
          value={userForCrud?.role?.id ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          MenuProps={{
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          }}
        >
          {sharedStore.roleList.map((x, index) => (
            <MenuItem value={x.id} key={x.name + index + 25478}>
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
      <DialogContent>
        {userForCrud && (
          <>
            <b>{userForCrud.username ?? ""}: </b>{" "}
            <span>
              {userForCrud.name ?? ""} {userForCrud.surname ?? ""}
            </span>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setDeleteFlag(false);
            setUserForCrud(null);
            deleteAction(userForCrud.id);
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

  useEffect(() => {
    console.log(userForCrud);
  }, [userForCrud]);

  const handleChange = (value: number) => {
    let role: { id: number; name: string } = {
      id: -100,
      name: "Please select a valid role",
    };
    const find = sharedStore.roleList.find((x) => x.id === value);
    find && (role = toJS(find));
    setUserForCrud({
      ...userForCrud,
      role: role,
    } as User);
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
          {sharedStore.user && sharedStore.user.role?.name === "superAdmin" && (
            <span>
              <Button
                onClick={() => {
                  setUserForCrud(x);
                  setEditFlag(true);
                }}
              >
                EDIT
              </Button>
              {sharedStore.user && x.id !== sharedStore.user.id && (
                <Button
                  onClick={() => {
                    setUserForCrud(x);
                    setDeleteFlag(true);
                  }}
                >
                  DELETE
                </Button>
              )}
            </span>
          )}
        </div>
      ))}
    </main>
  );
}

export default observer(UserList);

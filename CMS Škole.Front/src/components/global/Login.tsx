import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";

function Login() {
  const loginPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore } = useStore();

  useEffect(() => {
    if (loginPreflight.current) {
      loginPreflight.current = false;
    }
  }, []);

  const [localUser, setLocalUser] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  return (
    <Dialog
      open={sharedStore.loginIsOpen}
      onClose={() => sharedStore.setLoginIsOpen(false)}
      className="loginDialog"
    >
      {!sharedStore.user ? (
        <>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <div>Unesite vaše podatke za pristup web stranici</div>

            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="korisnik@domena.hr"
              value={localUser.username}
              onChange={(e) =>
                setLocalUser({ ...localUser, username: e.target.value })
              }
            />
            <TextField
              id="outlined-password-input"
              label="Šifra"
              type="password"
              autoComplete="current-password"
              value={localUser.password}
              onChange={(e) =>
                setLocalUser({ ...localUser, password: e.target.value })
              }
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() =>
                sharedStore.tryLogin(localUser.username, localUser.password)
              }
            >
              Login
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Vaš profil:</DialogTitle>
          <DialogContent>
            <hr />

            {Object.keys(sharedStore.user)
              .filter((x) => x !== "jwt" && x !== "password")
              .map((x, index) => (
                <span key={"attribute" + index}>
                  <b>{x}: </b>
                  {sharedStore.user![x as keyof User]}
                </span>
              ))}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                navigate("/ArticleList");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Editor
            </Button>
            <Button
              onClick={() => {
                navigate("/UserList");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Users
            </Button>
            <Button
              onClick={() => {
                navigate("/SiteSettings");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Postavke Stranice
            </Button>
            <Button
              onClick={() => {
                sharedStore.setUser(null);
                setLocalUser({ username: "", password: "" });
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default observer(Login);

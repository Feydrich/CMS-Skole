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
              id="outlined-required"
              label="Korisničko ime"
              placeholder="korisnik"
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
              variant="contained"
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
            <p>Korisničko ime: {sharedStore.user.username}</p>
            <p>
              Ime: {sharedStore.user.name} {sharedStore.user.surname}
            </p>
            <p>Mail: {sharedStore.user.mail}</p>
            <p>
              Uloge:{" "}
              {sharedStore.user.roles?.map((x, index) =>
                index ? " " : "| " + x.name
              )}
            </p>
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/ArticleList");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Editor
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/UserList");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Users
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/SiteSettings");
                sharedStore.setLoginIsOpen(false);
              }}
            >
              Postavke Stranice
            </Button>
            <Button
              variant="contained"
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

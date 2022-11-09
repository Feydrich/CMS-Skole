import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";

function Login() {
  const loginPreflight = useRef(true);

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
    <div className="loginPopUp">
      {!sharedStore.user ? (
        <>
          <span>
            <h2>Login</h2>
          </span>
          <span>
            <label>Username:</label>
            <input
              value={localUser.username}
              onChange={(e) =>
                setLocalUser({ ...localUser, username: e.target.value })
              }
            ></input>
          </span>
          <span>
            <label>Password:</label>
            <input
              value={localUser.password}
              onChange={(e) =>
                setLocalUser({ ...localUser, password: e.target.value })
              }
              type="password"
            ></input>
          </span>
          <span>
            <button
              onClick={() => {
                sharedStore.tryLogin(localUser.username, localUser.password);
              }}
            >
              Login
            </button>
          </span>
        </>
      ) : (
        <>
          <h2>Vaš profil:</h2>
          <hr />

          <Link to="/ArticleList">Editor</Link>
          {Object.keys(sharedStore.user)
            .filter((x) => x !== "jwt" && x !== "password")
            .map((x) => (
              <span>
                <b>{x}: </b>
                {sharedStore.user![x as keyof User]}
              </span>
            ))}

          <span>
            <button
              onClick={() => {
                sharedStore.setUser(null);
                setLocalUser({ username: "", password: "" });
              }}
            >
              Logout
            </button>
          </span>
        </>
      )}
    </div>
  );
}

export default observer(Login);

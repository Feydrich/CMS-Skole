import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
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

  const [loginMode, setLoginMode] = useState(true);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        sharedStore.setUser({ username: "test" } as User);
      }}
    >
      Login
    </button>
  );
}

export default observer(Login);

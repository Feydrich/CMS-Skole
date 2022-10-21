import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../stores/StoreManager";

function Home() {
  const homePreflight = useRef(true);

  const { sharedStore } = useStore();

  useEffect(() => {
    if (homePreflight.current) {
      homePreflight.current = false;
    }
  }, []);

  return (
    <>
      <h2>Home</h2>
      <a href="#" onClick={() => sharedStore.setUser(null)}>
        Log out
      </a>
    </>
  );
}

export default observer(Home);

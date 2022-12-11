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

function RoleList() {
  const authorListPreflight = useRef(true);

  const { sharedStore } = useStore();

  useEffect(() => {
    if (authorListPreflight.current) {
      authorListPreflight.current = false;

      sharedStore.getRoles();
    }
  }, []);
  useEffect(() => {
    console.log(toJS(sharedStore.userList));
  }, [sharedStore.userList]);

  return (
    <>
      <h1>Popis uloga</h1>
      {sharedStore.roleList.map((x) => x.name + " ")}
    </>
  );
}

export default observer(RoleList);

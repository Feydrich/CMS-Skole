import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Article } from "../../models/Article";
import { useStore } from "../../stores/StoreManager";
import "react-quill/dist/quill.snow.css";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

function SiteSettings() {
  const SiteSettingsPreflight = useRef(true);

  const navigate = useNavigate();
  const { sharedStore } = useStore();

  useEffect(() => {
    if (SiteSettingsPreflight.current) {
      SiteSettingsPreflight.current = false;
    }
  }, []);

  const [localColors, setLocalColors] = useState(
    sharedStore.siteSettings.colorSchemes
  );
  const [hoverFlag, setHoverFlag] = useState(false);

  const article = {
    image: require("../../styles/images/placeholder.jpg"),
    title: "placeholder",
    author: { name: "placeholder" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
  } as Article;

  return (
    <main>
      <div
        className="headerCRUD"
        style={{ backgroundColor: localColors.primaryColorTransparent }}
      >
        <span>
          <label>Pozadina:</label>
          <br />
          <input
            value={localColors.background}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                background: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Header:</label>
          <br />
          <input
            value={localColors.legend}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                legend: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Primarna boja:</label>
          <br />
          <input
            value={localColors.primaryColor}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                primaryColor: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Primarna boja tamnije:</label>
          <br />
          <input
            value={localColors.primaryColorDark}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                primaryColorDark: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Primarna boja prozirno:</label>
          <br />
          <input
            value={localColors.primaryColorTransparent}
            type={"color"}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                primaryColorTransparent: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Sekundarna boja:</label>
          <br />
          <input
            value={localColors.secondaryColor}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({ ...localColors, secondaryColor: e.target.value })
            }
          />
        </span>
        <span>
          <label>Sekundarna boja tamnije:</label>
          <br />
          <input
            value={localColors.secondaryColorDark}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                secondaryColorDark: e.target.value,
              })
            }
          />
        </span>
        <span>
          <label>Boja teksta:</label>
          <br />
          <input
            value={localColors.fontColor}
            type={"color"}
            required={true}
            onChange={(e) =>
              setLocalColors({
                ...localColors,
                fontColor: e.target.value,
              })
            }
          />
        </span>
        <span>
          <Button onClick={(e) => sharedStore.changeStyles(localColors)}>
            Save
          </Button>
        </span>
      </div>
      <div className="exampleContainer">
        <div
          className="articleCard"
          style={{
            backgroundColor: !hoverFlag
              ? localColors.primaryColor
              : localColors.secondaryColor,
          }}
          onMouseEnter={() => setHoverFlag(true)}
          onMouseLeave={() => setHoverFlag(false)}
        >
          <div
            className="headerExample"
            style={{ backgroundColor: localColors.primaryColorDark }}
          ></div>
          <img src={article.image} />
          <div className="cardContent" style={{ color: localColors.fontColor }}>
            <h2>{article.title}</h2>

            {/* <h3>{article.author.name}</h3> */}
            <hr />
            <p>{article.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default observer(SiteSettings);

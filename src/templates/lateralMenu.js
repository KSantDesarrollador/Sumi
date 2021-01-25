import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import axios from "axios";
// importando componentes de material ui
import { List, Tooltip, Divider, CssBaseline } from "@material-ui/core";

const stylesPage = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#3393FF",
    position: "relative",
    overflowX: "hidden",
    maxHeight: "auto",
    color: "#ffffff",
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  icons: {
    color: "white",
    fontSize: "20px",
    width: "10%",
  },
  list: {
    textDecoration: "none",
    color: "white",
    background: "#3393FF",
    fontSize: 10,
  },
  nested: {
    paddingLeft: theme.spacing(2),
    width: "100%",
  },
  text: {
    fontSize: "40px",
    background: "rgba(0,0,0,0.1)",
  },
}));

const session = new Cookies();
const ServUrl = "http://localhost/SUMI/models/menuModel.php";

const MainListItems = () => {
  const classList = stylesPage();
  const [dataMenu, setDataMenu] = useState([]);
  const [dataSubmenu, setDataSubmenu] = useState([]);

  // obteniendo datos de un servidor
  const listMenu = async () => {
    await axios
      .get(ServUrl + "?rol=" + session.get("id"))
      .then((response) => {
        setDataMenu(response.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  //obteniendo datos de un servidor
  const listSubmenu = async (idSelect) => {
    await axios
      .get(ServUrl + "?id=" + idSelect)
      .then((response) => {
        setDataSubmenu(response.data);
        showSubmenu(idSelect);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    listMenu();
  });

  const showSubmenu = (id) => {
    let menu = document.getElementById(id);
    let subMenu = menu.nextElementSibling;
    let icon = menu.lastChild;
    let allMenu = document.querySelectorAll(".sub-menu-options");
    let allIcon = document.querySelectorAll(".span");
    let allContainer = document.querySelectorAll(".btn-subMenu");

    if (subMenu.classList.contains("sub-menu-options-show")) {
      menu.classList.remove("activo");
      icon.classList.replace("zmdi-chevron-down", "zmdi-chevron-left");
      subMenu.classList.remove("sub-menu-options-show");
    } else {
      for (let i = 0; i < allMenu.length; i++) {
        if (allMenu[i].classList.contains("sub-menu-options-show")) {
          allMenu[i].classList.remove("sub-menu-options-show");
        }
      }
      for (let j = 0; j < allIcon.length; j++) {
        if (allIcon[j].classList.contains("zmdi-chevron-down")) {
          allIcon[j].classList.replace(
            "zmdi-chevron-down",
            "zmdi-chevron-left"
          );
        }
      }
      for (let k = 0; k < allContainer.length; k++) {
        if (allContainer[k].classList.contains("activo")) {
          allContainer[k].classList.remove("activo");
        }
      }

      menu.classList.add("activo");
      icon.classList.replace("zmdi-chevron-left", "zmdi-chevron-down");
      subMenu.classList.add("sub-menu-options-show");
    }
  };

  const setDashboard = () => {
    let dash = "";
    let deskRol = session.get("id");
    switch (deskRol) {
      case "1":
        dash = "/dashAdmin";
        break;
      case "2":
        dash = "/dashSuper";
        break;
      case "3":
        dash = "/dashTecni";
        break;
      case "4":
        dash = "/dashUser";
        break;

      default:
        break;
    }
    return dash;
  };
  // console.log(dataMenu);
  return (
    <List className='full-width'>
      <CssBaseline />
      <ul className='full-width list-unstyle menu-principal'>
        <li className='full-width'>
          <Link to={setDashboard} className='full-width'>
            <div className='navLateral-body-cl'>
              <Tooltip title='Escritorio' placement='right'>
                <i className='zmdi zmdi-view-dashboard' id='KsvmEscritorio'></i>
              </Tooltip>
            </div>
            <div className='navLateral-body-cr'>ESCRITORIO</div>
          </Link>
        </li>
        <Divider />
        <li className='full-width divider-menu-h'></li>
        {dataMenu.map((itemMenu) => (
          <li
            key={itemMenu.MnuId}
            className='full-width'
            onClick={() => {
              listSubmenu(itemMenu.MnuId);
            }}>
            <Link to='#' className='full-width btn-subMenu' id={itemMenu.MnuId}>
              <div className='navLateral-body-cl'>
                <Tooltip title={itemMenu.MnuLeyendMen} placement='right'>
                  <i className={itemMenu.MnuIconMen}></i>
                </Tooltip>
              </div>
              <div className='navLateral-body-cr'>{itemMenu.MnuNomMen}</div>
              <span
                className={`zmdi zmdi-chevron-left span ${classList.icons}`}></span>
            </Link>
            <ul className='full-width menu-principal sub-menu-options'>
              {dataSubmenu.map((itemSubmenu) => (
                <li className='full-width' key={itemSubmenu.MnuId}>
                  <Link to={itemSubmenu.MnuUrlMen} className='full-width'>
                    <div className='navLateral-body-cl'>
                      <Tooltip
                        title={itemSubmenu.MnuLeyendMen}
                        placement='right'>
                        <i className={itemSubmenu.MnuIconMen}></i>
                      </Tooltip>
                    </div>
                    <div className='navLateral-body-cr'>
                      {itemSubmenu.MnuNomMen}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </List>
  );
};

export default MainListItems;

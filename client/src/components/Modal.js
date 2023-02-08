import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Modal.css";
import { createPortal } from "react-dom";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { doctorInfoActions } from "../store/doctorInfoSlice";

export default function Modal(props) {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.doctorInfo.services);
  const offices = useSelector((state) => state.doctorInfo.offices);
  const [list, setList] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const modalRef = useRef(null);
  const [addListName, setAddListName] = useState("");
  const [addListDetail, setAddListDetail] = useState("");

  useEffect(() => {
    if (props.title === "Services") {
      let tmpList = [];
      services.list.forEach((service) => {
        tmpList.push({
          name: service.name,
          description: service.description,
        });
      });
      setList(tmpList);
    } else {
      let tmpList = [];
      offices.list.forEach((office) => {
        tmpList.push({
          name: office.name,
          description: office.address,
          id: office.id,
        });
      });
      setList(tmpList);
    }
  }, [services, offices]);

  useEffect(() => {
    document.addEventListener("click", exitOutModal, true);
  }, []);

  function exitOutModal(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      props.setOpen(false);
    }
  }

  function removeElement(element) {
    if (deleteMode) {
      if (props.title === "Services") {
        dispatch(doctorInfoActions.removeService(element.name));
      } else {
        dispatch(doctorInfoActions.removeOffice(element.id));
      }
    }
  }

  function addElement(element) {
    if (addListName.length != 0 && addListDetail.length != 0) {
      if (props.title === "Services") {
        let newService = {
          name: addListName,
          description: addListDetail,
        };
        dispatch(doctorInfoActions.addService(newService));
        setAddListDetail("");
        setAddListName("");
      } else {
        let newId = Math.floor(Math.random() * 1000) + 100;
        let newOffice = {
          id: newId,
          address: addListDetail,
          name: addListName,
        }
        dispatch(doctorInfoActions.addOffice(newOffice));
      }
    }
  }

  return (
    <Fragment>
      {createPortal(
        <div className="modalBackground">
          <div ref={modalRef} className="modalContainer">
            <button
              className="modalCloseButton"
              onClick={() => props.setOpen(false)}
            >
              &times;
            </button>
            <div className="modalTitle">
              <h1>{props.title}</h1>
            </div>
            <div className="modalBody">
              {list.map((element) => (
                <div
                  className={
                    deleteMode
                      ? "modalBodyListContainer listHover"
                      : "modalBodyListContainer"
                  }
                  onClick={() => {
                    removeElement(element);
                  }}
                >
                  <div className="modalBodyListTitleContainer">
                    <p className="modalBodyListContainerName">{element.name}</p>
                  </div>
                  <p className="modalBodyListContainerDetail">
                    {element.description}
                  </p>
                </div>
              ))}
              <div className="modalBodyListContainer">
                <div className="bodyListNameInputContainer">
                  <TextField
                    className="bodyListNameInput"
                    size="small"
                    label={props.ask1}
                    variant="outlined"
                    value={addListName}
                    onChange={(event) => setAddListName(event.target.value)}
                  />
                </div>

                <TextField
                  className="bodyListDetailInput"
                  size="small"
                  label={props.ask2}
                  variant="outlined"
                  value={addListDetail}
                  onChange={(event) => setAddListDetail(event.target.value)}
                />
              </div>
            </div>
            <div className="modalButtonContainer">
              <div className="modalFooter">
                <button
                  onClick={() => setDeleteMode((prev) => !prev)}
                  className={
                    deleteMode
                      ? "deleteButton deleteButtonActive"
                      : "deleteButton"
                  }
                >
                  Delete
                </button>
                <button onClick={addElement} className="addButton">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
}

import React, { useEffect, useState } from "react";
import IconsBack from "../../assets/iconsBack";
import "toastr/build/toastr.min.css";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./CreateNote.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Error from "../Error/Error";
import { createNote, reseatStatus } from "../../Redux/features/postSlice";
import { setUserId } from "../../Redux/features/userLoginSlice";
import { jwtDecode } from "jwt-decode";
import toastr from "toastr";
import { Modal } from "@mui/material";
import CircularIndeterminate from "../../assets/loading";

const CreateNote: React.FC = () => {
  interface JWT {
    userId: string;
  }
  const navigate = useNavigate();
  const [editor, setEditor] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [loading, setLoading] = useState<boolean>(true);

  const changeEditorChange = (content: string) => {
    setEditor(content);
  };
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.login.token);
  const userId = useSelector((state: RootState) => state.login.userId);
  const state = useSelector(
    (state: RootState) => state.notes.status_create_note
  );
  const error: string | unknown = useSelector(
    (state: RootState) => state.notes.error
  );
  // Define las configuraciones de la barra de herramientas
  const toolbarLarge =
    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code";
  const toolbarSmall = "undo redo | formatselect | bold italic";
  const [toolbarConfig, setToolbarConfig] = useState(toolbarLarge);

  // Usa una configuración u otra dependiendo del tamaño de la pantalla
  useEffect(() => {
    window.innerWidth > 600
      ? setToolbarConfig(toolbarLarge)
      : setToolbarConfig(toolbarSmall);
  }, [window.innerWidth]);

  const [widthEditor, setWidthEditor] = useState(window.innerWidth);

  useEffect(() => {
    setWidthEditor(window.innerWidth);
  }, [window.innerWidth]);

  const dispatch = useDispatch<AppDispatch>();
  toastr.options = {
    closeButton: true,
    debug: true,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-full-width",
    preventDuplicates: false,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 2000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const [logged, setLogged] = useState(true);
  useEffect(() => {
    if (token && isAuthenticated) {
      const decodedToken = jwtDecode<JWT>(token);
      setLogged(true);

      dispatch(setUserId(decodedToken.userId));
    } else {
      if (!token || !isAuthenticated) {
        setLogged(false);
      }
    }
  }, [dispatch, isAuthenticated, token]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(createNote({ title, description: editor, userId }));
  };
  useEffect(() => {
    if (title === " ") {
      setTitle("Sin titulo");
    }
    if (editor === " ") {
      setEditor("Nota vacía");
    }
  }, [editor, title]);

  useEffect(() => {
    if (state === "success") {
      navigate("/dashboard");
      setTimeout(() => {
        toastr.success("Nota guardada con éxito!");
        dispatch(reseatStatus());
      }, 1000);
    }
    if (error) {
      toastr.error(`${error}`);
      dispatch(reseatStatus());
    }
  }, [dispatch, error, navigate, state]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [loading]);

  return (
    <div>
      <Modal open={true}>
        {!loading ? (
          logged ? (
            <div className={styles.container}>
              <div className={styles.banner}>
                <NavLink
                  to={"/dashboard"}
                  onClick={() => {
                    dispatch(
                      createNote({ title, description: editor, userId })
                    );
                  }}
                >
                  <IconsBack />
                </NavLink>
                <div className={styles.input}>
                  <input
                    type="text"
                    placeholder=" "
                    name="title"
                    onChange={changeTitle}
                  />
                  <label htmlFor="">Titulo</label>
                </div>
              </div>
              <form>
                <Editor
                  id={styles.form}
                  onEditorChange={changeEditorChange}
                  init={{
                    height: 575,
                    width: widthEditor,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "code",
                    ],
                    placeholder: "Escribe una nota",
                    content_css: "./CreateNote.module.css",
                    toolbar: toolbarConfig,
                  }}
                />
              </form>
              <button className={styles.btn_save} onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          ) : (
            <Error />
          )
        ) : (
          <CircularIndeterminate />
        )}
      </Modal>
    </div>
  );
};
export default CreateNote;

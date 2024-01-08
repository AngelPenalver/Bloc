import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./NoteDetailView.module.css";
import IconsBack from "../../assets/iconsBack";
import { NavLink, useParams } from "react-router-dom";
import Error from "../Error/Error";
import CircularIndeterminate from "../../assets/loading";
import { Editor } from "@tinymce/tinymce-react";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUserId } from "../../Redux/features/userLoginSlice";
import { useDispatch } from "react-redux";
import { getNoteForId, saveNote } from "../../Redux/features/postSlice";
import { set, useForm } from "react-hook-form";

const NoteDetailView: React.FC = () => {
  interface JWT {
    userId: string;
  }
  interface DataForm {
    title: string;
    description: string;
  }
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const { id } = useParams();
  const noteId = id;
  const token = useSelector((state: RootState) => state.login.token);
  const note = useSelector((state: RootState) => state.notes.noteDetail);
  const [input, setInput] = useState({
    title: '',
    description: ''
  })
    const [logged, setLogged] = useState(true);
  const toolbarLarge =
    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | code";
  const toolbarSmall = "undo redo | formatselect | bold italic";
  const [toolbarConfig, setToolbarConfig] = useState(toolbarLarge);
  const userId = useSelector((state: RootState) => state.login.userId);
  const { register, handleSubmit } = useForm<DataForm>({ mode: "onTouched" });

  // Usa una configuración u otra dependiendo del tamaño de la pantalla
  useEffect(() => {
    window.innerWidth > 600
      ? setToolbarConfig(toolbarLarge)
      : setToolbarConfig(toolbarSmall);
  }, []);

  const [widthEditor, setWidthEditor] = useState(window.innerWidth);
  

  useEffect(() => {
    setWidthEditor(window.innerWidth);
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(getNoteForId(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [loading]);
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

  const onSave = handleSubmit(() => {
    console.log({...input, userId});
    
    dispatch(saveNote({ ...input, userId, noteId }));
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input);
    
   setInput({
    ...input,
    [event.target.name]: event.target.value
   })
}
useEffect(() => {
  if(note){
    setInput({
      title: note.title,
      description: note.description
    })
  }
},[note])
console.log(input);


  return (
    <div>
      <Modal open={true}>
        {!loading ? (
          logged ? (
            <div className={styles.container}>
              <div className={styles.banner}>
                <NavLink to={"/dashboard"} onClick={() => onSave()}>
                  <IconsBack />
                </NavLink>
                <div className={styles.input}>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder=" "
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                  />
                  <label htmlFor="">Titulo</label>
                </div>
              </div>
              <form>
                <Editor
                  {...register("description")}
                  id={styles.form}
                  value={input.description}
                  onEditorChange={(content: string, editor: Editor) => {
                    setInput({
                      ...input,
                      description: content
                    })
                  }}
                  // apiKey="i6pmefk1m4b4f2xyp815zamd01vq49g9k0pg13gfvah05n15"
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
              <button onClick={onSave} className={styles.btn_save}>Guardar</button>
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
export default NoteDetailView;

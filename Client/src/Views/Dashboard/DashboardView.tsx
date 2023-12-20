import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/features/userLoginSlice";
import { getNote } from "../../Redux/features/postSlice";
import styles from "./Dashboard.module.css";
import IconsAdd from "../../assets/iconsAdd";
import Error from "../Error/Error";
import { Modal } from "@mui/material";
import CircularIndeterminate from "../../assets/loading";
import { NavLink } from "react-router-dom";

const DashboardView: React.FC = () => {
  interface PostAttribute {
    title: string;
    id: number;
    description: string;
  }
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.login.token);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.login.userId);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [logged, setLogged] = useState(true);
  const [loading, setLoading] = useState(true);
  interface JWT {
    userId: string;
  }
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [loading]);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<JWT>(token);
      dispatch(setUserId(decodedToken.userId));
      setLogged(true);
    } else {
      if (!token || !isAuthenticated) {
        setLogged(false);
      }
    }
  }, [dispatch, isAuthenticated, token]);

  useEffect(() => {
    if (userId) {
      dispatch(getNote(userId));
      console.log(true);
    }
  }, [dispatch, userId, token]);
  console.log(notes);

  return (
    <div className={styles.container}>
      {!loading ? (
        logged ? (
          <div className={styles.container}>
            {notes
              ? notes.map((p: PostAttribute) => {
                  return (
                  
                    <div className={styles.content} key={p.id}>
                    <NavLink to={`/dashboard/note/${p.id}`}>

                      <h5>{p?.title}</h5>
                      <p dangerouslySetInnerHTML={{ __html: p?.description }} />
                    </NavLink>
                    </div>
                  );
                })
              : ""}
            <div style={{ position: "fixed", right: 14, bottom: 14 }}>
              <IconsAdd />
            </div>
          </div>
        ) : (
          <Error />
        )
      ) : (
        <Modal open={loading}>
          <CircularIndeterminate />
        </Modal>
      )}
    </div>
  );
};
export default DashboardView;

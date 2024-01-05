import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { resetState, setUserId } from "../../Redux/features/userLoginSlice";
import { getNote } from "../../Redux/features/postSlice";
import styles from "./Dashboard.module.css";
import IconsAdd from "../../assets/iconsAdd";
import Error from "../Error/Error";
import { Modal } from "@mui/material";
import CircularIndeterminate from "../../assets/loading";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";

const DashboardView: React.FC = () => {
  interface PostAttribute {
    title: string;
    id: number;
    description: string;
  }
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.login.token)
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.login.userId);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const loginStatus = useSelector((state: RootState) => state.login.status);
  const userData = useSelector((state: RootState) => state.login.userData);
  const [logged, setLogged] = useState(true);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  
  interface JWT {
    userId: string;
  }
  useEffect(() => {
    if (userData?.email) {
      if (loginStatus === "succeeded") {
        toastr.success(`Bienvenido! ${userData?.email}`);
        dispatch(resetState());
      }
    }
  }, [dispatch, loginStatus, userData?.email]);
  
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
        navigate('/')
      }
    }
  }, [dispatch, isAuthenticated, navigate, token]);

  useEffect(() => {
    if (userId) {
      dispatch(getNote(userId));
    }
  }, [dispatch, userId, token]);

  return (
    <div>
      {!loading ? (
        logged ? (
          <div className={styles.container}>
            {notes
              ? notes.map((p: PostAttribute) => {
                  return (
                    <div className={styles.content} key={p.id}>
                      <NavLink to={`/dashboard/note/${p.id}`}>
                        <h5>{p?.title}</h5>
                        <p
                          dangerouslySetInnerHTML={{ __html: p?.description }}
                        />
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

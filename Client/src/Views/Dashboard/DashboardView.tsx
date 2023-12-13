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

const DashboardView: React.FC = () => {
  interface JWT {
    userId: string;
  }
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
  const notes = useSelector((state: RootState) => state.notes?.notes);
  const [logged, setLogged] = useState(true);
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
      {logged ? (
        <>
          {notes
            ? notes.map((p: PostAttribute) => {
                return (
                  <div className={`${styles.content} card mb-3`} key={p.id}>
                    {/* <div className="card-header">Header</div> */}
                    <div className="card-body">
                      <h5 className="card-title">{p?.title}</h5>
                      <p className="card-text">{p?.description}</p>
                    </div>
                  </div>
                );
              })
            : ""}
          <div style={{ position: "fixed", right: 14, bottom: 14 }}>
            <IconsAdd />
          </div>
        </>
      ) : (
        <Error />
      )}
    </div>
  );
};
export default DashboardView;

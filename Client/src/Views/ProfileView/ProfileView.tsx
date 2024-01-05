  import React, { useEffect, useState } from "react";
  import styles from "./ProfileView.module.css";
  import { useSelector } from "react-redux";
  import { RootState } from "../../Redux/store";
  import Avatar from "@mui/material/Avatar";
  import IconProfile from "../../assets/iconProfile";
  import IconsBack from "../../assets/iconsBack";
  import { NavLink } from "react-router-dom";
  import { Modal } from "@mui/material";
  import CircularIndeterminate from "../../assets/loading";

  const ProfileView: React.FC = () => {
    interface userDataAttributes {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }
    const [loading, setLoading] = useState(true);
    const userData: userDataAttributes | null = useSelector(
      (state: RootState) => state.login?.userData
    );
    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    useEffect(() => {
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }, [loading]);
    useEffect(() => {

    },[])
    return (
      <div className={styles.container}>
        {!loading ? (
          <div className={styles.contain}>
            <div className={styles.banner}>
              <NavLink to={"/dashboard"}>
                <IconsBack />
              </NavLink>
              <Avatar
                alt={userData?.first_name}
               sx={{width:68, height: 68, fontSize: '2rem'}}
              >
                {userData?.first_name.slice(0, 1).toUpperCase()}
              </Avatar>
            </div>
            <div className={styles.text_container}>
              {userData && (
                <div className={styles.text_contain}>
                  <IconProfile />
                  <h2>{capitalizeFirstLetter(userData?.first_name)}</h2>
                  <h2>{capitalizeFirstLetter(userData?.last_name)}</h2>
                </div>
              )}
              <div className={styles.text_contain}>
                <h2>{userData?.email}</h2>
                
              </div>
             

          <div className={styles.contain_btns}>
            <div style={{display:'flex', width:'80%'}}>

            <button className={styles.btn}>Cambiar contraseña</button>
            <button className={styles.btn}>Eliminar cuenta</button>
            </div>
            <button className={styles.btn}>Cerrar sesión</button>
          </div>
            </div>
            
          </div>
        ) : (
          <Modal open={loading}>
            <CircularIndeterminate />
          </Modal>
        )}
      </div>
    );
  };
  export default ProfileView;

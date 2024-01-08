import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { deleteNote, getNote, reseatStatus } from "../Redux/features/postSlice";
import { useSelector } from "react-redux";
import toastr from "toastr";
const ITEM_HEIGHT = 48;
interface DeleteNote {
  id: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LongMenu(props: DeleteNote) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userId = useSelector((state: RootState) => state.login.userId);
  const status = useSelector(
    (state: RootState) => state.notes.status_deleteNote
  );
  const error = useSelector((state: RootState) => state.notes.error);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { id, setLoading } = props;
  const deleteNoteObj: DeleteNote = { id, setLoading };
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (data: DeleteNote) => {
    handleClose();
    Swal.fire({
      title: "¿Seguro que eliminar la nota?",
      icon: "warning",
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `,
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `,
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        dispatch(deleteNote(data.id));
      }
    });
  };
  React.useEffect(() => {
    if (status === "success") {
      setLoading(false);
      dispatch(reseatStatus());
      toastr.success("Nota eliminada con éxito");
      if (userId) {
        dispatch(getNote(userId));
      }
    }
    if (status === "rejected") {
      setLoading(false);
      dispatch(reseatStatus());
      toastr.error(`${error}`);
      if (userId) {
        dispatch(getNote(userId));
      }
    }
  }, [error, setLoading, status]);
  return (
    <div style={{ width: "fit-content" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={() => handleDelete(deleteNoteObj)}>
          Eliminar
        </MenuItem>
      </Menu>
    </div>
  );
}

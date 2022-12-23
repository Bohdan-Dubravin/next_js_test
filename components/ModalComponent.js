import { Button, IconButton, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../redux/slices/modalSlice";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.modal);

  return (
    <Modal
      disablePortal
      open={show}
      onClose={() => dispatch(hideModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-1/2 w-[400px] p-4">
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => dispatch(hideModal())}
        >
          <CloseIcon />
        </IconButton>
        <p>ADD sothing</p>
      </Paper>
    </Modal>
  );
};

export default ModalComponent;

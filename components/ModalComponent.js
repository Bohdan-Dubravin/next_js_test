import { IconButton, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../redux/slices/modalSlice';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState } from 'react';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.modal);
  const [picture, setPicture] = useState(null);

  const addPicture = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPicture(readerEvent.target.result);
    };
  };

  return (
    <Modal
      disablePortal
      open={show}
      onClose={() => dispatch(hideModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="flex flex-col absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-1/2 max-w-[400px] text-center p-4 h-[400px]">
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => dispatch(hideModal())}
          className="absolute -top-2 -right-2"
        >
          <CloseIcon />
        </IconButton>
        <div className="">
          {picture ? (
            <img
              className="w-[300px] object-contain cursor-pointer"
              src={picture}
              alt="upload picture"
              onClick={() => setPicture(null)}
            />
          ) : (
            <IconButton
              aria-label="upload picture"
              color="error"
              component="label"
            >
              <PhotoCamera className="w-10 h-10" />
              <input
                onChange={(e) => addPicture(e)}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </IconButton>
          )}
        </div>
        <p className="font-semibold">Upload a photo</p>
        <form className="flex items-center p-4">
          <input
            type="text"
            placeholder="Add a description..."
            className="border-none flex-1 outline-none"
          />
        </form>
      </Paper>
    </Modal>
  );
};

export default ModalComponent;

import { Button, IconButton, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../redux/slices/modalSlice";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../fireBase";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

const ModalComponent = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.modal);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  const addPicture = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPicture(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    console.log(docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, picture, "data_url").then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    });

    dispatch(hideModal());
    setLoading(false);
    setPicture(null);
  };

  return (
    <Modal
      disablePortal
      open={show}
      onClose={() => dispatch(hideModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="flex flex-col items-center absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-1/2 max-w-[450px] sm:p-4  p-2 h-[350px]">
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => dispatch(hideModal())}
          className="absolute -top-2 -right-2"
        >
          <CloseIcon />
        </IconButton>
        <div className="rounded sm:w-[400px] w-[280px] h-[200px] flex items-center justify-center overflow-hidden">
          {picture ? (
            <img
              className=" object-contain cursor-pointer"
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
        <form className="py-4 px-2 w-full">
          <input
            type="text"
            placeholder="Add a description..."
            className="border-none w-full font-semibold  outline-none"
            ref={captionRef}
          />
        </form>
        <Button
          className="mt-auto block w-full bg-red-600 text-white font-semibold"
          variant="contained"
          color="error"
          disabled={loading}
          onClick={uploadPost}
        >
          {loading ? "Uploading..." : "Upload Post"}
        </Button>
      </Paper>
    </Modal>
  );
};

export default ModalComponent;

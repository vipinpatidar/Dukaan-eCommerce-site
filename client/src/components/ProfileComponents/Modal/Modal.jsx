import { useState } from "react";
import {
  Container,
  Backdrop,
  Wrapper,
  Form,
  Input,
  Title,
  Button,
  Close,
  ImgContainer,
} from "./modal.styled";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { makeUserRequest } from "../../../utils/axios";
import { updateUser } from "../../../redux/slice/userSlice";

const Modal = ({ onClose, user }) => {
  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    password: "",
    conPassword: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Update user in backend

  const updateUserHandler = async (downloadURL = null) => {
    try {
      const userData = {
        ...inputs,
        profileImg: downloadURL,
      };
      // console.log(user);

      const res = await makeUserRequest.put(
        `/users/update/${user._id}`,
        userData
      );
      if (res.data) {
        dispatch(updateUser(res.data));
        setProcessing(false);
        onClose();
      }
    } catch (err) {
      setError(err?.response?.data.error);
    }
  };

  // Upload image and Handle updates

  const handleClick = async (e) => {
    e.preventDefault();

    if (inputs.conPassword !== inputs.password) {
      setError("Password confirmation not match.");
      return;
    }

    if (file === null) {
      await updateUserHandler();
      return;
    }

    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProcessing(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateUserHandler(downloadURL);
        } catch (error) {
          console.log(error);
          setError(error?.response?.data.error);
          setProcessing(false);
        }
      }
    );
  };

  return (
    <>
      <Backdrop onClick={onClose}></Backdrop>
      <Container>
        <Close onClick={onClose}>X</Close>
        <Wrapper>
          <Title>Update Your Account</Title>
          <Form onSubmit={handleClick}>
            <ImgContainer>
              <Input
                style={{ border: "none" }}
                placeholder="Your image"
                name="image"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <img src={URL.createObjectURL(file)} alt="preview" />
              ) : (
                <img src={user.profileImg} alt="original image" />
              )}
            </ImgContainer>
            <Input
              placeholder="first name"
              name="firstName"
              onChange={inputsChangeHandler}
              value={inputs.firstName}
              required
            />
            <Input
              placeholder="last name"
              name="lastName"
              onChange={inputsChangeHandler}
              value={inputs.lastName}
              required
            />
            <Input
              placeholder="username"
              name="username"
              onChange={inputsChangeHandler}
              value={inputs.username}
              required
            />
            <Input
              placeholder="email"
              name="email"
              onChange={inputsChangeHandler}
              value={inputs.email}
              required
            />
            <Input
              placeholder="Want to change your old password? Then enter"
              name="password"
              type="password"
              onChange={inputsChangeHandler}
              value={inputs.password}
              disabled={
                user?._id === "655df35adf171338654eff83" ||
                user?._id === "65c0c292874d6141826e5299"
              }
            />
            <Input
              placeholder="confirm updated password"
              name="conPassword"
              type="password"
              onChange={inputsChangeHandler}
              value={inputs.conPassword}
              disabled={
                user?._id === "655df35adf171338654eff83" ||
                user?._id === "65c0c292874d6141826e5299"
              }
            />
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {error}
              </p>
            )}
            <Button disabled={processing}>
              {processing ? "Processing..." : "UPDATE"}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Modal;

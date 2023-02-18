import { ILoginUser, IRegisterUser } from "./models";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerUser = async (user: IRegisterUser) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: user.username });
    }
    toast.success(`Successfully created ${user.email}`, {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: false,
      closeOnClick: true,
    });
  } catch (error) {
    console.log(error);
  }
  await auth.signOut();
};

const loginUser = async (user: ILoginUser) => {
  try {
    const { user: userProfile } = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    toast.success(
      `Successfully logged in as ${
        auth?.currentUser?.displayName ?? user.email
      }`,
      {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeOnClick: true,
      }
    );
    localStorage.setItem("user", JSON.stringify(userProfile));
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  await auth.signOut();
  toast.success("Successfully logged out", {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: false,
    closeOnClick: true,
  });
  localStorage.removeItem("user");
};

const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    toast.success(
      `Successfully logged in as ${
        auth?.currentUser?.displayName ?? user.email
      }`,
      {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: true,
      }
    );
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};

export const authService = {
  registerUser,
  loginUser,
  signInWithGoogle,
  logout,
};

import { ILoginUser, IRegisterUser } from "./models";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db, googleProvider, storage } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { t } from "i18next";
import { doc, setDoc } from "firebase/firestore";

const registerUser = async (user: IRegisterUser) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { displayName: user.username });
    }

    toast.success(`${t("data.auth.create_account_success")} ${user.email}`, {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: false,
      closeOnClick: true,
    });
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (user: ILoginUser) => {
  try {
    const { user: userProfile } = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    toast.success(
      `${t("data.auth.login_success")} ${
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
  toast.success(`${t("data.auth.logout_success")}`, {
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

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    });
    toast.success(
      `${t("data.auth.login_success")} ${
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

const uploadProfilePicture = async (
  image: any,
  currentUser: User,
  callBack: Function
) => {
  try {
    // if image or user is not present then don't do anything
    if (!image || !currentUser) return;

    const fileRef = ref(storage, auth?.currentUser?.uid + ".png");
    await uploadBytes(fileRef, image);

    const photoUrl = await getDownloadURL(fileRef);
    updateProfile(currentUser, { photoURL: photoUrl });

    callBack(photoUrl);
  } catch (err) {
    console.error(err);
  }
};

export const authService = {
  registerUser,
  loginUser,
  signInWithGoogle,
  logout,
  uploadProfilePicture,
};

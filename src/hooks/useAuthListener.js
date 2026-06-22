import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../services/firebase/firebase";
import { setUser, clearUser } from "../redux/authSlice";
import { getUserProfile } from "../services/firebase/firestore";

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);

        dispatch(
          setUser({
            user: {
              uid: currentUser.uid,
              email: currentUser.email,
            },
            role: profile?.role || "user",
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;
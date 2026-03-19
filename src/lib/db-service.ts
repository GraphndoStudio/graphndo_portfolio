
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getPortfolioData = async () => {
  const docRef = doc(db, "portfolio", "content");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const savePortfolioData = async (data: any) => {
  const docRef = doc(db, "portfolio", "content");
  await setDoc(docRef, data, { merge: true });
};

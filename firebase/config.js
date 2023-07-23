// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAO0khKw01vltbM6Rmz9_bHM-j07_B1NJQ",
  authDomain: "react-native-image-book-c3bab.firebaseapp.com",
  databaseURL: "https://react-native-image-book-c3bab.firebaseio.com",
  projectId: "react-native-image-book-c3bab",
  storageBucket: "react-native-image-book-c3bab.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

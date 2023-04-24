  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getFirestore,
           collection, 
           addDoc,
           getDocs,
           onSnapshot,
           deleteDoc,
           doc,
           getDoc,
           updateDoc
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDq_ReveYPJf2qbm-ch4z8lTplShktRyE8",
    authDomain: "todo-4cef0.firebaseapp.com",
    projectId: "todo-4cef0",
    storageBucket: "todo-4cef0.appspot.com",
    messagingSenderId: "750183894037",
    appId: "1:750183894037:web:7e01a5d8eb05f3cc51921c"
  };

  // Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) =>{
    addDoc(collection(db, 'tasks'), {title, description})

}

export const getTask = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback)=> onSnapshot(collection(db,'tasks'), callback )

export const deleteTask = id => deleteDoc(doc(db, 'tasks',id))

export const get_Task = id => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)



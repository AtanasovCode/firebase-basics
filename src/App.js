import { useState } from 'react';
import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'

function App({
  colRef,
  db,
  auth,
}) {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title: e.currentTarget.title.value,
      author: e.currentTarget.author.value,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        setTitle("");
        setAuthor("");
      })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', id);

    deleteDoc(docRef)
      .then(() => {
        setId("");
      })
  }

  // Update data 
  const handleUpdate = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', updateId);
    updateDoc(docRef, {
      title: updateTitle
    })
      .then(() => {
        setUpdateId("");
        setUpdateTitle("");
      })
  }

  //Sign User Up
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
      .then((cred) => {
       // console.log("User Created: ");
        //console.log(cred.user);
        setMail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      })
  }

  //Sign User In
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((cred) => {
        //console.log("user logged in");
        //console.log(cred.user);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      })
  }
  
  //Sign User Out
  const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          //console.log("user signed out");
          setMail("");
          setPassword("");
        })
        .catch((err) => {
          console.log(err.message);
        })
  }

  // Subscribe to Auth Change
  onAuthStateChanged(auth, (user) => {
      console.log("User status changed: ", user === null ? "no users found" : user.email);
  })


  //Get specific document
  const docRef = doc(db, 'books', 'nsXT3xhRh2XWMYvrMuj9');

  //Every time the selected document changes firebase fires the function we input
  onSnapshot(docRef, (doc) => {
    //console.log(doc.data(), doc.id)
  })


  return (
    <div className="App">
      <h1>Firebase</h1>
      <form className="add" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Mr. Robot"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Elliot Anderson"
          value={author}
          onChange={(e) => setAuthor(e.currentTarget.value)}
          required
        />
        <input
          type="submit"
          value="Add Book"
        />
      </form>
      <form className="delete" onSubmit={handleDelete}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          value={id}
          placeholder="D3cEF562CFe24v4"
          onChange={(e) => setId(e.currentTarget.value)}
        />
        <button>Delete Book</button>
      </form>
      <form className="update" onSubmit={handleUpdate}>
        <label htmlFor="id">
          Document Id:
        </label>
        <input
          type="text"
          placeholder="id..."
          name="id"
          value={updateId}
          onChange={(e) => setUpdateId(e.currentTarget.value)}
          required
        />
        <label htmlFor="title">
          New Title
        </label>
        <input
          type="text"
          placeholder="new title..."
          name="title"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.currentTarget.value)}
          required
        />
        <input
          type="submit"
          value="Update Book"
        />
      </form>
      <h1>Sign Up</h1>
      <form className="signUp" onSubmit={handleSignUp}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={mail}
          onChange={(e) => setMail(e.currentTarget.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <input
          type="submit"
          value="Sign Up"
        />
      </form>
      <form className="login" onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={mail}
          onChange={(e) => setMail(e.currentTarget.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <input
          type="submit"
          value="Log In"
        />
      </form>
      <input 
        type="button"
        value="Log Out"
        onClick={handleSignOut}
      />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react'
import { db,auth } from '../firebase.config'
import { doc,  updateDoc, collection, getDocs } from 'firebase/firestore';

import {
  getStorage,
  ref,

  uploadBytes
} from 'firebase/storage'
const Userverification = () => {

 
  const storage = getStorage();
  // const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [documentFile, setDocumentFile] = useState(null);

  const updateUser = (uid, data) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, data);
  };

  const getUsers = () => {
    return getDocs(collection(db, 'users'))
      .then((querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      });
  };

  const uploadDocument = (file, fileName) => {
    const fileRef = ref(storage, `documents/${fileName}`);
    return uploadBytes(fileRef, file);
  };


  const handleFileChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!auth.currentUser || !documentFile) {
      return;
    }
    const fileName = `${auth.currentUser.uid}_${documentFile.name}`;
    uploadDocument(documentFile, fileName)
      .then(() => {
        return updateUser(auth.currentUser.uid, { documentUrl: `documents/${fileName}` });
      })
      .then(() => {
        setDocumentFile(null);
        alert('Document uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading document:', error);
      });
  };
 
  const handleVerify = (userId, status) => {
    updateUser(userId, { status })
      .then(() => {
        alert('User status updated successfully!');
        getUsers();
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
      });
  };

  // Load users on mount
  useEffect(() => {
    getUsers();
  }, []);

  return (
   <div> 
    {auth.currentUser ?
      <>
        <h2>Welcome, {auth.currentUser.email}!</h2>
        <p>Upload your document:</p>
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </>
      :
      <>
        <h2>Sign In</h2>
        {/* Your sign in form */}
      </>
    }
    <hr />
    {/* <h2>User List (Admin)</h2>
    {/* <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Status</th>
          <th>Document URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
            <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.status}</td>
        )}
        <tbody/>
      <table/>
     */} 
    </div>
   
    
  )
}

export default Userverification

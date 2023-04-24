import '../App.css';
//import streamToBlob from 'stream-to-blob';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';



var validUrl = require('valid-url');;


//api invoke url: https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default


function Home() {
  const [kindleEmail, setKindleEmail] = useState('');
  const navigate = useNavigate();
  

  //get the user's kindle email address from the database
  const getKindleEmail = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setKindleEmail(docSnap.data().kindleEmail)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setKindleEmail("Error");
    }
  }

  getKindleEmail();

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        //navigate back to the login screen
        navigate("/login")
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          
          navigate("/login")
          console.log("user is logged out")
        }
      });
     
}, [])

  var articleHTML = useState("<p>Article HTML</p>");


async function downloadEpub(url){
  const articleData = await getArticle(document.getElementById('url').value);
  console.log("ARTICLE DATA: " + articleData.content);
  if (articleData != null) {
    articleHTML = articleData.content;
    await retrieveEpub(articleData.content, articleData.title, articleData.author, articleData.date);
  }
}


async function getArticle(url) {
  //const reply = await parseArticle('parser', { url: 'https://slate.com/culture/2023/02/hanging-out-sheila-liming-book-friendship-crisis.html?src=longreads' });;
  
  //https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default/parser
  if (validUrl.isUri(document.getElementById('url').value)) {
    const response = await fetch('https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default/parser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url })
    });
    const data = await response.json();
  
    return {
      content: data.Content,
      title: data.Title,
    };
  } else {
    console.log('Invalid URL');
    return null;
  }
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

// function decodeBase64(base64String) {
//   // Decode the URL-encoded Base64 string
//   const decodedString = decodeURIComponent(window.atob(base64String));

//   // Convert the decoded string to a Uint8Array
//   const byteArray = new Uint8Array(decodedString.length);
//   for (let i = 0; i < decodedString.length; ++i) {
//     byteArray[i] = decodedString.charCodeAt(i);
//   }

//   // Return the Uint8Array
//   return byteArray;
// }


async function retrieveEpub(content, title, author, date) {
  console.log("TITLE: " + title);
  await fetch('https://l1pz91tjn6.execute-api.us-east-2.amazonaws.com/default/generate_epub', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: content, title: title, author: author, date: date })
    
  }).then(async (response) => {
  //console.log("RESPONSE: " + response.body);
  const text = await response.text();
  console.log("TEXT: " + text);
  // const byteArray = decodeBase64(text);
  // console.log("BYTE ARRAY: " + byteArray);
  const blob = b64toBlob(text, "application/epub+zip");
  //const blob = new Blob([byteArray], { type: "application/epub+zip" });
  return blob;
}).then((blob) => {
  console.log("BLOB: " + blob);
  const url = window.URL.createObjectURL(blob);

  // Create a download link for the URL
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'my-book.epub';

  // Simulate a click on the download link
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

}


  return (
    <div className="App">
    <nav>
      <h2>Send To Kindle App</h2>
      <h3>Logged in as: {auth.currentUser.email}</h3>
      <h3>Kindle Email: {kindleEmail}</h3>
      <button onClick={handleLogout}>
        Logout
      </button>
      </nav>
      <header className="App-header">
        <input type="text" id="url" name="url" />
        <button onClick={downloadEpub}>Get Article</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default Home;
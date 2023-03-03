import logo from './logo.svg';
import './App.css';
import streamToBlob from 'stream-to-blob';

var validUrl = require('valid-url');

//api invoke url: https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default

async function downloadEpub(url){
  const articleData = await getArticle(document.getElementById('url').value);
  console.log("ARTICLE DATA: " + articleData.content);
  if (articleData != null) {
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

function decodeBase64(base64String) {
  // Decode the URL-encoded Base64 string
  const decodedString = decodeURIComponent(window.atob(base64String));

  // Convert the decoded string to a Uint8Array
  const byteArray = new Uint8Array(decodedString.length);
  for (let i = 0; i < decodedString.length; ++i) {
    byteArray[i] = decodedString.charCodeAt(i);
  }

  // Return the Uint8Array
  return byteArray;
}


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


  // const byteArray = decodeBase64(response);
  // const blob = new Blob([byteArray], { type: "application/epub+zip" });

// const byteArray = Uint8Array.from(atob(response.body), c => c.charCodeAt(0));
// const blob = new Blob([byteArray], { type: "application/epub+zip" });

// Convert the EPUB data to a Blob object

// Convert the EPUB data to a Blob object


// Create a URL for the Blob object

  
    ;
}

function App() {

  //const data = await postData('https://anb34jlouk2jykl4364xlbddwu0exutn.lambda-url.us-east-2.on.aws/', { url: 'https://hackaday.com/2023/02/24/toroid-transformers-explained/' })

  // postData('https://anb34jlouk2jykl4364xlbddwu0exutn.lambda-url.us-east-2.on.aws/', { url: 'https://hackaday.com/2023/02/24/toroid-transformers-explained/' })
  // .then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });
  

  //getArticle();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" id="url" name="url" />
        <button onClick={downloadEpub}>Get Article</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

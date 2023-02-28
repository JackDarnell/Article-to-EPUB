import logo from './logo.svg';
import './App.css';

//api invoke url: https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default


async function getArticle() {
  //const reply = await parseArticle('parser', { url: 'https://slate.com/culture/2023/02/hanging-out-sheila-liming-book-friendship-crisis.html?src=longreads' });
  //console.log(reply.Payload);
  //const epubData = JSON.parse(reply.Payload);
  
  //https://q47qtvrb01.execute-api.us-east-2.amazonaws.com/default/parser
  fetch('https://kghdheuzz2.execute-api.us-east-2.amazonaws.com/default/parser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://slate.com/culture/2023/02/hanging-out-sheila-liming-book-friendship-crisis.html?src=longreads' })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Do something with the JSON data
  })
  .catch(error => {
    console.error(error);
    // Handle the error
  });
  //return epubData;
}

// async function retrieveEpub(epubData) {
//   //const reply = await parseArticle('epub', { url: 'https://slate.com/culture/2023/02/hanging-out-sheila-liming-book-friendship-crisis.html?src=longreads' });
//   console.log(reply.Payload);
//   return JSON.parse(reply.Payload);
// }

function App() {

  //const data = await postData('https://anb34jlouk2jykl4364xlbddwu0exutn.lambda-url.us-east-2.on.aws/', { url: 'https://hackaday.com/2023/02/24/toroid-transformers-explained/' })

  // postData('https://anb34jlouk2jykl4364xlbddwu0exutn.lambda-url.us-east-2.on.aws/', { url: 'https://hackaday.com/2023/02/24/toroid-transformers-explained/' })
  // .then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });
  

  getArticle();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

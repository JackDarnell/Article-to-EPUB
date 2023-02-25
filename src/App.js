import logo from './logo.svg';
import './App.css';
import { parseArticle } from './lambdaFunctions.js';


async function getArticle() {
  const reply = await parseArticle('parser', { url: 'https://hackaday.com/2023/02/24/toroid-transformers-explained/' });
  console.log(reply.Payload);
}

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

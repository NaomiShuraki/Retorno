import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import  { App } from "./app"
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
<BrowserRouter>
     <App />   
  </BrowserRouter>
);

reportWebVitals();

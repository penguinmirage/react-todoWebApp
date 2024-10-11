import React from 'react'
import { createRoot } from 'react-dom/client';

import App from './components/app/app';
const container = document.getElementById('app')
const root = createRoot(container); // createRoot(container!) if you use TypeScript
console.log('Hello World, this program is working...')
root.render(<App />);

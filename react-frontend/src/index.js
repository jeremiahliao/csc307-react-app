import React from 'react';
import ReactDOMClient from 'react-dom/client';
import "./index.css";
import MyApp from "./MyApp"

// create the container
const container = document.getElementById('root');

// create the root
const root = ReactDOMClient.createRoot(container);

// initial render: render an element to the Root
root.render(<MyApp />);
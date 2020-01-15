import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';




if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV);
  import('react-axe').then(axe => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(<BrowserRouter>
                      <App />
                      </BrowserRouter>,
                    document.getElementById('root'));
  });
} else {
  ReactDOM.render(<BrowserRouter>
                    <App />
                    </BrowserRouter>,
                  document.getElementById('root'));
}


// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
//  );


 if (module.hot) {
   module.hot.accept();
 }

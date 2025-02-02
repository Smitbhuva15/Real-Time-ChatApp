import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import Setting from './Pages/Setting.jsx';
import SignUp from './Pages/SignUp.jsx';

import { Provider } from 'react-redux'
import { store } from './store/store.js';
import { AuthProvider } from './contextapi/AuthContext.jsx';
import ChatContainer from './components/ChatContainer.jsx';
import ProtectHome from './FeatchingData/ProtectHome.jsx';





const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element:<Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/setting',
        element: <Setting />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    

    ],
  },
]);


createRoot(document.getElementById('root')).render(


<Provider store={store}>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </Provider>



);

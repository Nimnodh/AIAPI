import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {NextUIProvider} from "@nextui-org/react";
import store from './store/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter,Routes, Route } from "react-router"
import Login from './Components/Forms/LoginForm.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <NextUIProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
        <Route path='login/' element={<Login />} />
      </Routes>
  </BrowserRouter>
    </NextUIProvider>
    </Provider>,
  </StrictMode>,
)

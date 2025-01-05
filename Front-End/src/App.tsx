import { useSelector } from "react-redux"
import { Data } from "./Types/types"
import { useEffect } from "react"
import { Avatar, Card, Layout } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import TextToImageComponent from "./Components/img";
import Chat from "./Components/chat";

function App() {
  const { Meta } = Card;  
  const state = useSelector((state:any):Data => state.data.data)
  useEffect(() => {
    if(state.is_login){
      console.log(state.is_login);
      
      console.log("Logged in");
    }else{
      window.location.href = "login/"
    }
  },[state])
  const { Footer } = Layout;
    
  return (
    <>
    <Layout style={{ minHeight: '100vh' }}> {/* Ensure layout takes full viewport height */}
      {/* Other layout components (Header, Content, Sider) if needed */}
    Home
    <TextToImageComponent />
      <Layout.Footer
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 'auto', // Important: Adjust width as needed
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '10px',
          zIndex: 1000, // Ensure it's on top
        }}
      >
        <Chat />
      </Layout.Footer>

    </Layout>
    </>
  )
}

export default App

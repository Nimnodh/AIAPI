import { useSelector } from "react-redux"
import { Data } from "./Types/types"
import { useEffect, useState } from "react"
import {   Drawer, Layout,Button, Badge,  Popover, Image } from 'antd';
import TextToImageComponent from "./Components/img";
import '../node_modules/antd/dist/reset.css' // Import Ant Design styles
import useMediaQuery from "./Hooks/useMediaQuery";
import "./index.css"
import Navber from "./Components/Header/Navber";
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { AlignRightOutlined, CloseOutlined, MessageOutlined } from "@ant-design/icons";
import bot from "./Media/Images/Bot.png"
function App() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const state = useSelector((state:any):Data => state.data.data)
  const [chatopen,setChatopen] = useState(false)
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };
  useEffect(() => {
    if(state.is_login){
      console.log(state.is_login);
      
      console.log("Logged in");
    }else{
      window.location.href = "login/"
    }
  },[state])
  const {  Header,Sider, Content } = Layout;
    
  return (
    <>
    <Navber />
   {isLargeScreen ? 
    <Layout style={{ minHeight: '100vh' }}> 
    <Layout>
    <Sider className="bg-gray-100 shadow-gray-500 shadow-md ">left sidebar</Sider>
    <Content className="bg-gray-100 text-black p-6"><TextToImageComponent /></Content>
    </Layout>
    
    
    
    </Layout> :
    <Layout style={{ minHeight: '100vh' }}> 
    
    <Layout>
    <Button 
      onClick={showDrawer}
      type="primary"
      className="bg-gray-900 fixed"
      
    >
          <AlignRightOutlined />
        </Button>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    <Content className="bg-white text-black p-6"><TextToImageComponent /></Content>
    </Layout>
    
    
    </Layout>
   }
   {chatopen ? 
    <Layout
    style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
    }}
    className="rounded-2xl bg-white shadow-lg shadow-gray-300  text-black w-[300px] h-[400px] me-2 mb-3"
  >
    <div className="flex justify-between border border-b-blue-400 p-2">
      <div className="">
      <Popover color="red-inverse" content={<div className="w-8 h-2 mb-3"><p>Close</p></div>} >
        <Button 
        type="primary"
        color="danger"
        about="close a chat"
        className="bg-red-900 border-none"
        onClick={() => setChatopen(false)}
        >
        <CloseOutlined />
        </Button>
        </Popover>
      </div>
      <div className="">
        <div className="flex">
        <Image src={bot} width={40} height={40} alt="Bot" preview={false}/>
        <small>ChatBot</small>
        </div>
      </div>
      
    </div>
  </Layout>:
  <Popover   content={<div className="w-auto h-2 mb-3"><p>One Time Chat</p></div>} >
  <Button
  style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '50px',
    height: '50px',
    color: 'white', 
    padding: '10px',
    zIndex: 1000, // Ensure it's on top
  }}
  className=" rounded-2xl mb-4 me-5  animate-pulse"
  type="primary"
  onClick={() => setChatopen(true)}
  >
    <Badge count={1} offset={[20, 1]}>
    
    <MessageOutlined className="text-2xl text-white"/>
  </Badge>
  </Button>
  </Popover>
  }
    </>
  )
}

export default App

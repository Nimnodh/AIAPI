import { Col, Row, Form, Input, Button, Checkbox } from "antd";
import useMessageApi from "../../Hooks/useMessageApi";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { Image } from "@nextui-org/react";
import RobotToRightside from "../../Media/Images/RobotToRightside.png";
import type { FormProps } from "antd";
import left from "../../Media/Images/left2.png";
import { motion } from "framer-motion";
import WritingAnimation from "./WritingAnimation";
import { LoginOutlined } from "@ant-design/icons";
import Bot from "../../Media/Images/bot.png";
import { Link } from "react-router";
import { useState } from "react";
import api from "../../api"
import { ACCESS_TOKEN, REFRSH_TOKEN } from "../../config";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success, contextHolder } = useMessageApi({ok});
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const setok = (status:boolean) => {
      setOk(status);
  }

  


  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setLoading(true);
    success();
    api.post("/api/token/", {username:values.username,password:values.password})
    .then((res:any) => {
      setLoading(false);
      setok(true);
    
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRSH_TOKEN, res.data.refresh);
    window.location.href = "/";
    })
    .catch((err:any) => {
      console.log(err);
      setLoading(false);
      setok(false);
    });
    

  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <motion.div
        initial={{ x: "-10vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {isLargeScreen ? (
          <Row className="flex justify-center justify-items-center items-center h-screen mx-56">
            <div className="flex justify-center   ">
              <Col span={12} className="w-9/12 ">
                <div className="h-[400px] opacity-45">
                  <Image
                    removeWrapper
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={RobotToRightside}
                  />
                </div>
              </Col>
              <Col span={12} className="flex justify-center items-center ">
                <Form
                  disabled={loading}
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{
                    maxWidth: 400,
                    backgroundImage: `url(${left})`,
                    backgroundSize: "200px 200px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                  }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="rounded-lg  w-full p-8"
                >
                  <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold ">
                      <WritingAnimation paragraph="Login" />
                    </h1>
                    <Image src={Bot} className="h-10 w-10" />
                  </div>
                  <br />

                  <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    label={null}
                  >
                    <Checkbox>
                      <WritingAnimation paragraph="Remember me" />
                    </Checkbox>
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="mb-4 w-full"
                      
                    >
                      Submit <LoginOutlined />
                    </Button>
                    {contextHolder}

                    <p>
                      <WritingAnimation
                        paragraph="I don't have a account
"
                      />
                      <Link to="/signup" className="underline">
                        Sing up
                      </Link>
                    </p>
                  </Form.Item>
                </Form>
              </Col>
            </div>
          </Row>
        ) : (
          <div className="flex justify-center justify-items-center items-center  ">
            <Form
            disabled={loading}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{
                maxWidth: 500,
                backgroundImage: `url(${left})`,
                backgroundSize: "200px 200px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="justify-center items-center  rounded-lg shadow-lg w-full p-8"
            >
              <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold ">
                      <WritingAnimation paragraph="Login" />
                    </h1>
                    <Image src={Bot} className="h-10 w-10" />
                  </div>
                  <br />
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox>
                  <WritingAnimation paragraph="Remember me" />
                </Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit">
                  Submit <LoginOutlined />
                </Button>
                {contextHolder}
                <small className="mt-5">
                  <WritingAnimation
                    paragraph="I don't have a account"/>
                  <Link to="/signup" className="underline">
                    Sing up
                  </Link>
                </small>
              </Form.Item>
            </Form>
          </div>
        )}
      </motion.div>
    </>
  );
}

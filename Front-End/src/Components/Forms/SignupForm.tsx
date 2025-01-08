import { Col, Row, Form, Input, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import WritingAnimation from "./WritingAnimation";
import { Image } from "@nextui-org/react";
import Bot from "../../Media/Images/bot.png";
import left from "../../Media/Images/left2.png";
import useMessageApi from "../../Hooks/useMessageApi";
import useMediaQuery from "../../Hooks/useMediaQuery";
import RobotToRightside from "../../Media/Images/RobotToRightside.png";
import api from "../../api";

type FieldType = {
  username?: string;
  password?: string;
  password2?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
};

export default function Signup() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success, contextHolder } = useMessageApi({ ok });
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const setok = (status: boolean) => {
    setOk(status);
  };

  const onFinish = (values: FieldType) => {
    setLoading(true);
    success();
    api
      .post("/signup/", {
        username: values.username,
        password: values.password,
        confirm_password: values.password2,
        email: values.email,
        first_name: values.firstname,
        last_name: values.lastname,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {
          setok(true);  // Set ok to true if signup is successful
          success();    // Show success message
          window.location.href = "login/"
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setOk(false);  // Set ok to false if an error occurs
        success();     // Show error message after 2.5 seconds
      });
  };
  

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Password Strength RegEx: 
  // 1. At least one uppercase letter
  // 2. At least one special character
  // 3. Minimum 8 characters
  const passwordStrength = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  return (
    <>
      <motion.div
        initial={{ x: "-10vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {isLargeScreen ? (
          <Row className="flex justify-center justify-items-center items-center h-screen ">
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
                    maxWidth: 900,
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
                      <WritingAnimation paragraph="Sign Up" />
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
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        type: "email",
                        message: "Please input a valid email!",
                      },
                    ]}
                  >
                    <Input type="email" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="First Name"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Last Name"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        pattern: passwordStrength,
                        message:
                          "Password must be at least 8 characters long, contain at least one uppercase letter and one special character!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="Confirm Password"
                    name="password2"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
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
                      <WritingAnimation paragraph="I Really have an account" />
                      <Link to="/login" className="underline">
                        Log in
                      </Link>
                    </p>
                  </Form.Item>
                </Form>
              </Col>
            </div>
          </Row>
        ) : (
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
              className="justify-center items-center rounded-lg shadow-lg w-full p-8"
            >
              <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold ">
                  <WritingAnimation paragraph="Sign Up" />
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    type: "email",
                    message: "Please input a valid email!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item<FieldType>
                label="First Name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Last Name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: passwordStrength,
                    message:
                      "Password must be at least 8 characters long, contain at least one uppercase letter and one special character!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Confirm Password"
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit <LoginOutlined />
                </Button>
                {contextHolder}
                <small className="mt-5">
                  <WritingAnimation paragraph="I Really have an account" />
                  <Link to="/login" className="underline">
                    Log in
                  </Link>
                </small>
              </Form.Item>
            </Form>
        )}
      </motion.div>
    </>
  );
}

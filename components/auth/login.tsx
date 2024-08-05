"use client";
import React, { useState } from "react";
import { Modal, Button, Checkbox, Form, Input } from "antd";
import type { FormProps } from 'antd';
import { login } from "@/services";

interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpOpen:React.Dispatch<React.SetStateAction<boolean>> ;
}

const Login: React.FC<LoginProps> = ({ open, setOpen, setSignUpOpen }) => {
  const [loading, setLoading] =  useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    setLoading(true);
    try {
      await login({password:values.password, identifier:values.email});
      setOpen(false);
    } catch (err:any) {
      window.alert(err?.response?.data?.error?.message || "Sorry, unable to register!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      className="text-center w-fit"
      title="LOGIN"
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="w-full mt-10 text-left"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="middle"
      >
        <Form.Item<FieldType>
          className='mx-auto'
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="inline-block">
          <Button
            type="link"
            onClick={() =>{
              setOpen(false);
              setSignUpOpen(true)
            } }
            className="text-blue-500"
          >
            Sign Up
          </Button>
        </Form.Item>

        <Form.Item className='inline-block w-fit float-right  rounded-full '>
          <Button disabled={loading} type="primary" className="w-full h-full rounded-full px-6 uppercase py-2 !text-white font-semibold hover:scale-95 hover:!bg-primary tracking-wider" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;

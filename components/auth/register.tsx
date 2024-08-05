"use client";
import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import type { FormProps } from 'antd';
import { register } from "@/services";

interface SignUpProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  type FieldType = {
    Email: string;
    password: string;
    confirmPassword: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    setConfirmLoading(true);
    try {
      await register({password:values.password, username:values.Email.split("@")[0], email:values.Email});
    } catch (err:any) {
      window.alert(err?.response?.data?.error?.message || "Sorry, unable to register!");
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      className="text-center"
      title="Register"
      open={open}
      onCancel={handleCancel}
      footer={null}
      // confirmLoading={confirmLoading}
    >
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="w-full mt-4 text-left" 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="middle"
      >
        <Form.Item<FieldType>
          className='mx-auto'
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input your Email!" }]}
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

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className='text-center mt-4'>
          <Button
            disabled={confirmLoading}
            type="primary"
            className="bg-primary float-right uppercase  rounded-full h-full px-6 py-2 !text-white font-semibold hover:scale-95 hover:!bg-primary tracking-wider"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUp;

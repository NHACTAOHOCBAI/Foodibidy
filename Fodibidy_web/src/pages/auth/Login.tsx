/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router';
import { login } from '../../services/auth';

const Login = () => {
    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async ({ email, password }: { email: string, password: string }) => {
        setIsPending(true)
        try {
            await login(email, password)
            messageApi.success("Login successfully")
        }
        catch (err: any) {
            messageApi.error(err.error)
        }
        setIsPending(false)
    };
    return (
        <>
            {contextHolder}
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 500, boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)", padding: 24 }}>
                    <h1 style={{ marginLeft: 50 }}>Welcome to Foodibidy website</h1>
                    <Form
                        layout='vertical'
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email address!' },
                            ]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        You haven't any account? <span onClick={() => navigate('/register')} style={{ color: 'blue' }}>Sign up here</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
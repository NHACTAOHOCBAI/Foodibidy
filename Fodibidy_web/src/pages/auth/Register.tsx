/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerRestaurant } from '../../services/auth';


const Register = () => {
    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async ({ email, password, fullName, restaurantName, phoneNumber, address }: { email: string, password: string, fullName: string, restaurantName: string, address: string, phoneNumber: string }) => {
        setIsPending(true)
        try {
            await registerRestaurant({ email, password, fullName }, { restaurantName, address, phoneNumber, bio: "" })
            messageApi.success("Register account successfully")
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
                    <h1 style={{ marginLeft: 120 }}>Please sign up here</h1>
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
                            <Input.Password disabled={isPending} />
                        </Form.Item>

                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>


                        <Form.Item
                            label="Restaurant name"
                            name="restaurantName"
                            rules={[{ required: true, message: 'Please input restaurant name!' }]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input restaurant address!' }]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Please input restaurant number!' },
                                { pattern: /^[0-9]{8,}$/, message: 'Phone number must contain at least 8 digits' },
                            ]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>


                        <Form.Item label={null}>
                            <Button loading={isPending} type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        You already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue' }}>Log in here</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
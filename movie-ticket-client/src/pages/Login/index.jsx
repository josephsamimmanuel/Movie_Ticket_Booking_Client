import React from 'react'
import { Divider, Form } from 'antd'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

function Login() {
  const handleLogin = (values) => {
    console.log('Successfully logged in', values)
  }
  
  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='card p-3 w-400'>
      <h1 className='text-xl font-bold'>CINEBOOK - Login</h1>
      <Divider style={{ margin: '10px 0', borderColor: 'gray' }} />
      <Form layout='vertical' className='w-full' onFinish={handleLogin}>
        <Form.Item 
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <input type='email' className='w-full' />
        </Form.Item>
        <Form.Item 
          name='password'
          label='Password'
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <input type='password' className='w-full' />
        </Form.Item>
        <div className='flex flex-col mt-2 gap-1'>
        <Button title='REGISTER' fullWidth type='submit'/>
        <Link to='/register' className='text-primary'>Don't have an account? Register</Link>
        </div>
      </Form>
      </div>
    </div>
  )
}

export default Login

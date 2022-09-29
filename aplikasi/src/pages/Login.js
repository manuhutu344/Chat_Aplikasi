import React, {useContext, useState} from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import {useLoginUserMutation} from '../services/appApi'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import {AppContext} from '../context/appContext'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {socket} = useContext(AppContext)
  const [loginUser, {isLoading, error}] = useLoginUserMutation();

function handleLogin(e){
  e.preventDefault();
  loginUser({email, password}).then(({data})=>{
    if(data){
      socket.emit('new-user')
      navigate('/chat');
    }
  })
}

return (
<Container>
<Row>
<Col md={5} className="login-bg"></Col>
<Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    {error && <p className='alert alert-danger'>{error.data}</p>}
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Masukan Email Anda" onChange={(e) => setEmail(e.target.value)} value={email} required />
      <Form.Text className="text-muted">
        Jangan Sebarkan email anda ke sembarang orang.
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Masukan Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
    </Form.Group>
    <Button variant="info" type="submit">
      {isLoading ? <Spinner animation='grow'/> : 'Masuk'}
    </Button>
    <div className='py-4'>
    <p className='text-center'>
    Tak punya akun ? <Link to="/signup">Signup</Link>
    </p>
    </div>
  </Form>
  </Col>
  </Row>
</Container>
  )
}

export default Login;
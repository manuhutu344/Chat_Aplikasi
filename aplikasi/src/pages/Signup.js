import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {useSignupUserMutation} from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import Bot from "../assets/Bot.jpg"



function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name, setName] = useState('');
  const [signupUser, {isLoading, error}] = useSignupUserMutation();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e){
    const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
  
  }

  async function uploadImage(){
    const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "f4hjklyr");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/ddr4gso17/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
    }catch(error){
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e){
    e.preventDefault();
    if(!image) return alert('Masukan Gambar')
    const url = await uploadImage(image);
    console.log(url);
    signupUser({name, email, password, picture: url}).then(({data})=>{
      if(data){
        console.log(data);
        navigate('/chat');
      }
    })
    }

  return (
    <Container>
    <Row>
    <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
        <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
        <h1 className='text-center'>Buat Akun Anda Disini</h1>
        <div className='signup-profile-pic__container'>
        <img src={imagePreview || Bot} className='signup-profile-pic'/>
        <label htmlFor='image-upload' className='image-upload-label'>
        <i className='fas fa-plus-circle add-picture-icon'></i>
        </label>
        <input type="file" id="image-upload" hidden accept="image/png, image/jpg, image/jpeg" onChange={validateImg}/>
        </div>
        {error && <p className='alert alert-danger'>{error.data}</p>}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nama Anda</Form.Label>
          <Form.Control type="text" placeholder="Masukan nama anda" onChange={(e) => setName(e.target.value)} value={name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Masukan Email Anda" onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Masukan Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </Form.Group>
        <Button variant="info" type="submit">
        {upladingImg || isLoading ? 'masuk ke chat' : 'Buat Akun'}
        </Button>
        <div className='py-4'>
        <p className='text-center'>
        Apakah akun seperti ini ? <Link to="/login">Silahkan Login</Link>
        </p>
        </div>
      </Form>
      </Col>
      <Col md={5} className="signup-bg"></Col>
      </Row>
    </Container>
  )
}

export default Signup;
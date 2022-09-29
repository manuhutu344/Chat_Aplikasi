import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import'./Home.css'

function Home() {
  return (
    <Row>
    <Col md={6} className="d-flex flex-direction-colum align-items-center justify-content-center">
    <div>
    <h1>
    Selamat Datang Ditempat Terhubung Dengan Teman Atau Orang-orang Baru
    </h1>
    <p>
    Chat Dan Lihatlah Dunia Yang Luas
    </p>
    <LinkContainer to="/chat">
    <Button variant="info">
    Ayok Mulai <i className='fas fa-comments home-message-icon'>
    </i>
    </Button>
    </LinkContainer>
    </div>
    </Col>
    <Col md={6} className="home_bg">
    </Col>
    </Row>
  )
}

export default Home;
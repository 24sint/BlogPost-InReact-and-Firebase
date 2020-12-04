import React, { Fragment, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import * as ROUTES from './routes';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

function handleSubmit(e) {    
    e.preventDefault()
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value)
    
       history.push("/createBlog")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }
    return (  
        <Fragment>
        <div className="container">
            <Card className="auth mt-4" style={{maxWidth: "400px"}}>
                <Card.Body className="w-100">
                        <h2 className="text-center mb-4">Sign Up</h2> 
                        {error && <Alert variant="danger">{error}</Alert>}    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="paswword-confirm">
                            <Form.Label>password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled= {loading} className="w-100" type="submit" 
                                style={{backgroundColor: "#00cc00", borderRadius: "15px"}}>
                              Sign Up
                        </Button>
                    </Form>
                </Card.Body>
                    <div className="w-100 text-center mt-2 mb-4">
                        Already have an account ? <Link to={ROUTES.SIGN_IN}><span>Sign In</span></Link>
                    </div>
                </Card> 
            </div>       
        </Fragment>
    )
}


 

import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface Props {
    updateUserId: React.Dispatch<React.SetStateAction<number>>
}

const Login = ({ updateUserId }: Props) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [isHidden, setHidden] = useState<boolean>(true)
    const [isRegister, setRegister] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailRef.current!.value,
                password: passwordRef.current!.value,
            }),
        }

        let url = isRegister
            ? `http://127.0.0.1:8080/api/register`
            : `http://127.0.0.1:8080/api/login`

        fetch(url, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode == 200) {
                    setHidden(true)
                    updateUserId(data.body.userId)
                    console.log(data)
                    navigate("/home", { replace: true })
                } else {
                    setHidden(false)
                }
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        ref={emailRef}
                        required
                    />
                </Form.Group>
                <Form.Group controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        ref={passwordRef}
                        required
                    />
                </Form.Group>
                <Row className='justify-content-md-center'>
                    <Col>
                        <Form.Text className='text-muted'>
                            {isRegister
                                ? "Already have an account?"
                                : "Don't have an account?"}
                        </Form.Text>
                    </Col>
                    <Col>
                        <Form.Text
                            className='text-muted'
                            onClick={() => setRegister(!isRegister)}>
                            {isRegister ? "Login" : "Register"}
                        </Form.Text>
                    </Col>
                </Row>
                <Form.Text className='text-muted' hidden={isHidden}>
                    {isRegister
                        ? "User already exists"
                        : "Email or password incorrect"}
                </Form.Text>
                <Button variant='primary' type='submit'>
                    {isRegister ? "Register" : "Login"}
                </Button>
            </Stack>
        </Form>
    )
}

export default Login

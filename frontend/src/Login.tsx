import { FormEvent, useRef, useState } from "react"
import { Button, Form, Stack } from "react-bootstrap"
import { redirect, useNavigate } from "react-router-dom"

interface Props {
    updateUserId: React.Dispatch<React.SetStateAction<number>>
}

const Login = ({ updateUserId }: Props) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [isHidden, setHidden] = useState<boolean>(true)
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

        fetch(`http://127.0.0.1:8080/api/login`, requestOptions)
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
                <Form.Text className='text-muted' hidden={isHidden}>
                    Username or password incorrect
                </Form.Text>
                <Button variant='primary' type='submit'>
                    Login
                </Button>
            </Stack>
        </Form>
    )
}

export default Login

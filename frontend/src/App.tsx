import "bootstrap/dist/css/bootstrap.min.css"

import { useState } from "react"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Home from "./Home"
import ContactForm from "./ContactForm"

function App() {
    const [userId, updateUserId] = useState<number>(0)

    return (
        <Container className='my-4'>
            <Routes>
                <Route
                    path='/'
                    element={<Login updateUserId={updateUserId} />}
                />
                <Route path='/home' element={<Home userId={userId} />} />
                <Route
                    path='/contact'
                    element={<ContactForm userId={userId} />}
                />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Container>
    )
}

export default App

import { ChangeEvent, useEffect, useState } from "react"
import {
    Button,
    Col,
    Container,
    Dropdown,
    Modal,
    Row,
    Spinner,
    Stack,
} from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import ContactList from "./ContactList"

interface Props {
    userId: number
}

interface Contact {
    id: number
    name: String
    email: String
    number: String
}

const Home = ({ userId }: Props) => {
    const [contacts, updateContacts] = useState<Contact[]>([])
    const [fetching, isFetching] = useState(true)
    const [show, setShow] = useState<boolean>(false)

    const [selectFile, setSelectedFile] = useState<File>()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/getContacts/${userId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                var temp: Contact[] = []

                for (let index = 0; index < responseJson.body.length; index++) {
                    const element = responseJson.body[index]

                    temp = [...temp, element]
                }

                updatingContacts(temp)

                isFetching(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    function updatingContacts(data: Contact[]) {
        updateContacts(data)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0])
        setIsFilePicked(true)
    }

    const handleSubmission = () => {
        const formData = new FormData()

        formData.append("File", selectFile)

        fetch(`http://127.0.0.1:8080/api/import/${userId}`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return userId == 0 ? (
        <Navigate to={"/"} />
    ) : fetching ? (
        <Spinner animation='grow' />
    ) : contacts.length == 0 ? (
        <>No Contacts found</>
    ) : (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <input
                        type='file'
                        name='file'
                        onChange={changeHandler}
                        accept='.vcf'
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleSubmission}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>

            <Stack gap={3}>
                <Row>
                    <Col>Contact List</Col>
                    <Col>
                        <Dropdown className='d-inline mx-2'>
                            <Dropdown.Toggle id='dropdown-autoclose-true'>
                                Import
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => navigate("/contact")}>
                                    Manual
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>
                                    From VCard
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <ContactList
                    contacts={contacts}
                    updatingContacts={updatingContacts}
                />
            </Stack>
        </Container>
    )
}

export default Home

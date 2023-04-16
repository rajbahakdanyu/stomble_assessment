import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import { useState } from "react"

interface Contact {
    id: number
    name: String
    email: String
    number: String
}

interface Props {
    contacts: Contact[]
    updatingContacts: (data: Contact[]) => void
}

const ContactList = ({ contacts, updatingContacts }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [selectedIndex, setIndex] = useState<number>()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function onDelete() {
        handleClose()
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }

        fetch(
            `http://127.0.0.1:8080/api/delete/${contacts[selectedIndex!].id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.statusCode == 200) {
                    contacts.splice(selectedIndex!, 1)
                    updatingContacts(contacts)
                    handleShow()
                }
            })
            .catch((error) => {
                console.error(error)
            })

        handleClose()
    }

    function onEdit() {
        handleClose()
    }

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure you want to delete it?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        No
                    </Button>
                    <Button variant='danger' onClick={onDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row xs={1} md={2} className='g-4'>
                {contacts.map((item, index) => {
                    return (
                        <Col key={index}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>{item.email}</Card.Text>
                                    <Card.Text>{item.number}</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Button variant='success' onClick={onEdit}>
                                        Edit
                                    </Button>{" "}
                                    <Button
                                        variant='danger'
                                        onClick={() => {
                                            setIndex(index)
                                            handleShow()
                                        }}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ContactList

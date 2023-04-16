import { Col, Row } from "react-bootstrap"
import ContactItem from "./ContactItem"

interface Contact {
    id: number
    name: String
    email: String
    number: String
}

interface Props {
    contacts: Contact[]
}

const ContactList = ({ contacts }: Props) => {
    return (
        <Row xs={1} md={2} className='g-4'>
            {contacts.map((item, index) => {
                return (
                    <Col key={index}>
                        <ContactItem
                            name={item.name}
                            email={item.email}
                            phone={item.number}
                            id={item.id}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}

export default ContactList

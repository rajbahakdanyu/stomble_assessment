import { Button, Card } from "react-bootstrap"

interface Props {
    name: String
    email: String
    phone: String
    id: number
}

const ContactItem = ({ name, email, phone, id }: Props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{email}</Card.Text>
                <Card.Text>{phone}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link href='#'>Edit</Card.Link>
                <Card.Link href='#'>Delete</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default ContactItem

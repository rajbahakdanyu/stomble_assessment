import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom"
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

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/getContacts/${userId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                var temp: Contact[] = []

                for (let index = 0; index < responseJson.body.length; index++) {
                    const element = responseJson.body[index]

                    temp = [...temp, element]
                }

                updateContacts(temp)

                isFetching(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return userId == 0 ? (
        <Navigate to={"/"} />
    ) : fetching ? (
        <Spinner animation='grow' />
    ) : contacts.length == 0 ? (
        <>No Contacts found</>
    ) : (
        <ContactList contacts={contacts} />
    )
}

export default Home

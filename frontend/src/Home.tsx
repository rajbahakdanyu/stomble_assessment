import { Navigate } from "react-router-dom"

interface Props {
    userId: number
}

const Home = ({ userId }: Props) => {
    console.log(userId)

    return userId == 0 ? <Navigate to={"/"} /> : <div>{userId}</div>
}

export default Home

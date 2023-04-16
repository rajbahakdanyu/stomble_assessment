interface Props {
    userId: number
}

const Home = ({ userId }: Props) => {
    console.log(userId)

    return <div>{userId}</div>
}

export default Home

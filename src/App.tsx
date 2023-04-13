import "./App.css"

function App() {
    return (
        <div>
            <h1>Stomble Assessment</h1>
            <input type='text' name='email' id='email' placeholder='Email' />
            <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
            />
            <input type='button' value='Login' />
            <sub>Register an account</sub>
        </div>
    )
}

export default App

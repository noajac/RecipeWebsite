import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import styles from '../styles/App.module.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.formHeading}>Log in</h3>
                <label>Email:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className={styles.inputField}

                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={styles.inputField}
                />


                <button className={styles.button} disabled={isLoading}>Log in</button>
                {error && <div className={styles.error}>{error}</div>}

            </form>
        </div >
    )
}

export default Login
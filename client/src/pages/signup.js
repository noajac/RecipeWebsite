import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import styles from '../styles/App.module.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()



    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)

    }

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className={styles.formHeading}>Sign Up</h3>
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

                <button className={styles.button} disabled={isLoading}>Sign up</button>
                {error && <div className={styles.error}>{error}</div>}

            </form>
        </div>
    )
}

export default Signup
import { Formik, Form } from "formik"
import * as Yup from 'yup' 
import { Link } from "react-router-dom"
import { Context } from "../../context/UserContext"
import  { useContext } from 'react'

// CSS
import styles from '../Form/Form.module.css'
import Input from "../Form/Input"
import InputSubmit from "../Form/InputSubmit"


function Login() {

    const { login } = useContext(Context)

    const validationSchema = Yup.object({
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        password: Yup.string().required('Senha é obrigatória').min(8, 'Senha deve possuir no mínimo 8 caracteres')
    })

    return (
        <section>
            <div className={styles.form_container}>
                <h2 className="display-5">Login</h2>
                <Formik
                validationSchema={validationSchema}
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => login(values)}>
                    <Form>
                        <Input name="email" type="email" placeholder="Insira seu email" />
                        <Input name="password" type="password" placeholder="Insira sua senha" />
                        <InputSubmit value="Entrar"/>
                    </Form>
                </Formik>
                <p className={styles.link}>Não possui uma conta? <Link to="/register">Clique aqui</Link></p>
            </div>
        </section>
    )
}

export default Login
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { Context } from "../../context/UserContext"
import { useContext } from "react"

import InputSubmit from "../Form/InputSubmit"
import Input from "../Form/Input"

// CSS
import styles from '../Form/Form.module.css'


function Register() {

    const {register} = useContext(Context)

    const validationSchema = Yup.object({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        password: Yup.string().required('Senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
        confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas não conferem').required('Confirmação de senha é obrigatória')
    })

    return (
        <section>
            <div className={styles.form_container}>
                <h2 className="display-5">Registrar</h2>
                <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmpassword: ''
                }}
                onSubmit={(values) => register(values)}>
                    <Form>
                        <Input name="name" placeholder="Digite seu nome" type="text" />
                        <Input name="email" placeholder="Digite seu email" type="email" />
                        <Input name="password" placeholder="Digite sua senha" type="password" />
                        <Input name="confirmpassword" placeholder="Confirme sua senha" type="password" />
                        <InputSubmit value="Registrar"/>
                    </Form>
                </Formik>
                <p className={styles.link}>Já possui uma conta? <Link to="/login">Clique aqui</Link></p>
            </div>
        </section>
    )
}

export default Register
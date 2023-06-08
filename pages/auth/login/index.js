import React, {useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {InputText} from 'primereact/inputtext';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from "react-redux";
import {setEmail} from "../../../store/slice";

const Login = () => {

    const router = useRouter();

    const dispatch = useDispatch();
    const email = useSelector(state => state.sections.email);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);


    const fieldError = (message) => {

        return Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: message,
            confirmButtonColor: '#131b26',
        });

    };

    const handleLogin = async () => {

        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;

        dispatch(setEmail(emailValue));

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailValue) {
            return fieldError('El campo email es requerido');
        }

        if (!emailRegex.test(emailValue)) {
            return fieldError('Por favor ingresa un correo válido');
        }

        if (!passwordValue) {
            return fieldError('El campo contraseña es requerido');
        }

        if (emailValue === 'admin@gmail.com' && passwordValue === '123456789') {
            const session = {secret: process.env.NEXT_PUBLIC_SECRET};
            localStorage.setItem('session', JSON.stringify(session));
            return router.push('/section/precipitation');
        }

        return fieldError('Las credenciales no coinciden con los registros');
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const handleValueChange = (event) => {
        dispatch(setEmail(event.value));
    }

    return (
        <div className="col-12 flex justify-content-center align-items-center" style={{height: '90vh'}}>

            <div className="col-12 md:col-4 text-center">

                <h6>INICIO DE SESIÓN</h6>

                <div className="card p-fluid">

                    <div className="p-inputgroup mt-3">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-user"/>
                        </span>
                        <InputText ref={emailRef} value={email} type="email" placeholder="Email" autoComplete="email"
                                   onChange={handleValueChange}/>
                    </div>

                    <div className="p-inputgroup mt-3">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"/>
                        </span>

                        <InputText
                            ref={passwordRef}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            onKeyUp={handleKeyPress}
                        />

                        <button className="p-button p-component p-button-text"
                                style={{background: 'white', color: 'black'}}
                                onClick={handleTogglePassword}>
                            <i className={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}/>
                        </button>

                    </div>

                    <button className="p-button p-component mt-5" onClick={handleLogin}>
                        <span className="p-button-label p-c">Iniciar sesión</span>
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Login;

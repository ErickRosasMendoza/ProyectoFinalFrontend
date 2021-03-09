import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Global from '../Global';
import md5 from 'md5';

const cookies = new Cookies();

class DatosActualizadosEmail extends React.Component {

    url = Global.url;

    contraseñaRef = React.createRef();
    emailRef = React.createRef();
    confirmarContraseñaRef = React.createRef();
    nuevaContraseñaRef = React.createRef();
    nuevoEmailRef = React.createRef();
    confirmarNuevaContraseña = React.createRef();

    state = {
        confirmarContraseña: "",
        confirmarNuevaContraseña: "",
        nuevaContraseña: "",
        idUsuario: cookies.get('idUsuario'),
        emailPerfil: cookies.get('email'),
        statusEmail: null,
        statusContraseña: null,
        statusNuevoEmail: null,
        statusNuevaContraseña: "false",
        statusNuevaConfirmar: null,
        usuario: {},
        email: "",
        contraseña: "",
        status: "null",
        searchEmail: {},
        emailExistente: null,
        ayuda: "false"
    };

    changeState = async (e) => {
        
       await this.setState({
            usuario: {
                email: this.nuevoEmailRef.current.value,
                contraseña: md5(this.nuevaContraseñaRef.current.value),
                tipoUsuario: this.props.tipoUsuario,
                idUsuario: this.state.idUsuario
            },
            confirmarContraseña: md5(this.confirmarNuevaContraseña.current.value),
            confirmarNuevaContraseña: this.nuevaContraseñaRef.current.value,
            nuevaContraseña: this.nuevaContraseñaRef.current.value,
            contraseña: this.contraseñaRef.current.value,
            email: this.emailRef.current.value
        });  
    }//Fin de changeState

    update = () => {
        this.changeState();
        if(this.state.email && this.state.email !== null && this.state.email !== undefined){
            if(this.state.contraseña.length >= 5){
                axios.get(this.url+"usuario/findByEmail/"+this.state.email)
                .then(res => {
                    if(this.state.email === this.state.emailPerfil){
                        if(this.state.usuario.email && this.state.usuario.email !== null && this.state.usuario.email !== undefined){
                            if(this.state.usuario.email === this.state.email){
                                if(this.state.nuevaContraseña.length >= 5 && this.state.nuevaContraseña.length<= 10){
                                    if(this.state.confirmarNuevaContraseña && this.state.confirmarNuevaContraseña !== null && this.state.confirmarNuevaContraseña !== undefined){
                                        if(this.state.usuario.contraseña === this.state.confirmarContraseña){
                                            axios.patch(this.url+"usuario/update", this.state.usuario)
                                            .then(res => {
                                                this.setState({
                                                    status: "true"
                                                });
                                            });
                                        }else{
                                            this.setState({
                                                statusNuevaConfirmar: "false",
                                                statusNuevaContraseña: "true",
                                                statusNuevoEmail: "true",
                                                statusEmail: "true",
                                                statusContraseña: "true"
                                            });
                                        }//Fin de else comparando nuevas contraseñas
                                    }else{
                                        this.setState({
                                            statusNuevaConfirmar: "false",
                                            statusNuevaContraseña: "true",
                                            statusNuevoEmail: "true",
                                            statusEmail: "true",
                                            statusContraseña: "true"
                                        });
                                    }//Fin de Nueva Contraseña Confirmar
                                }else{
                                    this.setState({
                                        statusNuevaContraseña: "false",
                                        statusNuevoEmail: "true",
                                        statusEmail: "true",
                                        statusContraseña: "true"
                                    });
                                }//Fin de Nueva contraseña
                            }else{
                                if(this.state.nuevaContraseña.length >= 5 && this.state.nuevaContraseña.length<= 10){
                                    if(this.state.confirmarNuevaContraseña && this.state.confirmarNuevaContraseña !== null && this.state.confirmarNuevaContraseña !== undefined){
                                        if(this.state.usuario.contraseña === this.state.confirmarContraseña){
                                            axios.get(this.url+"usuario/findByEmail/" + this.state.usuario.email)
                                            .then(res =>{
                                                this.setState({
                                                    ayuda: "false",
                                                    emailExistente: "true",
                                                    statusNuevaConfirmar: "true",
                                                    statusNuevaContraseña: "true",
                                                    statusNuevoEmail: "true",
                                                    statusEmail: "true",
                                                    statusContraseña: "true"

                                                });
                                            })
                                            .catch(error =>{
                                                this.setState({
                                                    emailExistente: "false"
                                                });
                                            })
                                            .then(res => {
                                                if(this.state.emailExistente == "false"){
                                                    if(this.state.ayuda == "false"){
                                                        axios.patch(this.url+"usuario/update", this.state.usuario)
                                                        .then(res =>{
                                                            this.setState({
                                                                status: "true"
                                                            });
                                                        })
                                                        .then(res => {
                                                            cookies.set('email', this.state.usuario.email , { path: "/" })
                                                        })
                                                    }else{
                                                        this.setState({
                                                            ayuda: "false"
                                                        });
                                                    }
                                                }else{
                                                    this.setState({
                                                        emailExistente: "true",
                                                        ayuda: "false"
                                                    });
                                                }//Fin de else Email Existe
                                            })
                                        }else{
                                            this.setState({
                                                statusNuevaConfirmar: "false",
                                                statusNuevaContraseña: "true",
                                                statusNuevoEmail: "true",
                                                statusEmail: "true",
                                                statusContraseña: "true"
                                            });
                                        }//Fin de else Comparando Nuevas Contraseñas
                                    }else{
                                        this.setState({
                                            statusNuevaConfirmar: "false",
                                            statusNuevaContraseña: "true",
                                            statusNuevoEmail: "true",
                                            statusEmail: "true",
                                            statusContraseña: "true"
                                        });
                                    }//Fin de Confirmar Nueva Contraseña
                                }else{
                                    this.setState({
                                        statusNuevaContraseña: "false",
                                        statusNuevoEmail: "true",
                                        statusEmail: "true",
                                        statusContraseña: "true"
                                    });
                                }//Fin de else nueva contraseña
                            }//Fin de else no esta ingresando emailPerfil
                        }else{
                            this.setState({
                                statusNuevoEmail: "false",
                                statusEmail: "true",
                                statusContraseña: "true"
                            });
                        }//Fin de else Nuevo Email
                    }else{
                        this.setState({
                            statusEmail: "false",
                            statusContraseña: "true"
                        });
                    }//Fin de else Comparando el email ingresado
                })
            }else{
                this.setState({
                    statusContraseña: "false"
                });
            }//Fin de else contraseña
        }else{
            this.setState({
                statusEmail: "false"
            });
        }//Fin de Email
    }//Fin de update

    render() {
        if(this.state.status === 'true'){
            window.location.href = './' + this.props.redirect
        }

        return (
            <div className = "center">
                <div id="sidebar" className="registroAlumno">
                    <div>
                    <label htmlFor="email" className="text_login">Email</label>
                    <input type="email" className="input_login" name="email" ref={this.emailRef} placeholder="Ingresa quí tu correo electrónico" onChange={this.changeState}/>
                        {(() => {
                        switch(this.state.statusEmail){   
                        case "false":
                        return (
                        <a className="warning">¡Ingresa tu correo electrónico para verificar que eres tu!</a>
                            );
                            break;
                        default:
                        break;
                        }
                        })()}
                    </div>
                    <div>
                        <label htmlFor="contraseña" className="text_login">Contraseña</label>
                        <input type="password" className="input_login" name="contraseña" ref={this.contraseñaRef} placeholder="Ingresa aquí tu contraseña" onChange={this.changeState}/>
                            {(() => {
                            switch(this.state.statusContraseña){   
                            case "false":
                                return (
                                <a className="warning">¡Ingresa tu contraseña para verificar que eres tu!</a>
                                );
                                break;
                            default:
                                break;
                                }   
                                })()}
                    </div>
                    <div>
                    <label htmlFor="nuevoEmail" className="text_login">Nuevo Email</label>
                    <input type="email" className="input_login" name="nuevoEmail" ref={this.nuevoEmailRef} placeholder="Ingresa quí tu nuevo correo electrónico" onChange={this.changeState}/>
                        {(() => {
                        switch(this.state.statusNuevoEmail){   
                        case "false":
                        return (
                        <a className="warning">¡Ingresa un correo electronico valido!</a>
                            );
                            break;
                        default:
                        break;
                        }
                        })()}
                        {(() => {
                            switch(this.state.emailExistente){   
                                case "true":
                                return (
                                <a className="warning">¡Este correo ya fue registrado!</a>
                                );
                                break;
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div>
                        <label htmlFor="nuevaContraseña" className="text_login">Nueva Contraseña</label>
                        <input type="password" className="input_login" name="nuevaContraseña" ref={this.nuevaContraseñaRef} placeholder="Ingresa aquí tu nueva contraseña" onChange={this.changeState}/>
                            {(() => {
                            switch(this.state.statusNuevaContraseña){   
                            case "false":
                                return (
                                <a className="warning">¡Ingresa una Nueva Contraseña entre 6 y 10 caracteres!</a>
                                );
                                break;
                            default:
                                break;
                                }   
                                })()}
                    </div>
                    <div>
                        <label htmlFor="nuevaContraseñaConfirmar" className="text_login">Confirma Nueva Contraseña</label>
                        <input type="password" className="input_login" name="nuevaContraseñaConfirmar" ref={this.confirmarNuevaContraseña} placeholder="Confirma aquí tu nueva contraseña" onChange={this.changeState}/>
                        {(() => {
                        switch(this.state.statusNuevaConfirmar){   
                        case "false":
                            return (
                            <a className="warning">¡Verifica tu Nueva Contraseña!</a>
                            );
                            break;
                        default:
                            break;
                            }   
                            })()}
                            </div>
                            <br/>
                            <button  className = "btn" onClick = {this.update}>Aceptar</button>
                        </div>
		    </div>
        );
    }
}//Fin de classs DatosActualizadosEmail
export default DatosActualizadosEmail;

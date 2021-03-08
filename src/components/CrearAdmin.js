import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';
import DirectorioAdmin from './DirectorioAdmin';
import Global from '../Global';
import md5 from 'md5';

class CrearAdmin extends React.Component {

    url = Global.url;
    tipoUsuarioRef = React.createRef();
    contraseñaRef = React.createRef();
    emailRef = React.createRef();

    state = {
        usuario: {},
        contraseña: "",
        statusEmail: null,
        statusContraseña: null,
        status: "null",
        searchEmail: {},
        emailExistente: null,
        ayuda: "false"
    };

    changeState = () => {
        this.setState({
            usuario: {
                email: this.emailRef.current.value,
                contraseña: md5(this.contraseñaRef.current.value),
                tipoUsuario: "true"
            },
            contraseña: this.contraseñaRef.current.value
        });
       // console.log(this.state + "Cambiando datos a usuario");
    }

    saveAdmin = () =>{
        if(this.state.usuario.email && this.state.usuario.email !== null && this.state.usuario.email !== undefined){
            if(this.state.contraseña && this.state.contraseña !== null && this.state.contraseña !== undefined){
                axios.get(this.url+"usuario/findByEmail/"+this.state.usuario.email)
                .then(res => {
                    this.setState({
                        emailExistente: "true",
                        ayuda: "true",
                        statusContraseña: "true",
                        statusEmail: "true"
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
                            axios.post(this.url+"usuario/save", this.state.usuario)
                            .then(res =>{
                                this.setState({
                                    status: "true"
                                });
                            });
                        }else{
                            this.setState({
                                ayuda: "false",
                                emailExistente: "true",
                                statusContraseña: "true",
                                statusEmail: "true"
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
                    statusContraseña: "false",
                    statusEmail: "true"
                });
            }//Fin de else contraseña
        }else{
            this.setState({
                statusEmail: "false",
                emailExistente: "false",
            });
        }//Fin de else correo
    }//Fin de saveAdmin

    render() {
        if(this.state.status == 'true'){
            return <Redirect to = "/Lista"></Redirect>
        }

        return (
            <div className="center">
                    <DirectorioAdmin />
                        <div id="sidebar" className="crearAdmin">
                            <div>
                                <label htmlFor="email" className="text_login">Email</label>
                                <input type="email" className="input_login" name="email" ref={this.emailRef} placeholder="Ingresa aquí el correo electrónico" onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusEmail){   
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
                                <label htmlFor="contraseña" className="text_login">Contraseña</label>
                                <input type="text" className="input_login" name="contarseña" ref={this.contraseñaRef} placeholder="Ingresa aquí la contraseña" onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusContraseña){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa una contraseña!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }   
                                    })()}
                            </div>
                            <br/>
                            <button className = "btn" onClick = {this.saveAdmin}>Aceptar</button>
                          </div>
            </div>
        );
    }
}
export default CrearAdmin;

import React from 'react';
import axios from 'axios';
import logo2 from '../assets/images/ipnLogo.png'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Global from '../Global';
import Slider from './Slider';
import md5 from 'md5';
import validator from 'validator';

const cookies = new Cookies();

class IniciarSesion extends React.Component {

    url = Global.url;
    
    contraseñaRef = React.createRef();
    contraseñaRef2 = React.createRef();
    contraseñaRef2 = false;
    emailRef = React.createRef();
    email2Ref = React.createRef();
    email2Ref = "true";
    state = {
        email: cookies.get('email'),
        idUsuario: cookies.get('idUsuario'),
        statusPassword: "true",
        statusEmail:"true",
        usuario:{},
        form: {
            idUsuario: "",
            email: false,
            contraseña: false,
            tipoUsuario: ""
        }
    }


    emailChange = async () => {
        await this.setState({
            form: { 

                 email:this.emailRef.current.value,
                 contraseña:md5(this.contraseñaRef.current.value)
                
                  
            }
        })

        
        if(this.state.form.email == undefined){
            this.email2Ref =  this.email2Ref;
        }
        else{
            this.email2Ref = this.state.form.email;
        }
        if(this.email2Ref) {
           
            console.log("dentro del if del ChangeEail")
        }
        else{
                this.email2Ref = "false";
        }
        /*
        var validacion = validator.isEmail(this.email2Ref)
        if(validacion == false){
            this.email2Ref = "false";
        }
        */
    
    }


    passwordChange = () => {
        this.setState({
            form: {
                contraseña:this.contraseñaRef.current.value
            }
        })
        
        if(this.state.form.contraseña == undefined){
            this.contraseñaRef2 =  this.contraseñaRef2;
        }
        else{
                this.contraseñaRef2 = this.state.form.contraseña;
            this.setState({
                usuario:{
                    email: this.email2Ref,
                    contraseña: this.contraseñaRef2,
                    tipoUsuario: false,
                    status: false
                },
               
            })
        }
    }

    login =   () => {
        this.passwordChange();
        if(this.state.usuario.status != false |this.state.usuario.status != undefined){
            var validacion = validator.isEmail(this.email2Ref)
            if(validacion == false){
                this.email2Ref = "false";
            }
                axios.post(this.url + "usuario/findEmail" , (this.state.form))
                .then(response => {
                    this.setState({
                                       usuario: response.data,
                                       
                                 })
                                 if(this.state.usuario.status ==true){ 
                                     if(this.state.usuario.tipoUsuario ==false)  {
                                        cookies.set('idUsuario', this.state.usuario.idUsuario , { path: "/" })
                                        cookies.set('email',this.state.usuario.email, { path: "/" })
                                        cookies.set('tipoUsuario', "false", { path: "/" })
                                        window.location.href ="./MisDatosAlumno";
                                     } 
                                     else{
                                        cookies.set('idUsuario', this.state.usuario.idUsuario , { path: "/" })
                                        cookies.set('email',this.state.usuario.email, { path: "/" })
                                        cookies.set('tipoUsuario', "true", { path: "/" })
                                        window.location.href = "./MisDatosAdmin";
                                    }
                                     }
                                 return response.data;

                                 }) 
            }    
        
        else{
            this.email2Ref = "false";
        
        }

    }     
        
   


    render() {



        return (

            <div className= "center">
                
                <Slider
                    title="Iniciar Sesión"
                    size="slider-small"
                />
                 <Link to={'./Registrarse'} className="registrarse">Registrarse</Link>
                     <div id="sidebar">
                     <div>
                             <img src={logo2} id="logo2" alt="politecnico" />
                             <br /> <br />
                             <a className="text-logo"><strong>Departamento de Extensión</strong>  </a>
                             <a className="text-logo"><strong>y Apoyos Educativos</strong></a>
                     </div>

                     <div className="input-border" >
                                 <br /> <br /> <br />
                     <label htmlFor="email" className="text_login">Correo electrónico </label>
                     <input type="email" className="input_login" name="email" ref={this.emailRef} onChange={this.emailChange} placeholder="Ingresa aquí tu correo electrónico" />
                     </div>
                     {(() => {
                         switch (this.email2Ref){   
                            case "false":
                                return (
                                    <a className="warning">¡correo electrónico no valido!</a>
                                );

                                 
                                }
                            })()}

                     <div>
                         <label htmlFor="contraseña" className="text_login">Contraseña</label>
                            <input type="password" className="input_login" name="contraseña" autoComplete="on"  ref={this.contraseñaRef} placeholder="Ingresa aquí tu contraseña" onChange={this.emailChange} />
                     </div>    
                     {(() => {
                         switch (this.state.usuario.status) {
                        case false:
                            return (
                                <a className="warning">¡contraseña incorrecta!</a>
                            );
                         }
                      })()}
                            <br/>
                           <button className="btn" onClick={this.login} >Aceptar</button>  
                        

                            
                             </div>
                             </div>

         );     
     }//Fin de Render
}//Fin de Class Iniciar Sesion
export default IniciarSesion;
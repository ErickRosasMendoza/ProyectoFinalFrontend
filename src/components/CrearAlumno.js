import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo2 from '../assets/images/ipnLogo.png'
import Slider from './Slider';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Global from '../Global';
import md5 from 'md5';
import { isEmptyObject } from 'jquery';

const cookies = new Cookies();

class CrearAlumno extends React.Component {

    url = Global.url;

    tipoUsuarioRef = React.createRef();
    contraseñaRef = React.createRef();
    emailRef = React.createRef();
    confirmarContraseñaRef = React.createRef();
//refs para guardar el state
    email2Ref = React.createRef();
    email2Ref = true;
    contraseñaRef2 = React.createRef();
    contraseñaRef2 = true; 

    state = {
        



        confirmarContraseña: false,
        idUsuario: cookies.get('idUsuario'),
        statusEmail: false,
        statusContraseña: true,

        statusConfirmar: false,             ///se usa para validar la segunda entrada de la contraselña
        
        usuario: {},
        email: "",
        contraseña: "",
        status: null,
        searchEmail: {},
        emailExistente: false,
        ayuda: "false"
    };

    changeState =  () => {
        
        this.setState({
            confirmarContraseña: this.confirmarContraseñaRef.current.value
        })
        if(this.state.confirmarContraseña){
            console.log(this.state.confirmarContraseña+ "confirmar contraseña state") 
            this.setState({
                statusContraseña:true,
                emailExistente:false
            })
        }
        else{
            this.setState({
                statusContraseña: false,
                emailExistente:false
            })
        }
 
       
   

      
  
       
           
    }
    
    changeEmail = async() =>{
        await this.setState({
            usuario:{
                email:this.emailRef.current.value
            },
           
        })
        if(this.state.usuario.email == undefined){
            this.email2Ref =  this.email2Ref;
        }
        else{
            this.email2Ref = this.state.usuario.email;
        }
        if(this.email2Ref) {
           
            console.log("dentro del if del ChangeEail")
        }
        else{
                this.email2Ref = false;
        }
    
        
        console.log(this.state.usuario.email + "-----------email de state de usuario");
        console.log(this.email2Ref + "---email  de email2 ref ya no se perdio el valor")
        console.log(this.state.statusEmail +"---------status email")
        
    }


    changePassword=()=>{
        this.setState({
            usuario:{
                contraseña:this.contraseñaRef.current.value
            },
           
        })
        

        if(this.state.usuario.contraseña == undefined){
            this.contraseñaRef2 =  this.contraseñaRef2;
        }
        else{
            this.contraseñaRef2 = this.state.usuario.contraseña;
        }
        if(this.contraseñaRef2){
            console.log("dentro del if del password")
        }
        else{
          this.contraseñaRef2 = false;
        }
        console.log(this.state.usuario.contraseña +" ___contraseña");
        console.log(this.contraseñaRef2 + " ------contraseña de reff 2");
       
       
    }

    saveAlumno = async (e) => {
        this.changePassword();
        this.changeEmail();
        this.changeState();
       
        
        if(this.email2Ref != false ){
          if(this.email2Ref ){
           alert("dentro del preimer if email2REF" + this.email2Ref)
            if(this.contraseñaRef2 ){
                console.log("dentro del segundo if contraseñaREF2")
                if(this.state.confirmarContraseña){
                    console.log("dentro del tercer if   CONFIRMACION DE CONTRASEÑA")
                    if(this.contraseñaRef2 == this.state.confirmarContraseña){

                        console.log("dentro de la COMPARACION DE CONTRASEÑAAS")
                        axios.get(this.url + "usuario/findEmail/" + this.email2Ref)
                        .then(res =>{
                            this.setState({
                                emailExistente: true,
                               
                            }); 
                            alert("CACHANDO lA RES " + this.state.emailExistente)
                        })
                        .catch(error =>{
                            this.setState({
                                usuario:{
                                    contraseña: md5(this.contraseñaRef2)
                                },
                                emailExistente: false
                            })
                            alert("CACHANDO EL ERREO" + this.state.emailExistente)
                        })
                        .then(res => {      
                                
                            if(this.state.emailExistente == false){
                                this.setState({
                                        usuario:{
                                        email: this.email2Ref,
                                        contraseña: md5(this.contraseñaRef2),
                                        tipoUsuario: "false"
                                    }
                                })
                                
                                    axios.post(this.url+"usuario/save", this.state.usuario)
                                    .then(res =>{
                                        this.setState({
                                            status: "true"
                                        });
                                    });
                                    
                                
                                
                            }else{
                                this.setState({
                                    emailExistente: true,
                                   
                                });
                            }//Fin de else Email Existe 
                        })                          ////////////
                    }else{
                        this.setState({
                           
                            statusContraseña: false,
                            
                        });
                    }//Fin de else comparando contraseñas
                }else{
                    this.setState({
                        confirmarContraseña: "false",
                      
                    });
                }   //Fin de else confirmar contraseña
            }else{
               this.contraseñaRef2 = false;
            }  
         } else{

            this.setState({
                emailExistente: true,
               
            });
         }
         //Fin de else contraseña
        }else{
            this.email2Ref = false;
          
        }   //Fin de else email
    
    }   //fin de saveAlumno
    
   
    render() {
        if(this.state.status === 'true'){
            return <Redirect to = "/IniciarSesion"></Redirect>
        }

        return (
            <div className = "center">
                    <Slider
                        title="Registrarse"
                        size="slider-small"
                    />
		            <Link to = {'./IniciarSesion'} className= "registrarse">Iniciar Sesión</Link>
                        <div id="sidebar" className="registroAlumno">
                        <div>     
                            <img src={logo2} id="logo2" alt="politecnico" />
                            <br/> <br/> 
                            <a className = "text-logo"><strong>Departamento de Extensión</strong></a>
                            <a className = "text-logo"><strong>y Apoyos Educativos</strong></a>
                            </div>
                            <div className = "input-border">
                            <br/> <br/> <br/>
                   
                                <label htmlFor="email" className="text_login">Email</label>
                                <input type="email" className="input_login" name="email" ref={this.emailRef} placeholder="Ingresa quí tu correo electrónico" onChange={this.changeEmail}/>
                                {(() => {
                                switch(this.email2Ref){   
                                    case false:
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
                                    case true:
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
                                <input type="password" className="input_login" name="contarseña" ref={this.contraseñaRef} placeholder="Ingresa aquí tu contraseña" onChange={this.changePassword}/>
                                {(() => {
                                switch(this.contraseñaRef2){   
                                    case false:
                                    return (
                                    <a className="warning">¡Ingresa una contraseña!</a>
                                    );
                                   
                                    default:
                                        break;
                                }   
                                })()}
                            </div>
                            <div>
                                <label htmlFor="contraseñaConfirm" className="text_login">Confirma Contraseña</label>
                                <input type="password" className="input_login" name="contraseñaConfirm" ref={this.confirmarContraseñaRef} placeholder="Confirma aquí tu contraseña" onChange={this.changeState}/>
                                {(() => {
                                switch(this.state.statusContraseña){   
                                    case false:
                                    return (
                                    <a className="warning">¡Verifica tu Contraseña!</a>
                                    );
                                
                                    default:
                                        break;
                                }   
                                })()}
                            </div>
                            
                            <br/>
                            
                            <button  className = "btn" onClick = {this.saveAlumno}>Aceptar</button>
                            
                        </div>
                        
                        
		    </div>
            
            
        );
    }
}
export default CrearAlumno;


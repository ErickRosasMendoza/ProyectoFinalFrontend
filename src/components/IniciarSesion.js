import React from 'react';
import axios from 'axios';
import logo2 from '../assets/images/ipnLogo.png'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Global from '../Global';
import Slider from './Slider';
import md5 from 'md5';


const cookies = new Cookies();

class IniciarSesion extends React.Component {

    url = Global.url;

    emailRef = React.createRef();

    state = {
        email: cookies.get('email'),
        idUsuario: cookies.get('idUsuario'),
        statusPassword: "true",
        statusEmail:"true",
        usuario:{},
        form: {
            idUsuario: "",
            email: "",
            contraseña: "",
            tipoUsuario: ""
        }
    }
    componentWillMount= () => {
       this.setState(
           {
            email:cookies.get('email'),
         
           }
       )
    }

    handleChange = async (e) => {
        await this.setState({
            form: { 

                     ...this.state.form,
                   [e.target.name]: e.target.value
                
                  
            }
        })
        cookies.set('email', this.state.form.email, { path: "/" });
        
       console.log(cookies.get('email') + "cookies");
        var psw = cookies.set('contraseña', this.state.form.contraseña, {path:"/"});
        psw = md5(cookies.get('contraseña'));
        console.log(psw + "cookies contraseña con md5");
        cookies.set('contraseña', psw, {phat: "/"})

    }


    passwordChange = () => {
        this.setState({
            form: {
                contraseña: md5(this.state.form.contraseña)
                
            }
           
        })
        
       
    }

    login = async (e) => {
        this.passwordChange();
        if(this.state.statusEmail =="true" || this.state.statusEmail == "false"){
                  await axios.get(this.url + "usuario/findEmail/" + (this.state.form.email ||this.state.usuario.email))
                        .then(response => {
                            this.setState({
                                               usuario: response.data
                                         })
                                         console.log(response.data.email + "response datasss")
                                         console.log(this.state.form.email + "datos dentro del form")
                                         console.log(this.state.usuario.email + "datos dentro de usuario")
                                         
                                           return response.data;
                                        
                                         })
                               

                           .then(response => {
                           if (this.state.usuario.tipoUsuario == false) {
                            console.log(cookies.get('contraseña') + " contraseña de las cookies")
                            console.log( this.state.usuario.contraseña+ "contraseña de usuario")
                                  if (cookies.get('contraseña') == this.state.usuario.contraseña) {
                                  //  alert("dentro del segundo if del segundo then")
                                   console.log(cookies.get('contraseña') + " email de las cookies")
                                   console.log( this.state.usuario.contraseña+ "contraseña de usuario")
                                  // alert("dentro del segundo if del segundo then")
                                         cookies.set('idUsuario', response.idUsuario, { path: "/" })
                                        cookies.set('email', response.email, { path: "/" })
                                         window.location.href = "./MisDatosAlumno";
                                          
                                       }
                                          else {
                                                this.setState({
                                                 statusPassword: "false"
                                                 });
                                                // alert("VERIFIQUE SU CONTRASEÑA");
                                                // console.log(this.state.statusPassword);
                                                }
                            
                                               console.log(response.data + "response data del segundo then")
                             
                            


                                    }
                                    else if (this.state.usuario.tipoUsuario == true) {
                                             if (cookies.get('contraseña') == this.state.usuario.contraseña){
                                                cookies.set('idUsuario', response.idUsuario, { path: "/" })
                                                cookies.set('email', response.email, { path: "/" })
                                                 window.location.href = "./MisDatosAdmin";
                                                   
                                                  } 
                                                   else {
                                                        this.setState({
                                                       statusPassword:"false"
                                                          })
                                                // alert("VERIFIQUE SU CONTRASEÑA");
                                                 window.location.href = "./IniciarSesion"; 
                                                    } 
                                                }       
                                          })  
                           .catch(error => {
               
                                             this.setState({
                                                        statusEmail:"false",
                                                            });
                                     //alert("VERIFIQUE SU CORREO");
                                       //window.location.href = "./IniciarSesion";
                             console.log(error + "status mail" + this.state.email +  " error en consulta");
                             
                            })  
                             
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
                     <input type="email" className="input_login" name="email"  onChange={this.handleChange} placeholder="Ingresa aquí tu correo electrónico" />
                     </div>
                     {(() => {
                         switch(this.state.statusEmail){   
                            case "false":
                                return (
                                    <a className="warning">¡correo electrónico no valido!</a>
                                );

                                 
                                }
                            })()}

                     <div>
                         <label htmlFor="contraseña" className="text_login">Contraseña</label>
                            <input type="password" className="input_login" name="contraseña" autoComplete="on" placeholder="Ingresa aquí tu contraseña" onChange={this.handleChange} />
                     </div>    
                     {(() => {
                         switch (this.state.statusPassword) {
                        case "false":
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

            
                           
            
     }
        
}
export default IniciarSesion;
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderDEyAE from './HeaderDEyAE';
import DirectorioAlumno from './DirectorioAlumno';
import Global from '../Global';
import Cookies from 'universal-cookie';
import SubirLiberacion from './SubirLiberacion';
import VerDatosLiberacion from './VerDatosLiberacion';

const cookies = new Cookies();

class Liberacion extends React.Component {

    url = Global.url;
    
    registroSSRef = React.createRef();
    semestreRef = React.createRef();
    egresadoRef = React.createRef();
    prestatarioRef = React.createRef();
    programaSSRef = React.createRef();
    fechaInicioRef = React.createRef();
    fechaTerminoRef = React.createRef();
    telefonoRef = React.createRef();
    liberacionRef = React.createRef();
    liberacionRef = cookies.get('idAlumno');


    state = {
        idAlumno: cookies.get('idAlumno'),
        statusRegistro: null,
        statusPrograma: null,
        statusPrestatario: null,
        statusFechaInicio: null,
        statusFechaTermino: null,
        statusTelefono: null,
        liberacion: {},
        status: "null",
        estado: null
    };

    componentWillMount = () =>{
        this.searchLiberacion();
    }

    searchLiberacion = () => {
        axios.get(this.url+"liberacionExtemporanea/findIdAlumno/"+this.liberacionRef)
        .then(res =>{
            this.setState({
                liberacion: res.data
            });
        })
        .then(res => {
            this.setState({
                estado: this.state.liberacion.estado,
                liberacion: {
                    egresado: null,
                    semestre: null,
                    registroSS: null,
                    prestatario: null,
                    programaSS: null,
                    fechaInicio: null,
                    fechaTermino: null,
                    telefono: null,
                    estado: "NUEVO",
                    idAlumno: null,
                    idLiberacion: null
                }
            });
        });
    }//Fin de search Liberacion

    changeState = () => {
        this.setState({
            liberacion: {
                egresado: "EGRESADO",
                semestre: "True",
                registroSS: this.registroSSRef.current.value,
                prestatario: this.prestatarioRef.current.value.toUpperCase(),
                programaSS: this.programaSSRef.current.value.toUpperCase(),
                fechaInicio: this.fechaInicioRef.current.value,
                fechaTermino: this.fechaTerminoRef.current.value,
                telefono: this.telefonoRef.current.value,
                estado: "NUEVO",
                idAlumno: this.state.idAlumno,
                idLiberacion: this.state.idAlumno
            }
        });
       // console.log(this.state + "Cambiando datos a usuario");
    }

    saveLiberacion = (e) => {
        this.changeState();
        if(this.state.liberacion.registroSS && this.state.liberacion.registroSS != null && this.state.liberacion.registroSS != undefined){
            if(this.state.liberacion.programaSS && this.state.liberacion.programaSS != null && this.state.liberacion.programaSS != undefined){
                if(this.state.liberacion.prestatario && this.state.liberacion.prestatario != null && this.state.liberacion.prestatario != undefined){
                    if(this.state.liberacion.telefono && this.state.liberacion.telefono != null && this.state.liberacion.telefono != undefined){
                        if(this.state.liberacion.fechaInicio && this.state.liberacion.fechaInicio != null && this.state.liberacion.fechaInicio != undefined){
                            if(this.state.liberacion.fechaTermino && this.state.liberacion.fechaTermino != null && this.state.liberacion.fechaTermino != undefined){
                                axios.post(this.url + "liberacionExtemporanea/save", this.state.liberacion)
                                    .then(res => {
                                        this.setState({
                                                status: "true"
                                            });
                                        })
                            }else{
                                this.setState(
                                    {
                                        statusFechaTermino: "false"
                                    }
                                );
                            }//Fin de else Fecha de Termino
                        }else{
                            this.setState(
                                {
                                    statusFechaInicio: "false"
                                }
                            );
                        }//Fin de else Fecha de Inicio
                    }else{
                        this.setState(
                            {
                                statusTelefono: "false"
                            }
                        );
                    }//Fin de else Telefono
                }else{
                    this.setState(
                        {
                            statusPrestatario: "false"
                        }
                    );
                }//Fin de else Prestatario
            }else{
                this.setState(
                    {
                        statusPrograma: "false"
                    }
                );
            }//Fin de else Programa de SS
        }else{
            this.setState(
                {
                    statusRegistro: "false"
                }
            );
        }//Fin de else Numero de Registro de SS
    }//Fin de funcion saveLiberacion()
    render() {
        if(this.state.status == 'true'){
            window.location.href = './CrearLiberacion';
        }

        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                        <div id="sidebar" className="liberacionLeft">
                            <div>
                               <label htmlFor="registroSS" className="text_login">Número de Registro Servicio Social</label>
                                <input type="text" className="input_login" name="registroSS" placeholder="Ingresa el número de registro del servicio social" ref={this.registroSSRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusRegistro){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa tu número de registro de Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}     
                            </div>
                            <div>
                                <label htmlFor="programaSS" className="text_login">Programa de Servicio Social</label>
                                <input type="text" className="input_login" name="programaSS" placeholder="Ingresa el nombre del programa de servicio social" ref={this.programaSSRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusPrograma){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa el programa al que perteneces!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="prestatario" className="text_login">Prestatario</label>
                                <input type="text" className="input_login" className="input_login" name="prestatario" placeholder="Ingresa el nombre de la Institución/Empresa/etc. donde realizas tu servicio social" ref={this.prestatarioRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusPrestatario){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa el nombre de la unidad donde realizas Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                        break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="telefono" className="text_login">Número Telefónico</label>
                                <input type="text"  className="input_login" name="telefono" placeholder="Ingresa tu número telefónico" ref={this.telefonoRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusTelefono){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa tu número Telefónico!</a>
                                        );
                                        break;
                                        default:
                                        break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="fechaInicio" className="text_login">Fecha de Inicio</label>
                                <input type="date" className="input_login" name="fechaInicio" ref={this.fechaInicioRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusFechaInicio){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa la Fecha de Inicio de tu Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="FechaTermino" className="text_login">Fecha de Término</label>
                                <input type="date" className="input_login" name="fechaTermino" ref={this.fechaTerminoRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusFechaTermino){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa la Fecha de Término de tu Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}
                            </div>
                            <br/>
                            {(() => {
                                switch(this.state.estado){   
                                    case "NUEVO":
                                    return (
                                        <button className="btn" onClick = {this.saveLiberacion}>Aceptar</button>
                                    );
                                    break;
                                    case undefined:
                                    return (
                                        <button className="btn" onClick = {this.saveLiberacion}>Aceptar</button>
                                    );
                                    break;
                                    case null:
                                    return (
                                        <button className="btn" onClick = {this.saveLiberacion}>Aceptar</button>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                          </div>
                          <SubirLiberacion/>
                          <VerDatosLiberacion/>
            </div>
        );
    }
}
export default Liberacion;

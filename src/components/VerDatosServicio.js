import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import PdfServicioAlumno from './PdfServicioAlumno';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class VerDatosServicio extends React.Component{

    url = Global.url;

    state = {
        servicio: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getServicio();
        }

        getServicio = () => {
            axios.get(this.url +"servicioSocial/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        servicio: res.data,
                        status: 'success'
                       });
            });
        }//Fin de funcion getServicio()
        
    render() {
        if(this.state.status == 'success'){
            if(this.state.servicio.semestre != "EGRESADO")
            {
                return(
                    <div className="center">
                            <div id="sidebar" className="servicioCenter">
                                {(() => {  
                                switch (this.state.servicio.estado){
                                case "NUEVO":
                                    return (
                                        <a id="state_new">NUEVO</a>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <a id="state_processing">EN PROCESO</a>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <a id="state_finished">FINALIZADO</a>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <a id="state_rejected">RECHAZADO</a>
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div >
                                    <strong>Responsable Directo:</strong> {this.state.servicio.responsableDirecto}
                                </div>
                                <div >
                                    <strong>Semestre:</strong> {this.state.servicio.semestre}
                                </div>
                                <br/>
                                <PdfServicioAlumno
                                    responsable={this.state.servicio.responsableDirecto}
                                    redaccion={" alumno del " + this.state.servicio.semestre + " semestre "}
                                    email={this.state.email}
                                    idAlumno={this.state.idAlumno}
                                    />
                            </div>          
                </div>
                );
            }else{
                return(
                    <div className="center">
                            <div id="sidebar" className="servicioCenter">
                            {(() => {  
                                switch (this.state.servicio.estado){
                                case "NUEVO":
                                    return (
                                        <a id="state_new">NUEVO</a>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <a id="state_processing">EN PROCESO</a>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <a id="state_finished">FINALIZADO</a>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <a id="state_rejected">RECHAZADO</a>
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div >
                                    <strong>Responsable Directo:</strong> {this.state.servicio.responsableDirecto}
                                </div>
                                <div >
                                    <strong>Soy Egresado</strong>
                                </div>
                                <br/>
                                <PdfServicioAlumno
                                    responsable={this.state.servicio.responsableDirecto}
                                    redaccion={" egresado "}
                                    email={this.state.email}
                                    idAlumno={this.state.idAlumno}
                                    />
                            </div>
                </div>
                );
            }
        }else{ 
            return(
                <div className="center">
                        <div id="sidebar" className="servicioCenter">
                            <div >
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación SERVICIO SOCIAL.</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosServicio

export default VerDatosServicio;
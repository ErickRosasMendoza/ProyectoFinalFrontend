import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Cookies from 'universal-cookie';
import PdfLiberacionAlumno from './PdfLiberacionAlumno';

const cookies = new Cookies();

class VerDatosLiberacion extends React.Component{

    url = Global.url;

    state = {
        liberacionExtemporanea: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getLiberacion();
        }

        getLiberacion = () => {
            axios.get(this.url +"liberacionExtemporanea/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        liberacionExtemporanea: res.data,
                        status: 'success'
                       });
            });
        }//Fin de funcion getLiberacion()
        
    render() {
        if(this.state.status == 'success'){
                return(
                    <div className="center">
                            <div id="sidebar" className="liberacionCenter">
                                {(() => {  
                                switch (this.state.liberacionExtemporanea.estado){
                                case "NUEVO":
                                    return (
                                        <a id="state_new">NUEVO</a>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_processing">EN PROCESO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.liberacionExtemporanea.revisado}
                                        </div>
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_finished">TERMINADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.liberacionExtemporanea.revisado}
                                        </div>
                                        </React.Fragment>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_rejected">RECHAZADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.liberacionExtemporanea.revisado}
                                        </div>
                                        </React.Fragment> 
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div>
                                    <strong>Fecha de Registro:</strong> {this.state.liberacionExtemporanea.fechaRegistro}
                                </div>
                                <div>
                                <strong>Registro de Servicio Social:</strong> {this.state.liberacionExtemporanea.registroSS}
                                </div>
                                <div>
                                <strong>Programa de ServicioSocial:</strong> {this.state.liberacionExtemporanea.programaSS}
                                </div>
                                <div>
                                <strong>Prestatario:</strong> {this.state.liberacionExtemporanea.prestatario}
                                </div>
                                <div>
                                <strong>Número Telefónico:</strong> {this.state.liberacionExtemporanea.telefono}
                                </div>
                                <div>
                                <strong>Fecha de Inicio:</strong> {this.state.liberacionExtemporanea.fechaInicio}
                                </div>
                                <div>
                                <strong>Fecha de Término:</strong> {this.state.liberacionExtemporanea.fechaTermino}
                                </div>
                                <div>
                                <strong>EGRESADO</strong>
                                </div>
                                <br/>
                                <PdfLiberacionAlumno
                                registroSS={this.state.liberacionExtemporanea.registroSS}
                                programaSS={this.state.liberacionExtemporanea.programaSS}
                                prestatario={this.state.liberacionExtemporanea.prestatario}
                                fechaInicio={this.state.liberacionExtemporanea.fechaInicio}
                                fechaTermino={this.state.liberacionExtemporanea.fechaTermino}
                                telefono={this.state.liberacionExtemporanea.telefono}
                                redaccion={" egresado "}
                                email={this.state.email}
                                idAlumno={this.state.idAlumno}
                                />  
                            </div>          
                </div>
                );
        }else{
            return(
                <div className="center">
                        <div id="sidebar" className="liberacionCenter">
                            <div>
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación LIBERACION EXTEMPORANEA.</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosLiberacion

export default VerDatosLiberacion;
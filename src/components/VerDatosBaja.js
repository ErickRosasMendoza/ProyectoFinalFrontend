import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Cookies from 'universal-cookie';
import PdfBajaAlumno from './PdfBajaAlumno';

const cookies = new Cookies();

class VerDatosBaja extends React.Component{

    url = Global.url;

    state = {
        tipoBaja: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getBaja();
        }

        getBaja = () => {
            axios.get(this.url +"solicitudBaja/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        tipoBaja: res.data,
                        status: 'success'
                       });
                       console.log(this.state.tipoBaja.tipoBaja)
            });
        }//Fin de funcion getBaja()
        
    render() {
        if(this.state.status == 'success'){
            if(this.state.tipoBaja.egresado == false){
                return(
                    <div className="center">
                            <div id="sidebar" className="bajaCenter">
                            {(() => {  
                            switch (this.state.tipoBaja.estado){
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
                                    <a id="state_finished">TERMINADO</a>   
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
                                    <strong>Registro de Servicio Social:</strong> {this.state.tipoBaja.registroSS}
                                </div>
                                <div >
                                    <strong>Programa de ServicioSocial:</strong> {this.state.tipoBaja.programaSS}
                                </div>
                                <div >
                                    <strong>Prestatario:</strong> {this.state.tipoBaja.prestatario}
                                </div>
                                <div >
                                    <strong>Fecha de Inicio:</strong> {this.state.tipoBaja.fechaInicio}
                                </div>
                                <div >
                                    <strong>Fecha de Término:</strong> {this.state.tipoBaja.fechaTermino}
                                </div>
                                <div >
                                    <strong>Tipo de Baja:</strong> {this.state.tipoBaja.tipoDeBaja}
                                </div>
                                <div >
                                    <strong>Semestre:</strong> {this.state.tipoBaja.semestre}
                                </div>
                                <br/>
                                <PdfBajaAlumno
                                registroSS={this.state.tipoBaja.registroSS}
                                programaSS={this.state.tipoBaja.programaSS}
                                prestatario={this.state.tipoBaja.prestatario}
                                fechaInicio={this.state.tipoBaja.fechaInicio}
                                fechaTermino={this.state.tipoBaja.fechaTermino}
                                baja={this.state.tipoBaja.tipoDeBaja}
                                horas={this.state.tipoBaja.horas}
                                redaccion={" alumno del " + this.state.tipoBaja.semestre + " semestre "}
                                email={this.state.email}
                                idAlumno={this.state.idAlumno}
                                />
                            </div>          
                </div>
                );
            }else{
                return(
                    <div className="center">
                            <div id="sidebar" className="bajaCenter">
                                {(() => {  
                                switch (this.state.tipoBaja.estado){
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
                                        <a id="state_finished">TERMINADO</a>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <a id="state_rejected">RECHAZADO</a>
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div>
                                    <strong>Registro de Servicio Social:</strong> {this.state.tipoBaja.registroSS}
                                </div>
                                <div>
                                    <strong>Programa de ServicioSocial:</strong> {this.state.tipoBaja.programaSS}
                                </div>
                                <div>
                                    <strong>Prestatario:</strong> {this.state.tipoBaja.prestatario}
                                </div>
                                <div >
                                    <strong>Fecha de Inicio:</strong> {this.state.tipoBaja.fechaInicio}
                                </div>
                                <div >
                                    <strong>Fecha de Término:</strong> {this.state.tipoBaja.fechaTermino}
                                </div>
                                <div >
                                    <strong>Tipo de Baja:</strong> {this.state.tipoBaja.tipoDeBaja}
                                </div>
                                <div >
                                    <strong>Egresado</strong>
                                </div>
                                <br/>
                                <PdfBajaAlumno
                                registroSS={this.state.tipoBaja.registroSS}
                                programaSS={this.state.tipoBaja.programaSS}
                                prestatario={this.state.tipoBaja.prestatario}
                                fechaInicio={this.state.tipoBaja.fechaInicio}
                                fechaTermino={this.state.tipoBaja.fechaTermino}
                                baja={this.state.tipoBaja.tipoDeBaja}
                                horas={this.state.tipoBaja.horas}
                                redaccion={" egresado "}
                                email={this.state.email}
                                idAlumno={this.state.idAlumno}
                                />  
                            </div>          
                </div>
                );
            }//Fin de else egresado
        }else{
            return(
                <div className="center">
                        <div id="sidebar" className="bajaCenter">
                            <div >
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación BAJA DE SERVICIO SOCIAL.</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosBaja

export default VerDatosBaja;
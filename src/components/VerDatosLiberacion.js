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
            if(this.state.liberacionExtemporanea.egresado == false){
                return(
                    <div className="center">
                            <div id="sidebar" className="liberacionCenter">
                                <div className="text_login">
                                   Registro de Servicio Social: {this.state.liberacionExtemporanea.registroSS}
                                </div>
                                <div className="text_login">
                                    Programa de ServicioSocial: {this.state.liberacionExtemporanea.programaSS}
                                </div>
                                <div className="text_login">
                                    Prestatario: {this.state.liberacionExtemporanea.prestatario}
                                </div>
                                <div className="text_login">
                                    Número Telefónico: {this.state.liberacionExtemporanea.telefono}
                                </div>
                                <div className="text_login">
                                    Fecha de Inicio: {this.state.liberacionExtemporanea.fechaInicio}
                                </div>
                                <div className="text_login">
                                    Fecha de Término: {this.state.liberacionExtemporanea.fechaTermino}
                                </div>
                                <div className="text_login">
                                    Egresado: No, No soy EGRESADO
                                </div>
                                <div className="text_login">
                                    Semestre: {this.state.liberacionExtemporanea.semestre}
                                </div>
                                <br/>
                                <PdfLiberacionAlumno
                                registroSS={this.state.liberacionExtemporanea.registroSS}
                                programaSS={this.state.liberacionExtemporanea.programaSS}
                                prestatario={this.state.liberacionExtemporanea.prestatario}
                                fechaInicio={this.state.liberacionExtemporanea.fechaInicio}
                                fechaTermino={this.state.liberacionExtemporanea.fechaTermino}
                                redaccion={" alumno del " + this.state.liberacionExtemporanea.semestre + " semestre "}
                                telefono={this.state.liberacionExtemporanea.telefono}
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
                                <div className="text_login">
                                   Registro de Servicio Social: {this.state.liberacionExtemporanea.registroSS}
                                </div>
                                <div className="text_login">
                                    Programa de ServicioSocial: {this.state.liberacionExtemporanea.programaSS}
                                </div>
                                <div className="text_login">
                                    Prestatario: {this.state.liberacionExtemporanea.prestatario}
                                </div>
                                <div className="text_login">
                                    Número Telefónico: {this.state.liberacionExtemporanea.telefono}
                                </div>
                                <div className="text_login">
                                    Fecha de Inicio: {this.state.liberacionExtemporanea.fechaInicio}
                                </div>
                                <div className="text_login">
                                    Fecha de Término: {this.state.liberacionExtemporanea.fechaTermino}
                                </div>
                                <div className="text_login">
                                    Egresado: Sí, Sí soy EGRESADO
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
            }//Fin de else egresado
        }else{
            return(
                <div className="center">
                        <div id="sidebar" className="liberacionCenter">
                            <div className="text_login">
                                No tienes datos disponibles, registralos para empezar con tu documentación LIBERACION EXTEMPORANEA.
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosLiberacion

export default VerDatosLiberacion;
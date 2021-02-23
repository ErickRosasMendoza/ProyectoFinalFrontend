import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Cookies from 'universal-cookie';
import PdfDictamenAlumno from './PdfDictamenAlumno';

const cookies = new Cookies();

class VerDatosDictamen extends React.Component{

    url = Global.url;

    state = {
        dictamen: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getDictamen();
        }

        getDictamen = () => {
            axios.get(this.url +"dictamen/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        dictamen: res.data,
                        status: 'success'
                       });
            });
        }//Fin de funcion getDictamen()
        
    render() {
        if(this.state.status == 'success'){
            return(
                <div className="center">
                        <div id="sidebar" className="dictamenCenter">
                        {(() => {  
                        switch (this.state.dictamen.estado){
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
                            <div className="text_login">
                                <strong>Procentaje de creditos:</strong> {this.state.dictamen.porcentajeCreditos}%
                            </div>
                            <div className="text_login">
                                <strong>Semestre:</strong> {this.state.dictamen.semestre}
                            </div>
                            <br/>
                            <PdfDictamenAlumno
                            creditos={this.state.dictamen.porcentajeCreditos}
                            semestre={this.state.dictamen.semestre}
                            email={this.state.email}
                            idAlumno={this.state.idAlumno}
                            />
                        </div>          
            </div>
            );
        }else{
            return(
                <div className="center">
                        <div id="sidebar" className="dictamenCenter">
                            <div className="text_login">
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación de DICTAMEN DE MENOS DE 70% DE CREDITOS.</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosDictamen

export default VerDatosDictamen;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

class AlumnoLiberacion extends React.Component{

    url = Global.url;

    estadoRef = React.createRef();

    state = {
        idAlumno: this.props.id,
        liberacion: {},
        alumno: {},
        statusLiberacion: null,
        cambioEstado: {},
        statusEstado: null,
    };

    changeState = () =>{
        this.setState({
            cambioEstado:{
                idAlumno:this.props.id,
                idLiberacion: this.state.liberacion.idLiberacion,
                telefono: this.state.liberacion.telefono,
                semestre: this.state.liberacion.semestre,
                egresado: this.state.liberacion.egresado,
                registroSS: this.state.liberacion.registroSS,
                prestatario: this.state.liberacion.prestatario,
                programaSS: this.state.liberacion.programaSS,
                fechaInicio: this.state.liberacion.fechaInicio,
                fechaTermino: this.state.liberacion.fechaTermino,
                estado: this.estadoRef.current.value
            }
        })
    }//Fin de ChangeState

        componentWillMount() {
            this.getAlumno();
            this.getLiberacion();
        }

        getAlumno = () => {
            axios.get(this.url +"alumno/find/"+ this.props.id)
            .then(response => {
            this.setState({
                alumno: response.data,
                status: 'success'
            });
            } );   
        }//Fin de getAlumno()
    
    getLiberacion = () => {
        axios.get(this.url +"liberacionExtemporanea/findIdAlumno/"+ this.props.id)
        .then(response => {
        this.setState({
            liberacion: response.data,
            statusLiberacion: 'success'
        });
        } );   
    }//Fin de getLiberacion()

    estado = () => {
        this.setState({
            statusEstado: "true"
        });
    }//Fin de estado

    cancelEstado = () => {
        this.setState({
            statusEstado: "false"
        });
    }//Fin de estado

    cambiarEstado = () => {
        this.changeState();
        axios.patch(this.url+"liberacionExtemporanea/update", this.state.cambioEstado)
        .then(res =>{
            this.getLiberacion();
        });
    }//Fin de Cambiar Estado
    
    render(){
        if(this.state.statusLiberacion == 'success'){
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                        <th className="table_lista">Semestre</th>
                        <th className="table_lista">Registro de Servicio Social</th>
                        <td className="table_lista">Estado de la Solicitud</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                        <td className="table_lista">{this.state.liberacion.semestre}</td>
                        <td className="table_lista">{this.state.liberacion.registroSS}</td>
                        <td className="table_lista">{(() => {  
                                switch (this.state.liberacion.estado){
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
                                })()}</td>
                    </tr>
                </tbody>
{/*                <div id="sidebar" className="archivosAdminRight">
                    <div>
                        <button className="btn_join" onClick={this.estado}>Cambiar Estado</button>
                        {(() => {  
                                    switch (this.state.statusEstado){
                                    case "true":
                                    return (
                                            <div className="table_watch">
                                                <label htmlFor="estado">Actualizar Estado</label>
                                                <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                                                    <option value="NUEVO">NUEVO</option>
                                                    <option value="PROCESANDO">EN PROCESO</option>
                                                    <option value="FINALIZADO">FINALIZADO</option>
                                                    <option value="RECHAZADO">RECHAZADO</option>
                                                    </select>
                                                <button className="btn_join" onClick={this.cambiarEstado}>Actualizar</button>
                                                <button id="btn_delete" onClick={this.cancelEstado}>Cancelar</button>
                                                </div>
                                                    );
                                                break;
                                                default: break;
                                                }
                                            })()}
                    </div>
                    <div>
                        <strong>Programa de Servicio Social:</strong> {this.state.liberacion.programaSS}
                    </div>
                    <div>
                        <strong>Prestatario:</strong> {this.state.liberacion.prestatario}
                    </div>
                    <div>
                        <strong>Fecha de Inicio:</strong> {this.state.liberacion.fechaInicio}
                    </div>
                    <div>
                        <strong>Fecha de Término:</strong> {this.state.liberacion.fechaTermino}
                    </div>
                    <div>
                        <strong>Número Telefónico:</strong> {this.state.liberacion.telefono}
                    </div>
                </div>*/} 
            </div>
        );
    }else if(this.state.statusLiberacion != 'success'){
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                        <th className="table_lista">Semestre</th>
                        <th className="table_lista">Registro de Servicio Social</th>
                        <td className="table_lista">Estado de la Solicitud</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                        <td className="table_lista">SIN REGISTRO</td>
                        <td className="table_lista">SIN REGISTRO</td>
                        <td className="table_lista">SIN REGISTRO</td>
                    </tr>
                </tbody>
{/*                 <div id="sidebar" className="archivosAdminRight">
                    <strong>Este alumno aun no tiene información registrada para este tramite.</strong>
                </div>*/}
            </div> 
        );   
    }else{
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                        <th className="table_lista">Semestre</th>
                        <th className="table_lista">Registro de Servicio Social</th>
                        <td className="table_lista">Estado de la Solicitud</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                        <td className="table_lista">Cargando...</td>
                        <td className="table_lista">Cargando...</td>
                        <td className="table_lista">Cargando...</td>
                    </tr>
                </tbody>
 {/*               <div id="sidebar" className="archivosAdminRight">
                    <strong>Cargando...</strong>
                </div>*/}
            </div>
        );
    }
}//Fin de Render ()
}//Fin de Classs AlumnoLiberacion
export default AlumnoLiberacion;
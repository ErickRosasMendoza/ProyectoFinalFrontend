import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import DirectorioAdmin from './DirectorioAdmin'
import DirectorioArchivosAlumno from './DirectorioArchivosAlumno'

class AlumnoDictamen extends React.Component{

    estadoRef = React.createRef();

    url = Global.url;


    state = {
        idAlumno: this.props.id,
        dictamen: {},
        alumno: {},
        statusDictamen: null,
        cambioEstado: {},
        statusEstado: null,
    };

    changeState = () =>{
        this.setState({
            cambioEstado:{
                idAlumno:this.props.id,
                idDictamen: this.state.dictamen.idDictamen,
                semestre: "SEPTIMO",
                porcentajeCreditos: this.state.dictamen.porcentajeCreditos,
                estado: this.estadoRef.current.value
            }
        })
    }//Fin de ChangeState

        componentWillMount() {
            this.getDictamen();
            this.getAlumno();
        }
       
        
        getAlumno = () => {
            axios.get(this.url +"alumno/find/"+ this.props.id)
            .then(response => {
            this.setState({
                alumno: response.data,
            });
            } );   
        }//Fin de getAlumno()
    
    getDictamen = () => {
        axios.get(this.url +"dictamen/findIdAlumno/"+ this.props.id)
        .then(response => {
        this.setState({
            dictamen: response.data,
            statusDictamen: 'success'
        });
        } );   
    }//Fin de getDictamen()

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
        axios.post(this.url+"dictamen/update", this.state.cambioEstado)
        .then(res =>{
            this.getDictamen();
        });
    }//Fin de Cambiar Estado

    render(){
        if(this.state.statusDictamen == 'success'){
            return(
                <div className="center">
                    <tbody>
                        <tr >
                            <th className="table_lista">Alumno</th>
                            <th className="table_lista">Boleta</th>
                            <th className="table_lista">Programa Academico</th>
                            <th className="table_lista">Semestre</th>
                            <th className="table_lista">Prorcentaje Creditos</th>
                            <th className="table_lista">Estado de la Solicitud</th>   
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                            <td className="table_lista">{this.state.alumno.boleta}</td> 
                            <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                            <td className="table_lista">{this.state.dictamen.semestre}</td>
                            <td className="table_lista">{this.state.dictamen.porcentajeCreditos}</td>
                            <td className="table_lista">{(() => {  
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
                                })()}</td>
                        </tr>
                    </tbody>
{/*                    <div id="sidebar" className="archivosAdminRight">
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
                    </div>*/} 
                </div>
            );
        }else if(this.state.statusDictamen != 'success'){
            return(
                <div className="center">
                    <tbody>
                        <tr >
                            <th className="table_lista">Alumno</th>
                            <th className="table_lista">Boleta</th>
                            <th className="table_lista">Programa Academico</th>
                            <th className="table_lista">Semestre</th>
                            <th className="table_lista">Prorcentaje Creditos</th> 
                            <th className="table_lista">Estado de la Solicitud</th> 
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
                            <th className="table_lista">Prorcentaje Creditos</th>  
                            <th className="table_lista">Estado de la Solicitud</th>
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
                </div>
            );
        }
}//Fin de Render ()
}//Fin de Classs AlumnoDictamen
export default AlumnoDictamen;
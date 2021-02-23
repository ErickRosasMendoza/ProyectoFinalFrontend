import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

class AlumnoDictamen extends React.Component{

    url = Global.url;

    state = {
        idAlumno: this.props.id,
        dictamen: {},
        alumno: {},
        statusDictamen: null,
    };
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
        }else if(this.state.listar.length == 0 && this.state.statusDictamen != 'success'){
            return(
                <div className="center">
                <DirectorioAdmin />
                    <tbody>
                        <tr >
                            <th className="table_lista">Alumno</th>
                            <th className="table_lista">Boleta</th>
                            <th className="table_lista">Programa Academico</th>
                            <th className="table_lista">Semestre</th>
                            <th className="table_lista">Prorcentaje Creditos</th>  
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista">{this.state.alumno.nombre} {this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno}</td>
                            <td className="table_lista">{this.state.alumno.boleta}</td> 
                            <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                            <td className="table_lista">SIN REGISTRO</td>
                            <td className="table_lista">SIN REGISTRO</td>
                        </tr>
                    </tbody>
                    <br/>
                    <DirectorioArchivosAlumno
                    idAlumno={this.state.idAlumno}
                    />
                    <div id="sidebar" className="dictamenAdminCenter">
                        Este alumno aun no tiene archivos registrados
                    </div>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

class AlumnoBaja extends React.Component{

    estadoRef = React.createRef();

    url = Global.url;

    state = {
        idAlumno: this.props.id,
        tipoBaja: {},
        alumno: {},
        cambioEstado: {},
        statusTipoBaja: null,
        statusEstado: null,
    };

    changeState = () =>{
        this.setState({
            cambioEstado:{
                idAlumno:this.props.id,
                idSolicitud: this.state.tipoBaja.idSolicitud,
                tipoDeBaja: this.state.tipoBaja.tipoDeBaja,
                horas: this.state.tipoBaja.horas,
                semestre: this.state.tipoBaja.semestre,
                egresado: this.state.tipoBaja.egresado,
                registroSS: this.state.tipoBaja.registroSS,
                prestatario: this.state.tipoBaja.prestatario,
                programaSS: this.state.tipoBaja.programaSS,
                fechaInicio: this.state.tipoBaja.fechaInicio,
                fechaTermino: this.state.tipoBaja.fechaTermino,
                estado: this.estadoRef.current.value
            }
        })
    }//Fin de ChangeState

      componentWillMount() {
           this.getAlumno();
           this.getTipoBaja();
        }
        getAlumno = () => {
            axios.get(this.url +"alumno/find/"+ this.props.id)
            .then(response => {
            this.setState({
                alumno: response.data,
            });
            } );   
        }//Fin de getAlumno()
    
    getTipoBaja = () => {
        axios.get(this.url +"solicitudBaja/findIdAlumno/"+ this.props.id)
        .then(response => {
        this.setState({
            tipoBaja: response.data,
            statusTipoBaja: 'success'
        });
        } );   
    }//Fin de getTipoBaja()

    deleteTipoBaja = () => {
        axios.delete(this.url+"solicitudBaja/delete/"+this.props.id)
        .then(res => {
            window.location.href = "./" + this.props.id
        })
    }//Fin de deleteTipoBaja
    
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
        axios.patch(this.url+"solicitudBaja/update", this.state.cambioEstado)
        .then(res =>{
            this.getTipoBaja();
        });
    }//Fin de Cambiar Estado

    render(){
        if(this.state.statusTipoBaja == 'success'){
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                        <th className="table_lista">Estado de la Solicitud</th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                        <td className="table_lista">{(() => {  
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
                                })()}</td>
                                <td>
                                <input type="checkbox" id="btn-modal"/>
                                <label htmlFor="btn-modal" className="btn">MAS INFORMACIÓN</label>
                                <div className="modal">
                                <div className="contenedor">
                                    <h1>Baja de Servicio Social</h1>
                                    <label htmlFor="btn-modal">X</label>
                                    <div className="contenido">
                                    <div>
                                        <strong>Semestre:</strong> {this.state.tipoBaja.semestre}
                                    </div>
                                    <div>
                                        <strong>Registro de Servicio Social:</strong> {this.state.tipoBaja.registroSS}
                                    </div>
                                    <div>
                                        <strong>Tipo de Baja:</strong> {this.state.tipoBaja.tipoDeBaja}
                                    </div>
                                    <div>
                                        <strong>Horas:</strong> {this.state.tipoBaja.horas}
                                    </div>
                                    <div>
                                        <strong>Programa de Servicio Social:</strong> {this.state.tipoBaja.programaSS}
                                    </div>
                                    <div>
                                        <strong>Prestatario:</strong> {this.state.tipoBaja.prestatario}
                                    </div>
                                    <div>
                                        <strong>Fecha de Inicio:</strong> {this.state.tipoBaja.fechaInicio}
                                    </div>
                                    <div>
                                        <strong>Fehcta de Término:</strong> {this.state.tipoBaja.fechaTermino}
                                    </div>
                                    <br/>
                                    <button className="btn_join" onClick={this.estado}>Cambiar Estado</button>
                                    <br/><br/>
                                {(() => {  
                                    switch (this.state.statusEstado){
                                    case "true":
                                    return (
                                        <div className="center">
                                                <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                                                    <option value="NUEVO">NUEVO</option>
                                                    <option value="PROCESANDO">EN PROCESO</option>
                                                    <option value="FINALIZADO">FINALIZADO</option>
                                                    <option value="RECHAZADO">RECHAZADO</option>
                                                    </select>
                                                <br/><br/>
                                                <button className="btn_join" onClick={this.cambiarEstado}>Actualizar</button>
                                                <button id="btn_delete" onClick={this.cancelEstado}>Cancelar</button>
                                                <br/>
                                                </div>
                                                    );
                                                break;
                                                default: break;
                                                }
                                            })()}
                                            <br/>
                                            <button id="btn_deleteRegistro" onClick={this.deleteTipoBaja}>Borrar Registro</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                    </tr>
                </tbody>
            </div>
        );
    }else if(this.state.statusTipoBaja != 'success'){
        return(
            <div className="center">
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                        <th className="table_lista">Estado de la Solicitud</th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
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
                        <th className="table_lista">Estado de la Solicitud</th>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td> 
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                        <td className="table_lista">Cargando...</td>
                    </tr>
                </tbody>
            </div>
        );
    }
}//Fin de Render ()
}//Fin de Classs AlumnoBaja
export default AlumnoBaja;
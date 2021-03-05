import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Global from '../Global';
import DirectorioAdmin from './DirectorioAdmin';
class BuscarDictamenAlumnos extends Component{

    estadoRef = React.createRef();

    url = Global.url;

    idAlumnoRef = React.createRef();

    state = {
        dictamenes: [],
        status: null,
        statusEstado: null,
        estado: null
    };

    componentWillMount() {
        this.getDictamenes();
    }

    getDictamenes = () => {
        axios.get(this.url+"dictamen/findAll")
            .then(response => {
                this.setState({
                    dictamenes: response.data,
                    status: 'success',
                    statusEstado: "TODOS"
                });
            });
    }//Fin de getDictamenes

    changeState = () =>{
        this.setState({
            estado: this.estadoRef.current.value
        });
    }

    cambiarEstado = () =>{
        if(this.state.estado === "NUEVO"){
            this.getNew();
        }else if(this.state.estado === "PROCESANDO"){
            this.getProcessing();
        }else if(this.state.estado === "FINALIZADO"){
            this.getFinished();
        }else if(this.state.estado === "RECHAZADO"){
            this.getRejected();
        }else if(this.state.estado === "TODOS"){
            this.getDictamenes();
        }
    }

    getNew = () => {
        axios.get(this.url+"dictamen/findEstado/NUEVO")
            .then(response => {
                this.setState({
                    dictamenes: response.data,
                    status: 'success',
                    statusEstado: "NUEVO"
                });
            });
    }//Fin de getNew

    getProcessing = () => {
        axios.get(this.url+"dictamen/findEstado/PROCESANDO")
            .then(response => {
                this.setState({
                    dictamenes: response.data,
                    status: 'success',
                    statusEstado: "PROCESANDO"
                });
            });
    }//Fin de getProcessing

    getFinished = () => {
        axios.get(this.url+"dictamen/findEstado/FINALIZADO")
            .then(response => {
                this.setState({
                    dictamenes: response.data,
                    status: 'success',
                    statusEstado: "FINALIZADO"
                });
            });
    }//Fin de getFinished

    getRejected = () => {
        axios.get(this.url+"dictamen/findEstado/RECHAZADO")
            .then(response => {
                this.setState({
                    dictamenes: response.data,
                    status: 'success',
                    statusEstado: "RECHAZADO"
                });
            });
    }//Fin de getFinish
    
render() {
    if(this.state.dictamenes.length >=1){        
       return (
        <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>DICTAMEN DE MENOS DE 70% DE CREDITOS</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
                <tbody>
                    <tr >
                        <th className="table_lista">Semestre</th>
                        <th className="table_lista">Porcentaje de Creditos</th>
                        <th className="table_lista">Estado de la Solicitud</th>
                    </tr>
                </tbody>
                {(() => {  
                                switch (this.state.statusEstado){
                                case "NUEVO":
                                    return (
                                        <React.Fragment>
                                        {this.state.dictamenes.map((dictamen, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{dictamen.semestre}</td>
                                                <td className="table_lista">{dictamen.porcentajeCreditos}</td>
                                                <td className="table_lista"><a id="state_new">NO REVISADO</a></td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + dictamen.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <React.Fragment>
                                        {this.state.dictamenes.map((dictamen, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{dictamen.semestre}</td>
                                                <td className="table_lista">{dictamen.porcentajeCreditos}</td>
                                                <td className="table_lista"><a id="state_processing">EN PROCESO</a></td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + dictamen.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        {this.state.dictamenes.map((dictamen, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{dictamen.semestre}</td>
                                                <td className="table_lista">{dictamen.porcentajeCreditos}</td>
                                                <td className="table_lista"><a id="state_finished">FINALIZADO</a></td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + dictamen.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                    break;
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        {this.state.dictamenes.map((dictamen, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{dictamen.semestre}</td>
                                                <td className="table_lista">{dictamen.porcentajeCreditos}</td>
                                                <td className="table_lista"><a id="state_rejected">RECHAZADO</a></td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + dictamen.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                case "TODOS":
                                    return(
                                        <React.Fragment>
                                        {this.state.dictamenes.map((dictamen, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{dictamen.semestre}</td>
                                                <td className="table_lista">{dictamen.porcentajeCreditos}</td>
                                                <td className="table_lista">{(() => {  
                                                        switch (dictamen.estado){
                                                        case "NUEVO":
                                                            return (
                                                                <a id="state_new">NO REVISADO</a>
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
                                                        })()}</td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + dictamen.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                default: 
                                    break;
                                }
                                })()}
        </React.Fragment>
    );
    }else if(this.state.dictamenes.length == 0 && this.state.status == 'success'){
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>DICTAMEN DE MENOS DE 70% DE CREDITOS</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
                <h1>No hay alumnos registrados para esta solicitud</h1>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>DICTAMEN DE MENOS DE 70% DE CREDITOS</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
                <h1>Cargando... espere un momento</h1>
            </React.Fragment>
        );
    }
    }//Fin de Render
}//Fin de Class BuscarDictamenAlumnos
export default BuscarDictamenAlumnos;
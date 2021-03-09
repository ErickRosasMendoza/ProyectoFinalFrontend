import React from 'react';
import axios from 'axios';
import Global from '../Global';
import DirectorioAdmin from './DirectorioAdmin';
import { Link } from 'react-router-dom';
import { Alert } from 'bootstrap';
import RecuperacionContraseña from './RecuperacionContraseña';

class BuscarBoleta extends React.Component {

    url = Global.url;

    boletaRef = React.createRef();

    state = {
        alumno: {},
        boleta:"",
        status: null,
        statusBoleta: null
    };

    changeState = () => {
        this.setState({
            boleta: this.boletaRef.current.value
        });
    }

    searchBoleta = (e) => {
        this.changeState();
        if(this.boletaRef.current.value && this.boletaRef.current.value != null && this.boletaRef.current.value != undefined)
        {
            axios.get(this.url + "alumno/findBoleta/" + this.state.boleta)
            .then(res => {
            this.setState(
                {
                    alumno:res.data,
                    status: 'success',
                    statusBoleta: "true"     
                });
            })
            .catch(error => {
                this.setState({
                    statusBoleta: "false"
                    });
            });
        }else{
            this.setState({
                    statusBoleta: "false",
                    status: "false"     
                });
        }
        
    }//Fin de searchBoleta

    render() {

        if(this.state.status == 'success'){
            return (
                <div className="center">
                    <DirectorioAdmin />
                            <div className="form-group" >
                                <label htmlFor="nombre" className="text_login">Buscar por Boleta</label>
                                <input type="text"  className="input_login" placeholder="Ingrese aquí el número de boleta" name="nombre" ref={this.boletaRef} onChange={this.changeState} />
                            </div>
                            {(() => {
                                switch (this.state.statusBoleta) {
                               case "false":
                                   return (
                                       <a className="warning_search">¡Boleta incorrecta!</a>
                                   );
                                   break;
                                default:
                                    break;
                                }
                             })()}
                             <br/>
                           <button className="btn"  onClick = {this.searchBoleta}>BUSCAR</button>
                           <br/><br/>
                                    <tbody >
                                        <tr >
                                            <th className="table_lista">Alumno</th>
                                            <th className="table_lista">Boleta</th>
                                            <th className="table_lista">Programa Academico</th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                                            <td className="table_lista">{this.state.alumno.boleta}</td>
                                            <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                                            <td><Link to={'/DirectorioArchivosAlumno/' + this.state.alumno.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            <td>
                                                <RecuperacionContraseña
                                                id={this.state.alumno.idUsuario}/>
                                            </td>
                                        </tr>
                                    </tbody>
                </div>
            );
        }

        return (
            <div className="center">
                <DirectorioAdmin />
                        <div className="form-group" >
                            <label htmlFor="nombre" className="text_login">Buscar por Boleta</label>
                            <input type="text"  className="input_login" name="nombre" placeholder="Ingrese aquí el número de boleta" ref={this.boletaRef} onChange={this.changeState} />
                            {(() => {
                                switch (this.state.statusBoleta) {
                               case "false":
                                   return (
                                       <a className="warning_search">¡Boleta incorrecta!</a>
                                   );
                                   break;
                                default:
                                    break;
                                }
                             })()}
                        </div>
                        <br/>
                       <button className="btn" onClick = {this.searchBoleta}>BUSCAR</button>
            </div>
        );
    }//Fin de Render
}//Fin de Buscar Boleta
export default BuscarBoleta;
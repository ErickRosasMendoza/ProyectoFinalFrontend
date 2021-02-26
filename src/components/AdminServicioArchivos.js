import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import BorrarDoc from './BorrarDoc';
import ActualizarComentario from './ActualizarComentario';

class AdminServicioArchivos extends React.Component {

    url = Global.url;
    
    comentarioRef=React.createRef();

    state = {
        idAlumno: this.props.id,
        statusArchivo: null,
        file: null,
        status: null,
        lista: {},
        listar:[],
        fileName: "",
        comentar: ""
    };

    componentWillMount = () => {
        this.getLista();
    } 

    changeState = () => {
        this.setState({
            comentar: this.comentarioRef.current.value
        });
    }

    fileChange = (event) => {
       this.setState({
            file: event.target.files[0]
        });
    }

    getLista = () => {
        axios.get(this.url + "lista/findServicio/" + this.props.id)
            .then(response => {
                this.setState({
                    listar: response.data,
                });
            });
    }

    guardarLista = async (e) => {
        await axios.post(this.url + "lista/save", this.state.lista)
        .then(res => {
            this.setState({
                status: "true"
            });
        });
    }

    upLoad = () => {
        if(this.state.file && this.state.file != null && this.state.file != undefined){
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
                axios.post(this.url + "docServicio/upload/" + this.state.file.name + this.props.id, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: this.props.id,
                                nombreDoc: res.data,
                                idTramite: 4,
                                idDoc: res.data + this.props.id,
                                comentario: this.state.comentar
                            },
                            statusArchivo: "true"
                        })
                        this.guardarLista();
                    });
        }else{
            this.setState({
                statusArchivo: "false"
            });
        }//Fin de else file
    }//Fin de funcion upLoad
    render() {
        if(this.state.status == "true"){
            window.location.href = './' + this.props.id;
        }
        if(this.state.listar.length >=1){
            return (
                <div className="center">
                            <div id="sidebar" className="archivosAdminCenter">
                            <strong>DOCUMENTACIÓN DE LIBERACIÓN EXTEMPORANEA</strong>
                                <div>
                                <br/>
                                    <tbody>
                                        <tr>
                                            <td className="table_lista"><strong>Archivo</strong></td>
                                            <td className="table_lista"><strong>Comentario</strong></td>
                                        </tr>
                                    </tbody>
                                    {this.state.listar.map((lista1, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{lista1.nombreDoc}</td>
                                                <td className="table_lista">{lista1.comentario}</td>
                                                <td><Link to={'/PdfServicio/' + lista1.idDoc}target="_blank" id="btn_watch">Ver Archivo</Link></td>
                                                <td><Link to={'/DocServicio/' + lista1.idDoc}target="_blank" id="btn_downLoad">Descargar</Link></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docServicio/deleteDoc/"
                                                redirect={lista1.idAlumno}
                                                /></td>
                                                <td><ActualizarComentario
                                                idLista={lista1.idLista}
                                                idAlumno= {lista1.idAlumno}
                                                idDoc={lista1.idDoc}
                                                idTramite={lista1.idTramite}
                                                nombreDoc={lista1.nombreDoc}
                                                comentario={lista1.comentario}
                                                /></td>
                                            </tr>
                                    </tbody>
                                    )}
                                    <br/>
                                    <a className="text_login">Subir Archivo</a>
                                    <input type="file" name = "file" onChange={this.fileChange} />
                                    {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()} 
                                </div>
                                <div>
                                    <label htmlFor="comentario" className="text_login">Comentario Informativo</label>
                                    <input type="text" className="input_login" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState}/>
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                            </div>
                </div>
            );
        }else if(this.state.listar.length == 0){
            return (
                <div className="center">
                            <div id="sidebar" className="archivosAdminCenter">
                                <div>
                                <strong>SIN DOCUMENTACION PARA COMENZAR SERVICIO SOCIAL</strong>
                                <br/>
                                <a className="text_login">Subir Archivo</a>
                                    <input type="file" name = "file"  onChange={this.fileChange} />
                                    {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()} 
                                </div>
                                <div>
                                    <label htmlFor="comentario" className="text_login">Comentario Informativo</label>
                                    <input type="text" className="input_login" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState}/>
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                            </div>
                </div>
            );
        }else{
            return (
            <div className="center">
                        <div id="sidebar" className="archivosAdminCenter">
                            <div>
                                Cargando... Espere un momento
                                <input type="file" name = "file" onChange={this.fileChange} />
                                {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()} 
                            </div>
                            <div>
                                <label htmlFor="comentario" className="text_login">Comentario Informativo</label>
                                <input type="text" className="input_login" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onClick={this.upLoad}/>
                            </div>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                        </div>
            </div>
        );
    }
    }//Fin de Render
}//Fin de Class AdminServicioArchivos
export default AdminServicioArchivos;

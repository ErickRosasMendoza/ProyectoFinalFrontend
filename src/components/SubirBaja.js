import React from 'react';
import { Redirect , Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Cookies from 'universal-cookie';
import BorrarDoc from './BorrarDoc';

const cookies = new Cookies();

class SubirBaja extends React.Component {

    url = Global.url;
    
    state = {
        idSolicitud: cookies.get('idAlumno'),
        statusArchivo: null,
        file: null,
        status: null,
        lista: {},
        listar:[],
        fileName: ""
    };

    componentWillMount = () => {
        this.getLista();
    } 

    fileChange = (event) => {
       this.setState({
            file: event.target.files[0]
        });
    }

    getLista = () => {
        axios.get(this.url+"lista/findBaja/" + this.state.idSolicitud)
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
                axios.post(this.url + "docBaja/upload/" + this.state.file.name + this.state.idSolicitud, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: cookies.get('idAlumno'),
                                nombreDoc: res.data,
                                idTramite: 3,
                                idDoc: res.data + this.state.idSolicitud,
                                comentario: "NUEVO"
                            }
                        })
                        this.guardarLista();
                    });
        }else{
            this.setState(
                {
                    statusArchivo: "false"
                }
            );
        }//Fin de else file
        
    }//Fin de funcion upLoad

/*    downLoad = () =>{
        const archivo = new FormData();
        axios.get("http://localhost:8080/file/getFile/5")
        .then(res =>{
            archivo.append('file', this.state.res, this.state.res.name);
            this.setState({
                file: this.archivo
            })
            console.log(this.state.file.name)
        });
    } */
    render() {
        if(this.state.status == 'true'){
            window.location.href = './CrearBaja';
        }
        if(this.state.listar.length >=1){
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                        <strong>DOCUMENTACIÓN BAJA DE SERVICIO SOCIAL</strong>
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
                                                <td><Link to={'/PdfBaja/' + lista1.idDoc}target="_blank" id="btn_watch">Visualizar</Link></td>
                                                <td><Link to={'/DocBaja/' + lista1.idDoc}target="_blank" id="btn_downLoad">Descargar</Link></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docBaja/deleteDoc/"
                                                redirect= "CrearBaja"
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
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()}  
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }else if(this.state.listar.length == 0){
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                            <div>
                                <strong>Aun no hay archivos guardados</strong>
                                <br/>
                                <a className="text_login">Subir Archivo</a>
                                <input type="file" name = "file" onChange={this.fileChange} />
                                {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}  
                            </div>
                            <br/>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }else{
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                            <div>
                                Cargando... Espere un momento
                                <input type="file" name = "file" onChange={this.fileChange} />
                                {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}    
                            </div>
                            <br/>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }
}//Fin de Render 
}//Fin de Class SubirBaja
export default SubirBaja;

import React from 'react';
import { Redirect,Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Cookies from 'universal-cookie';
import BorrarDoc from './BorrarDoc';

const cookies = new Cookies();

class SubirDictamen extends React.Component {

    url = Global.url;
    
    state = {
        idDictamen: cookies.get('idAlumno'),
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
        axios.get(this.url + "lista/v/" + this.state.idDictamen)
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
                axios.post(this.url + "docDictamen/upload/" + this.state.file.name + this.state.idDictamen, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: cookies.get('idAlumno'),
                                nombreDoc: res.data,
                                idTramite: 1,
                                idDoc: res.data + this.state.idDictamen,
                                comentario: ""
                            }
                        })
                        this.guardarLista();
                        alert("DOCUMENTO GUARDADO CON EXITO")
                    });
        }else{
            alert("SELECCIONA UN ARCHIVO PARA SUBIR")
            window.location.href = './CrearDictamen';
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

        //var lista = this.lista1.idLista;
        //var doc = this.lista1.idDoc;

        if(this.state.status == "true"){
            window.location.href = './CrearDictamen';
        }
        if(this.state.listar.length >=1){
            return (
                <div className="center">
                            <div id="sidebar" className="dictamenRight">
                                <div>
                                    {this.state.listar.map((lista1, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td>{lista1.nombreDoc}</td>
                                                <td><Link to={'/PdfDictamen/' + lista1.idDoc}target="_blank" id="btn_watch">Ver Archivo</Link></td>
                                                <td><Link to={'/DocDictamen/' + lista1.idDoc}target="_blank" id="btn_downLoad">Descargar</Link></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docDictamen/deleteDoc/"
                                                redirect= "CrearDictamen"
                                                /></td>
                                            </tr>
                                    </tbody>
                                    )}
                                    <input type="file" name = "file" onChange={this.fileChange} />
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                            </div>
                </div>
            );
        }else if(this.state.listar.length == 0){
            return (
                <div className="center">
                            <div id="sidebar" className="dictamenRight">
                                <div>
                                    Aun no hay archivos guardados
                                    <input type="file" name = "file" onChange={this.fileChange} />
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                            </div>
                </div>
            );
        }else{
            return (
            <div className="center">
                        <div id="sidebar" className="dictamenRight">
                            <div>
                                Cargando... Espere un momento
                                <input type="file" name = "file" onChange={this.fileChange} />
                            </div>
                            <br/>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button> 
                        </div>
            </div>
        );
    }
    }//Fin de Render
}//Fin de Class SubirDictamen
export default SubirDictamen;

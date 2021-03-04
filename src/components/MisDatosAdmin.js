import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import DirectorioAdmin from './DirectorioAdmin';
import Slider from './Slider';
import Cookies from 'universal-cookie';
import DatosActualizadosAdmin from './DatosActualizadosAdmin';
import DatosActualizadosEmail from './DatosActualizadosEmail';

const cookies = new Cookies();

class MisDatosAdmin extends React.Component{

    url = Global.url;

    state = {
        admin: {},
        usuario: {},
        idUsuario: cookies.get('idUsuario'),
        idAdmin: cookies.get('idAdmin'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getAdmin();
        }

        getAdmin = () => {
            axios.get(this.url +"admin/findIdUsuario/"+ this.state.idUsuario)
            .catch(error=>{
                    window.location.href = '/DatosAdmin';
            })
            .then(res => {
                    this.setState({
                        admin: res.data,
                        status: 'success'
                       });
                       cookies.set('idAdmin', this.state.admin.idAdmin, {path:"/"})
            })
        }//Fin de funcion getAdmin()
        updateDatos=()=>{
            this.setState({
                actualizar: "DATOS"
            })
        }
        updateEmail=()=>{
            this.setState({
                actualizar: "EMAIL"
            })
        }
        cancel=()=>{
            this.setState({
                actualizar: "false"
            })
        }
        
    render() {
            return(
                <div className="center">
                <Slider
                title="DATOS PERSONALES"
                size="slider-small"
                />
                <DirectorioAdmin/>
                <br/>
                    <tbody >
                        <tr >
                            <th className="table_lista">Nombre</th>
                            <th className="table_lista">Telefono</th>
                            <th className="table_lista">Correo</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista"> {this.state.admin.nombre} {this.state.admin.apellidos}</td>
                            <td className="table_lista"> {this.state.admin.telefono}</td>
                            <td className="table_lista"> {this.state.email}</td>
                            <td><button  className = "btn" onClick={this.updateDatos} >Actualizar Información Personal</button></td>
                            <td><button  className = "btn" onClick={this.updateEmail} >Actualizar Email ó Contraseña</button></td>
                        </tr>
                        </tbody>
                        {(() => {  
                            switch (this.state.actualizar){
                            case "DATOS":
                                return (
                                    <div>
                                    <DatosActualizadosAdmin/>
                                    <button  id="btn_delete" onClick={this.cancel} >Cancelar</button>
                                    </div>
                                  );
                            break;
                            case "EMAIL":
                                return (
                                    <div>
                                    <DatosActualizadosEmail
                                    redirect="MisDatosAdmin"
                                    tipoUsuario="true"
                                    />
                                    <button  id="btn_delete" onClick={this.cancel} >Cancelar</button>
                                    </div>
                                  );
                                break;
                             default: break;
                            }
                            })()}
                </div>
            );
  
}//Fin de Render ()
}//Fin de Classs MisDatosAdmin

export default MisDatosAdmin;
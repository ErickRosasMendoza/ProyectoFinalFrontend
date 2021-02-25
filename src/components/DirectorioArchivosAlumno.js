 import React, {Component} from 'react';
import axios from 'axios';
import Slider from './Slider';
import { Link, Switch } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';
import Cookies from 'universal-cookie';
import AlumnoDetalle from './AlumnoDetalle';
import AlumnoDictamen from './AlumnoDictamen';
import AlumnoBaja from './AlumnoBaja';
import AlumnoServicio from './AlumnoServicio';
import AlumnoLiberacion from './AlumnoLiberacion';
import AdminBajaArchivos from './AdminBajaArchivos';
import AdminDictamenArchivos from './AdminDictamenArchivos';
import AdminLiberacionArchivos from './AdminLiberacionArchivos';
import AdminServicioArchivos from './AdminServicioArchivos';
const cookies = new Cookies();

class DirectorioArchivosAlumno extends Component{

    state = {
        idAlumno: "",
        idTramite: "",
        status: null
    };

    componentWillMount() {
        const { match: { params } } = this.props;
        console.log(params.id)
        var id = params.id;
        this.setState({
                idAlumno: id
        })
        console.log(this.state.idAlumno)
    }

    tramite1=()=>{
        this.setState({
            idTramite: 1
        })
    }
    tramite2=()=>{
        this.setState({
            idTramite: 2
        })
    }
    tramite3=()=>{
        this.setState({
            idTramite: 3
        })
    }
    tramite4=()=>{
        this.setState({
            idTramite: 4
        })
    }

    render(){
       

            return(
              <div className = "center">
                        <DirectorioAdmin />
                        {(() => {  
                        switch (this.state.idTramite){
                        case 1:
                            return (
                                <AlumnoDictamen
                                id = {this.state.idAlumno}
                                />                                
                              );
                        break;
                        case 2:
                            return(
                                <AlumnoLiberacion
                                id = {this.state.idAlumno}/>
                              ); 
                              break;  
                        case 3:
                            return(
                                <AlumnoBaja
                                id = {this.state.idAlumno}/>    
                            );
                        case 4:
                            return(
                                <AlumnoServicio
                                id = {this.state.idAlumno}/>
                            )
                         default: 
                            return(
                                <AlumnoDetalle
                                id = {this.state.idAlumno}/>
                            )
                            break;
                        }
                        })()}

                <tbody>
                    <tr>
                        <tr>
                        <td className="table_lista"> <button  class = "btn" onClick={this.tramite1} >Docuementacion Dictamen de 70%</button></td>
                        </tr>
                        <tr> 
                        <td className="table_lista"><button  class = "btn" onClick={this.tramite2} >Docuementacion Liberacion Extemporanea</button></td>
                        </tr>
                        <tr>
                        <td className="table_lista"><button  class = "btn" onClick={this.tramite3} >Documentacion Baja de Servicio Social</button></td> 
                        </tr>
                        <tr>
                        <td className="table_lista"><button  class = "btn" onClick={this.tramite4} >Docuementacion Servicio Social</button></td>
                        </tr>
                     </tr>   
                </tbody>

                {(() => {  
                    switch (this.state.idTramite){
                        case 1:
                            return (
                                <AdminDictamenArchivos
                                id = {this.state.idAlumno}/>
                              );
                        break;
                        case 2:
                            return(
                                <AdminLiberacionArchivos
                                id = {this.state.idAlumno}/>
                              ); 
                              break;  
                        case 3:
                            return(
                                <AdminBajaArchivos
                                id = {this.state.idAlumno}/>    
                            );
                        case 4:
                            return(
                                <AdminServicioArchivos
                                id = {this.state.idAlumno}/>
                            )
                         default: break;

                    }


                })()}

                 </div>
             );
             

        }   
    }
export default DirectorioArchivosAlumno; 
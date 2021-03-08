import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Global from '../Global';
import Cookies from 'universal-cookie';
import SubirServicio from './SubirServicio';
import VerDatosServicio from './VerDatosServicio';

const cookies = new Cookies();

class ServicioSocial extends React.Component {

    url = Global.url;
    semestreRef = React.createRef();
    responsableDirectoRef = React.createRef();
    servicioRef = React.createRef();
    servicioRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();


    state = {
        idAlumno: cookies.get('idAlumno'),
        statusResponsable: null,
        servicio: {},
        status: "null",
        estado: null
    };

    componentWillMount = () =>{
        this.searchServicio();
    }

    searchServicio = () => {
        axios.get(this.url+"servicioSocial/findIdAlumno/"+this.servicioRef)
        .then(res =>{
            this.setState({
                servicio: res.data
            });
        })
        .then(res => {
            this.setState({
                estado: this.state.servicio.estado,
                servicio: {
                    semestre: null,
                    responsableDirecto: null,
                    estado: "NUEVO",
                    fechaRegistro: null,
                    revisado: null,
                    idAlumno: null,
                    idServicio: null
                }
            });
        });
    }//Fin de search Servicio

    changeState = () => {
        this.setState({
            servicio: {
                semestre: this.semestreRef.current.value,
                responsableDirecto: "",
                estado: "NUEVO",
                fechaRegistro: this.fechaRegistroRef,
                revisado: null,
                idAlumno: this.state.idAlumno,
                idServicio: this.state.idAlumno
            }
        });
       // console.log(this.state + "Cambiando datos a usuario");
    }

    saveServicio = (e) => {
        this.changeState();
            axios.post(this.url + "servicioSocial/save", this.state.servicio)
            .then(res => {
                this.setState(
                    {
                        status: "true"
                    }
                );
            })
    }//Fin de funcion saveServicio()
    render() {
        if(this.state.status == 'true'){
            window.location.href = './CrearServicio';
        }

        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                        <div id="sidebar" className="servicioLeft">
                            <div>
                                <label htmlFor="semestre" className="text_login">Semestre</label>
                                <select name="semestre" className="input_login" ref={this.semestreRef} onChange={this.changeState}>
                                    <option value="SEPTIMO">SEPTIMO</option>
                                    <option value="OCTAVO">OCTAVO</option>
                                    <option value="NOVENO">NOVENO</option>
                                    <option value="EGRESADO">EGRESADO</option>
                                    </select>
                            </div>
                            <br/>
                            {(() => {
                                switch(this.state.estado){   
                                    case "NUEVO":
                                    return (
                                        <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    );
                                    break;
                                    case undefined:
                                    return (
                                        <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    );
                                    break;
                                    case null:
                                    return (
                                        <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                          </div>
                          <SubirServicio/>
                          <VerDatosServicio/>
            </div>
        );
    }
}
export default ServicioSocial;

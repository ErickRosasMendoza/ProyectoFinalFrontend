import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeaderDEyAE from './HeaderDEyAE';
import DirectorioAlumno from './DirectorioAlumno';
import Global from '../Global';
import Cookies from 'universal-cookie';
import SubirBaja from './SubirBaja';
import VerDatosBaja from './VerDatosBaja';

const cookies = new Cookies();

class Baja extends React.Component {

    url = Global.url;

    registroSSRef = React.createRef();
    semestreRef = React.createRef();
    egresadoRef = React.createRef();
    prestatarioRef = React.createRef();
    programaSSRef = React.createRef();
    fechaInicioRef = React.createRef();
    fechaTerminoRef = React.createRef();
    tipoDeBajaRef = React.createRef();
    horasRef = React.createRef();
    idAlumno = React.createRef();
    bajaRef = React.createRef();
    bajaRef = cookies.get('idAlumno');

    state = {
        idAlumno: cookies.get('idAlumno'),
        statusRegistro: null,
        statusPrograma: null,
        statusPrestatario: null,
        statusFechaInicio: null,
        statusFechaTermino: null,
        baja: {},
        status: "null",
        estado: null
    };


    componentWillMount = () =>{
        this.searchBaja();
    }

    searchBaja = () => {
        axios.get(this.url+"solicitudBaja/findIdAlumno/"+this.bajaRef)
        .then(res =>{
            this.setState({
                baja: res.data
            });
        })
        .then(res => {
            this.setState({
                estado: this.state.baja.estado,
                baja: {
                    egresado: null,
                    semestre: null,
                    registroSS: null,
                    prestatario: null,
                    programaSS: null,
                    fechaInicio: null,
                    fechaTermino: null,
                    tipoDeBaja: null,
                    horas: null,
                    estado: "NUEVO",
                    idAlumno: null,
                    idSolicitud: null
                }
            });
        });
    }//Fin de search Baja

    changeState = () => {
        if(this.tipoDeBajaRef.current.value !="BAJA CON RECONOCIMIENTO DE HORAS")
        {
            this.setState({
                baja: {
                    egresado: this.egresadoRef.current.value,
                    semestre: this.semestreRef.current.value,
                    registroSS: this.registroSSRef.current.value,
                    prestatario: this.prestatarioRef.current.value.toUpperCase(),
                    programaSS: this.programaSSRef.current.value.toUpperCase(),
                    fechaInicio: this.fechaInicioRef.current.value,
                    fechaTermino: this.fechaTerminoRef.current.value,
                    tipoDeBaja: this.tipoDeBajaRef.current.value,
                    horas: 0,
                    estado: "NUEVO",
                    idAlumno: this.state.idAlumno,
                    idSolicitud: this.state.idAlumno
                }
            });
        }else{
            this.setState({
                baja: {
                    egresado: this.egresadoRef.current.value,
                    semestre: this.semestreRef.current.value,
                    registroSS: this.registroSSRef.current.value,
                    prestatario: this.prestatarioRef.current.value.toUpperCase(),
                    programaSS: this.programaSSRef.current.value.toUpperCase(),
                    fechaInicio: this.fechaInicioRef.current.value,
                    fechaTermino: this.fechaTerminoRef.current.value,
                    tipoDeBaja: this.tipoDeBajaRef.current.value,
                    horas: this.horasRef.current.value,
                    estado: "NUEVO",
                    idAlumno: this.state.idAlumno,
                    idSolicitud: this.state.idAlumno
                }
            });
        }
    }

    saveBaja = (e) => {
        this.changeState();
        if(this.state.baja.registroSS && this.state.baja.registroSS != null && this.state.baja.registroSS != undefined){
            if(this.state.baja.programaSS && this.state.baja.programaSS != null && this.state.baja.programaSS != undefined){
                if(this.state.baja.prestatario && this.state.baja.prestatario != null && this.state.baja.prestatario != undefined){
                    if(this.state.baja.fechaInicio && this.state.baja.fechaInicio != null && this.state.baja.fechaInicio != undefined){
                        if(this.state.baja.fechaTermino && this.state.baja.fechaTermino != null && this.state.baja.fechaTermino != undefined){
                            axios.post(this.url + "solicitudBaja/save", this.state.baja)
                            .then(res => {
                                this.setState(
                                {
                                    status: "true"
                                });
                            })
                        }else{
                            this.setState(
                                {
                                    statusFechaTermino: "false"
                                }
                            );
                        }//Fin de else Fecha Termino
                    }else{
                        this.setState(
                            {
                                statusFechaInicio: "false"
                            }
                        );
                    }//Fin de else Fecha Inicio
                }else{
                    this.setState(
                        {
                            statusPrestatario: "false"
                        }
                    );
                }//Fin de else Prestatario
            }else{
                this.setState(
                    {
                        statusPrograma: "false"
                    }
                );
            }//Fin de else Programa de SS
        }else{
            this.setState(
                {
                    statusRegistro: "false"
                }
            );
        }//Fin de else Numero de Registro de SS
    }//Fin de Funcion saveBaja
    render() {
        if(this.state.status == 'true'){
            window.location.href = './CrearBaja';
        }

        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                        <div id="sidebar" className="bajaLeft">
                            <div>
                                <label htmlFor="registroSS" className="text_login">Número de Registro Servicio Social</label>
                                <input type="text" className="input_login" name="registroSS" placeholder="Ingresa el número de registro del servicio social" ref={this.registroSSRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusRegistro){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa tu número de registro de Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}    
                            </div>
                            <div>
                                <label htmlFor="programaSS" className="text_login">Programa de Servicio Social</label>
                                <input type="text" className="input_login" name="programaSS" placeholder="Ingresa el nombre del programa de servicio social" ref={this.programaSSRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusPrograma){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa el programa al que perteneces!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()} 
                           </div>
                            <div>
                                <label htmlFor="prestatario" className="text_login">Prestatario</label>
                                <input type="text" className="input_login" name="prestatario" placeholder="Ingresa el nombre de la Institución/Empresa/etc. donde realizas tu servicio social" ref={this.prestatarioRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusPrestatario){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa el nombre de la unidad donde realizas Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                        break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="fechaInicio" className="text_login">Fecha de Inicio</label>
                                <input type="date" className="input_login" name="fechaInicio" ref={this.fechaInicioRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusFechaInicio){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa la Fecha de Inicio de tu Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="fechaTermino" className="text_login">Fecha de Término</label>
                                <input type="date" className="input_login" name="fechaTermino" ref={this.fechaTerminoRef} onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusFechaTermino){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa la Fecha de Término de tu Servicio Social!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()} 
                            </div>
                            <div>
                                <label htmlFor="tipoBaja" className="text_login">Tipo de Baja</label>
                                <select name="tipoBaja" className="input_login" ref={this.tipoDeBajaRef} onChange={this.changeState}>
                                    <option value="BAJA SIN RECONOCIMIENTO DE HORAS">SIN RECONOCIMIENTO DE HORAS</option>
                                    <option value="BAJA CON RECONOCIMIENTO DE HORAS">CON RECONOCIMIENTO DE HORAS</option>
                                    <option value="BAJA POR MOVILIDAD ACADÉMICA">POR MOVILIDAD ACADÉMICA</option>
                                    </select>
                            </div>
                            <div>
                                <label htmlFor="horas" className="text_login">Horas de Servicio Social</label>
                                <input type="text" className="input_login" name="horas" placeholder="Ingresa el total de horas" ref={this.horasRef} onChange={this.changeState}/>
                            </div>
                            <div>
                                <label htmlFor="egresado" className="text_login">Eres egresado?</label>
                                <select name="egresado" className="input_login" ref={this.egresadoRef} onChange={this.changeState}>
                                    <option value="True">SI, SI SOY EGRESADO</option>
                                    <option value="False">NO, NO SOY EGRESADO</option>
                                    </select>
                            </div>
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
                                        <button className="btn" onClick = {this.saveBaja}>Aceptar</button>
                                    );
                                    break;
                                    case undefined:
                                    return (
                                        <button className="btn" onClick = {this.saveBaja}>Aceptar</button>
                                    );
                                    break;
                                    case null:
                                    return (
                                        <button className="btn" onClick = {this.saveBaja}>Aceptar</button>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                          </div>
                          <SubirBaja/>
                          <VerDatosBaja/>
            </div>
        );
    }
}
export default Baja;

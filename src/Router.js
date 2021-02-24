import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from './components/Error';
import Footer from './components/Footer';
import Home from './components/Home';
import DirectorioAdmin from './components/DirectorioAdmin';
import ListaAlumnos from './components/ListaAlumnos';
import BuscarAlumno from './components/BuscarAlumno';
import CrearAdmin from './components/CrearAdmin';
import AlumnoDetalle from './components/AlumnoDetalle';
import DirectorioAlumno from './components/DirectorioAlumno';
import Dictamen from './components/Dictamen';
import Liberacion from './components/Liberacion';
import Baja from './components/Baja';
import ServicioSocial from './components/ServicioSocial';
import SubirDictamen from './components/SubirDictamen';
import SubirLiberacion from './components/SubirLiberacion';
import SubirBaja from './components/SubirBaja';
import SubirServicio from './components/SubirServicio';
import IniciarSesion from './components/IniciarSesion';
import CrearAlumno from './components/CrearAlumno';
import DatosAlumno from './components/DatosAlumno';
import MisDatosAlumno from './components/MisDatosAlumno';
import DatosAdmin from './components/DatosAdmin';
import MisDatosAdmin from './components/MisDatosAdmin';
import DocDictamen from './components/DocDictamen';
import PdfDictamen from './components/PdfDictamen';
import DocBaja from './components/DocBaja';
import PdfBaja from './components/PdfBaja';
import DocLiberacion from './components/DocLiberacion';
import PdfLiberacion from './components/PdfLiberacion';
import DocServicio from './components/DocServicio';
import PdfServicio from './components/PdfServicio';
import BuscarICE from './components/BuscarICE';
import BuscarICA from './components/BuscarICA';
import BuscarIE from './components/BuscarIE';
import BuscarISISA from './components/BuscarISISA';
import AlumnoDictamen from './components/AlumnoDictamen';
import AlumnoBaja from './components/AlumnoBaja';
import AlumnoLiberacion from './components/AlumnoLiberacion';
import AlumnoServicio from './components/AlumnoServicio';
import HeaderDEyAE from './components/HeaderDEyAE';
import DirectorioArchivosAlumno from './components/DirectorioArchivosAlumno';
import BuscarBoleta from './components/BuscarBoleta';
import BuscarDictamenAlumnos from './components/BuscarDictamenAlumnos';
import BuscarBajaAlumnos from './components/BuscarBajaAlumnos';
import BuscarLiberacionAlumnos from './components/BuscarLiberacionAlumnos';
import BuscarServicioAlumnos from './components/BuscarServicioAlumnos';

 
class Router extends React.Component {
    
   
    render() {
        return (
            
            <BrowserRouter>
            
            
                {/**CONFIGURAR RUTAS Y PAGINAS  */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path = "/DirectorioAdmin" component = {DirectorioAdmin}/>
                    <Route exact path = "/DirectorioArchivosAlumno/:id" component = {DirectorioArchivosAlumno}/>
                    <Route exact path = "/Lista" component = {ListaAlumnos}/>
                    <Route exact path = "/BuscarNombre" component ={BuscarAlumno}/>
                    <Route exact path = "/BuscarBoleta" component = {BuscarBoleta}/>
                    <Route exact path = "/Crearadmin" component = {CrearAdmin}/>
                    <Route exact path = "/BuscarICE" component = {BuscarICE}/>
                    <Route exact path = "/BuscarICA" component = {BuscarICA}/>
                    <Route exact path = "/BuscarIE" component = {BuscarIE}/>
                    <Route exact path = '/BuscarISISA' component = {BuscarISISA}/>
                    <Route exact path = "/BuscarDictamen" component = {BuscarDictamenAlumnos}/>
                    <Route exact path = "/BuscarBaja" component = {BuscarBajaAlumnos}/>
                    <Route exact path = "/BuscarLiberacion" component = {BuscarLiberacionAlumnos}/>
                    <Route exact path = "/BuscarServicio" component = {BuscarServicioAlumnos}/>
                    <Route exact path = "/AlumnoServicio/:id" component = {AlumnoServicio}/>
                    <Route exact path = "/DocDictamen/:doc" component = {DocDictamen}/>
                    <Route exact path = "/DocLiberacion/:doc" component = {DocLiberacion}/>
                    <Route exact path = "/DocBaja/:doc" component = {DocBaja}/>
                    <Route exact path = "/DocServicio/:doc" component = {DocServicio}/>
                    <Route exact path = "/PdfDictamen/:doc" component = {PdfDictamen}/>
                    <Route exact path = "/PdfBaja/:doc" component = {PdfBaja}/>
                    <Route exact path = "/PdfLiberacion/:doc" component = {PdfLiberacion}/>
                    <Route exact path = "/PdfServicio/:doc" component = {PdfServicio}/>
                    <Route exact path = "/DirectorioAlumno" component = {DirectorioAlumno}/>
                    <Route exact path = "/CrearDictamen" component = {Dictamen}/>
                    <Route exact path = "/CrearLiberacion" component = {Liberacion}/>
                    <Route exact path = "/CrearBaja" component = {Baja}/>
                    <Route exact path = "/CrearServicio" component = {ServicioSocial}/>
                    <Route exact path = "/SubirDictamen" component = {SubirDictamen}/>
                    <Route exact path = "/SubirLiberacion" component = {SubirLiberacion}/>
                    <Route exact path = "/SubirBaja" component = {SubirBaja}/>
                    <Route exact path = "/SubirServicio" component = {SubirServicio}/>
                    <Route exact path = "/IniciarSesion" component = {IniciarSesion}/>
                    <Route exact path = "/Registrarse" component = {CrearAlumno}/>
                    <Route exact path = "/DatosAlumno" component = {DatosAlumno}/>
                    <Route exact path = "/MisDatosAlumno" component = {MisDatosAlumno}/>
                    <Route exact path = "/DatosAdmin" component = {DatosAdmin}/>
                    <Route exact path = "/MisDatosAdmin" component = {MisDatosAdmin}/>
                    <Route component={Error} />
                    
                </Switch>
               
        <div className="clearfix"></div>
      <br/>
    
            </BrowserRouter>
           
        );
    }
}
export default Router;
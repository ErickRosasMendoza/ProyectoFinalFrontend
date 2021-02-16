import React, {Component} from 'react';
import Slider from './Slider';
import { Link, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class DirectorioAlumno extends Component{

	state = {
        email: cookies.get('email'),
    }

	cerrarSesion = () => {
        cookies.remove('idUsuario', {path:"/"});
        cookies.remove('email', {path:"/"});
        cookies.remove('contraseña', {path:"/"});
        cookies.remove('tipoUsuario', {path:"/"});
        cookies.remove('idAlumno', {path:"/"});
        window.location.href = '/IniciarSesion';
    }//Fin de Cerrar Sesion

    componentWillMount = () => {
        if(cookies.get('email') == null){
            window.location.href = './IniciarSesion';
        }
    }//Fin de funcion WillMount

    componentDidMount = () => {
        if(cookies.get('email') == null){
            window.location.href = './IniciarSesion';
        }
    }//Fin de funcion DidMount
    
    render(){
            return(
                <div className="center">
                <tbody>
                    <tr>
                        <th className="table"><Link to='/CrearDictamen' className = "active">Dictamen de 70%</Link></th>
                        <th className="table"><Link to='/CrearLiberacion' className = "active">Liberacion Extemporanea</Link></th>
                        <th className="table"> <Link to='/CrearBaja' className = "active">Baja de Servicio Social</Link></th>
                        <th className="table"><Link to='/CrearServicio' className = "active">Documentacion de Servicio Social</Link></th>
                        <th className="table"><Link to='/MisDatosAlumno' className = "active">Datos Personales</Link></th>
                        <th className="table " > <button id ="table-btn" onClick={this.cerrarSesion}>cerrar sesion</button></th>
                    </tr>
                </tbody>
                </div>
            )//Fin de Return
    };

}//Fin de Class DirectorioAlumno
export default DirectorioAlumno;
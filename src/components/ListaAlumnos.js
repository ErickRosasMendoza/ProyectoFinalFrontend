import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Global from '../Global';
import DirectorioAdmin from './DirectorioAdmin';
class ListaAlumnos extends Component{

    url = Global.url;
    state = {
        alumnos: [],
        status: null
    };

    componentWillMount() {
        this.getAlumnos();
        /*var id = this.props.search;
        if(id && id !=null && id != undefined){
            this.getAlumnosById(id);
        }
        else{
            this.getAlumnos();
        }*/
    }

    getAlumnos = () => {
        axios.get(this.url+"alumno/findAll")
            .then(response => {
                this.setState({
                    alumnos: response.data,
                    status: 'success'
                });
                console.log(this.state.alumnos);
            });
    }
    //Funcion Buscar por Id
/*    getAlumnosById = (id) => {
        axios.get(this.url+"alumno/find/"+id)
            .then(res => {
                this.setState({
                    alumnos: res.data,
                    status: 'success'
                });
            })
                .catch(err => {
                    this.setState({
                        alumnos: [],
                        status: 'success'
                    });
                });
                console.log(this.state.alumnos);
    }*/
    
render() {
    if(this.state.alumnos.length >=1){
        
        /*var listAlumnos = this.state.alumnos.map((alumno) =>{
            return(
                <article className="item-lista">
                     <tbody>
                            <tr>
                                <td className="table_lista"> {alumno.nombre}</td>
                                <td className="table_lista"> {alumno.apellidoPaterno}</td>
                                <td className="table_lista"> {alumno.apellidoMaterno}</td>
                                <td className="table_lista"> {alumno.email}</td>
                            </tr>
                        </tbody>
                </article>

            );
        });*/
        
       return (
        <React.Fragment>
            <DirectorioAdmin />
                <tbody>
                    <tr >
                        <th className="table_lista">Alumno</th>
                        <th className="table_lista">Boleta</th>
                        <th className="table_lista">Programa Academico</th>
                    </tr>
                </tbody>
                {this.state.alumnos.map((alumno, i) =>
                    <tbody key={i}>
                    <tr>
                        <td className="table_lista">{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombre}</td>
                        <td className="table_lista">{alumno.boleta}</td> 
                        <td className="table_lista">{alumno.programaAcademico}</td>
                        <td><Link to={'/DirectorioArchivosAlumno/' + alumno.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                    </tr>
                </tbody>
                )
                }
        </React.Fragment>
    );
    }else if(this.state.alumnos.length == 0 && this.state.status == 'success'){
        return(
            <div className="center">
            <DirectorioAdmin />
                <h1>No hay alumnos registrados para esta solicitud</h1>
            </div>
        );
    }else{
        return(
            <div className="center">
            <DirectorioAdmin />
                <h1>Cargando... Espere un momento...</h1>
            </div>
        );
    }
       /* return (
            <React.Fragment>
                <DirectorioAdmin/>
                <article className="item-lista">
                    <tbody >
                        <tr >
                            <th className="table_lista">Nombre</th>
                            <th className="table_lista">Apellido Paterno</th>
                            <th className="table_lista" >Apellido Paterno</th>
                            <th className="table_lista">Email</th>
                        </tr>
                    </tbody>

                    {this.state.alumnos.map((alumno, i) =>
                     <tbody key={i}>
                            <tr>
                                <td className="table_lista"> {alumno.nombre}</td>
                                <td className="table_lista"> {alumno.apellidoPaterno}</td>
                                <td className="table_lista"> {alumno.apellidoMaterno}</td>
                                <td className="table_lista"> {alumno.email}</td>
                            </tr>
                        </tbody>
                    )
                    }
                </article>
            </React.Fragment>
        );*/
    }//Fin de Render
}//Fin de Class ListaAlumnos
export default ListaAlumnos;
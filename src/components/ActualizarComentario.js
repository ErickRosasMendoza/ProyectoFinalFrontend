import React from 'react';
import axios from 'axios';
import Global from '../Global';

class ActualizarComentario extends React.Component {

    url = Global.url;
    
    comentarioRef=React.createRef();

    state = {
        idAlumno: this.props.id,
        status: null,
        lista: {},
        comentario: "",
        statusComentario: null
    };

    changeState = () => {
        this.setState({
            lista:{
                idLista: this.props.idLista,
                idAlumno: this.props.idAlumno,
                idDoc: this.props.idDoc,
                idTramite: this.props.idTramite,
                nombreDoc: this.props.nombreDoc,
                comentario: this.comentarioRef.current.value
            }
        });
    }

    comentario = () => {
        this.setState({
            comentario: "true"
        })
    }

    cancelComentario = () => {
        this.setState({
            comentario: "false"
        })
    }

    cambiarComentario = () =>{
        this.changeState();
        if(this.state.lista.comentario && this.state.lista.comentario !==null && this.state.lista.comentario !== undefined){
            axios.patch(this.url+"lista/update", this.state.lista)
            .then(res =>{
                this.setState({
                    status: "true"
                });
            });
        }else{
            this.setState({
                statusComentario: "false"
            });
        }//Fin de else Estado del Comentario
    }//Fin de cambiarComentario

    render() {
        if(this.state.status == "true"){
            window.location.href = './' + this.props.idAlumno;
        }
            return (
                <div>
                            <button className="btn_join" onClick={this.comentario}>Status</button>
                            {(() => {  
                                    switch (this.state.comentario){
                                    case "true":
                                    return (
                                            <div className="table_watch">
                                                <label htmlFor="comentario" className="text_login">Actualizar Comentario</label>
                                                <input type="text" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState}/>
                                                {(() => {
                                                switch(this.state.statusComentario){   
                                                    case "false":
                                                    return (
                                                    <a className="warning">¡Ingresa un comentario!</a>
                                                    );
                                                    break;
                                                    default:
                                                        break;
                                                }
                                                })()}
                                                <br/>
                                                <button className="btn_join" onClick={this.cambiarComentario}>Actualizar</button>
                                                <br/>
                                                <button id="btn_delete" onClick={this.cancelComentario}>Cancelar</button>
                                                <br/><br/>
                                                </div>
                                                    );
                                                break;
                                                default: break;
                                                }
                                            })()}
                </div>
            );
    }//Fin de Render
}//Fin de Class ActualizarComentario
export default ActualizarComentario;
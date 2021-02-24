import React from 'react';
import axios from 'axios';
import Global from '../Global';

class ActualizarComentario extends React.Component {

    url = Global.url;
    
    comentarioRef=React.createRef();

    state = {
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
            comentario: "false",
            statusComentario: "true"
        })
    }

    cambiarComentario = () =>{
        this.changeState();
        if(this.state.lista.comentario && this.state.lista.comentario !==null && this.state.lista.comentario !== undefined){
            axios.patch(this.url+"lista/update", this.state.lista)
            .then(res =>{
                this.setState({
                    status: "true",
                    statusComentario: "true"
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
<<<<<<< HEAD
                                                <label htmlFor="comentario" >Actualizar Comentario</label>
                                                <textarea type="text" name="comentario" className="table_watch_text" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState}/>
=======
                                                <label htmlFor="comentario">Actualizar Comentario</label>
                                                <textarea className="table_watch_text" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState}/>
>>>>>>> e79788e5d5255e2fc0d1fbf49df664ed917a4a0a
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
                                                <button className="btn_join" onClick={this.cambiarComentario}>Actualizar</button>
<<<<<<< HEAD
                                                
=======
>>>>>>> e79788e5d5255e2fc0d1fbf49df664ed917a4a0a
                                                <button id="btn_delete" onClick={this.cancelComentario}>Cancelar</button>
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

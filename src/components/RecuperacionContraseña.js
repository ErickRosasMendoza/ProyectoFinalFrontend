import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import md5 from 'md5';

class RecuperacionContraseña extends React.Component{

    cambioRef = React.createRef();

    url = Global.url;

    state = {
        usuario:{},
        recuperar:{},
        contraseña: null,
        statusContraseña: null,
        status: null,
        email: ""
    }

    changeState = () =>{
        this.setState({
            recuperar:{
                idUsuario: this.props.id,
                email: this.state.usuario.email,
                contraseña: md5("p4SS"+this.props.id+"dEYAe"),
                tipoUsuario: "false"
            }
        });
    }//Fin de changeState

    getUsuario = () =>{
        axios.get(this.url+"usuario/find/"+this.props.id)
        .then(res =>{
            this.setState({
                usuario: res.data,
            });
        });
    }//Fin de getUsuario()

    updateContraseña = () =>{
        this.changeState();
        if(this.cambioRef.current.value === "SI"){
            axios.patch(this.url+"usuario/update", this.state.recuperar)
            .then(res =>{
                this.setState({
                    status: "true"
                });
                this.cancelContraseña();
            });
        }else{
            this.setState({
                statusContraseña: "false"
            })
        }
    }//Fin de updateContraseña

    contraseña = () => {
        this.getUsuario();
        this.setState({
            contraseña: "true"
        })
    }

    cancelContraseña = () => {
        this.setState({
            contraseña: "false",
            statusContraseña: "true"
        })
    }

    render() {
            return (
                <div>
                    <button className="btn_join" onClick={this.contraseña}>Recuperar Contraseña</button>
                            {(() => {  
                                    switch (this.state.contraseña){
                                    case "true":
                                    return (
                                            <div className="table_watch">
                                                <strong>Cambiar Contraseña</strong>
                                                <br/>
                                                <select name="actualizar" ref={this.cambioRef} onChange={this.changeState}>
                                                    <option value="NO">NO</option>
                                                    <option value="SI">SI</option>
                                                    </select>
                                                <br/>
                                                <strong>Email:</strong> {this.state.usuario.email}
                                                <br/>
                                                <strong>Nueva Contraseña:</strong> p4SS{this.props.id}dEYAe
                                                {(() => {
                                                switch(this.state.statusContraseña){   
                                                    case "false":
                                                    return (
                                                    <a className="warning">¡Seleccione "SI" para restablecer la contraseña!</a>
                                                    );
                                                    break;
                                                    default:
                                                        break;
                                                }
                                                })()}
                                                <br/><br/>
                                                <button className="btn_join" onClick={this.updateContraseña}>Actualizar</button>
                                                <button id="btn_delete" onClick={this.cancelContraseña}>Cancelar</button>
                                                </div>
                                                    );
                                                break;
                                                default: break;
                                                }
                                            })()}
                </div>
            );
    }//Fin de Render
}//Fin de Class Recuperacion Contraseña
export default RecuperacionContraseña
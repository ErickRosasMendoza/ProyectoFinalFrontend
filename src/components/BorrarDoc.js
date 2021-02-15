import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DirectorioAdmin from './DirectorioAdmin';
import Slider from './Slider';
import Global from '../Global';

class BorrarDoc extends React.Component {

    url=Global.url;

    state = {
        statusDoc: null,
        statusLista: null
      };

      delete = () => {
          this.deleteLista();
          this.deleteDoc();
      }//Fin de Funcion delete
    
        deleteDoc = () => {
            axios.delete(this.url + this.props.url + this.props.idDoc)
            .then(res =>{
                this.setState({
                    statusDoc: "true"
                });
            });
        }//Fin de deleteDoc()
        deleteLista = () => {
            axios.delete(this.url + "lista/delete/" + this.props.idLista)
            .then(res => {
                this.setState({
                    statusLista: "true"
                });
            });
        }//Fin de deleteLista()

    render(){

        if(this.state.statusDoc == "true" && this.state.statusLista == "true"){
            window.location.href = "./" + this.props.redirect;
        }

        return(
            <button  id="btn_delete" onClick={this.delete}>Eliminar</button>
        )
    
    }//Fin de Render
}//Fin de class Borrar Doc
export default BorrarDoc;
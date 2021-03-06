import React from 'react';
import axios from 'axios';
import jspdf, { jsPDF } from 'jspdf';
import Global from '../Global';


class PdfDictamenAlumno extends React.Component{

    url = Global.url;
      
        state={
            alumno: {},
            text:"",
            text2:""
        }

        componentWillMount = () =>{
            this.generarPdf();
        }

        generarPdf =  () =>{
            axios.get(this.url + "alumno/find/" + this.props.idAlumno)
                .then(res => {
                    this.setState({
                        alumno: res.data
                })
               console.log(this.state.alumno.nombre)
            })
            .then(res =>{
                this.setState({
                 text: ["Por este medio, el C." + this.state.alumno.nombre + " " + this.state.alumno.apellidoPaterno + " " + this.state.alumno.apellidoMaterno + " con número de boleta: " + this.state.alumno.boleta + 
                 " actualmente cursando el " + this.props.semestre + " semestre del programa académico de " + this.state.alumno.programaAcademico + ", de la ESCUELA" + 
                 "SUPERIOR DE INGENIERÍA MACÁNICA Y ELÉCTRICA Unidad Zacatenco, habiendo completado el " + this.props.creditos + "% de créditos, y siendo alumno en situación académica regular."]
                })
            })
            .then(res =>{
                this.setState({
                    text2:[
                        "Solicito de la manera mas atenta su autorización para iniciar mi servicio social a pesar de no contar con el" +
               " porcentaje de créditos requerido, en el entendido que si al termino del mismo no eh superado al menos el " +
            "70% de los créditos del programa académico que curso, debidamente acreditado por la constancia " +
            "correspondiente, dicho servicio social sera considerado nulo."
                    ]
                })
            })
           
           //hacer todo mayusculas
           //var luis = this.state.nombre;
           //var l= luis.toUpperCase();
           //console.log(l);
          // console.log(this.state.text);
        }

    jspdfGenerator=()=>{
        var doc = new jsPDF('p', 'pt');
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var fecha = new Date().toLocaleDateString(undefined, options);

        doc.text( 200,125, "SOLICITUD DE DICTAMEN" );
        doc.setFontSize(11);
        doc.text(320,210,"Ciudad de México " + fecha)
        doc.setFontSize(12);
        doc.text(50,250, "COMISIÓN DE SERVICIO SOCIAL");
        doc.text(50,265, "PRESENTE.");
        doc.setFontSize(12);

        doc.text(this.state.text, 50,320 , {maxWidth: 500, align: "justify"});
        doc.text(this.state.text2, 50,400 , {maxWidth: 500, align: "justify"});
        doc.text("Sin otro en particular, aprovecho para mandar un cordial saludo.", 50, 480 , {maxWidth: 500, align: "justify"});

        doc.text("ATENTAMENTE", 295,550, 'center');
        doc.text(290 ,650, this.state.alumno.nombre+" "+this.state.alumno.apellidoPaterno+" "+this.state.alumno.apellidoMaterno, 'center');
        doc.setFontSize(10);
        doc.text(295,670, this.props.email,'center');
        doc.save("Dictamen.pdf") 
    }
    render(){
        return(
            <div>
               <button className="btn" onClick = {this.jspdfGenerator} >generar pdf</button>
            </div>
        );
    }
}
export default PdfDictamenAlumno;

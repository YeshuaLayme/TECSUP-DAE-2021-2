import React,{Component} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
class App extends Component{
  constructor(props){
    super(props);
    this.state = ({
      prestamos:[],
      pos:null,
      titulo:'Nuevo',
      id:0,
      libro:'',
      usuario:'',
      fechaIni:'',
      fechaFin:'0'
    })
    this.cambioLibro = this.cambioLibro.bind(this);
    this.cambioUsuario = this.cambioUsuario.bind(this);
    this.cambioFechaIni = this.cambioFechaIni.bind(this);
    this.cambioFechaFin = this.cambioFechaFin.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:8000/prestamos')
    .then(res =>{
      console.log(res.data);
      this.setState({prestamos: res.data})
    })
  }

  cambioLibro(e){
    this.setState({
      libro: e.target.value
    })
  }

  cambioUsuario(e){
    this.setState({
      usuario: e.target.value
    })
  }

  cambioFechaIni(e){
    this.setState({
      fechaIni: e.target.value
    })
  }

  cambioFechaFin(e){
    this.setState({
      fechaFin: e.target.value
    })
  }


  mostrar(cod,index){
    axios.get('http://localhost:8000/prestamos'+cod)
    .then(res => {
      this.setState({
        pos: index,
        titulo: 'Editar',
        id: res.data.id,
        libro: res.data.Libro,
        usuario :res.data.usuario,
        fechaIni: res.data.release_date,
        fechaFin :  res.data.release_date,
      })
    })
  }

  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      Libro: this.state.libro,
      usuario: this.state.usuario,
      fechaInicio: this.state.fechaIni,
      fechaFin: this.state.fechaFin
   }
    if(cod>0){
      //edición de un registro
      axios.put('http://localhost:8000/prestamos'+cod,datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          usuario:'',
          fechaIni:'',
          fechaFin:'',
          prestamos: temp
        });
      }).catch((error) =>{
        console.log(error.toString());
      });
      
    }else{
      //nuevo registro
      axios.post('http://localhost:8000/prestamos',datos)
      .then(res => {
        this.state.series.push(res.data);
        var temp = this.state.series;
        this.setState({
          id:0,
          libro:'',
          usuario:'',
          fechaIni:'',
          fechaFin:'',
          prestamos: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }

  eliminar(cod){
    let rpta = window.confirm("Desea Eliminar?");
    if(rpta){
      axios.delete('http://localhost:8000/prestamos'+cod)
      .then(res =>{
        var temp = this.state.prestamos.filter((prestamos)=>prestamos.id !== cod);
        this.setState({
          prestamos: temp
        })
      })
    }
  }

  render(){
    return(
    <div>
        <Container>
              <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Libro</th>
                  <th>Usuario</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prestamos.map( (prestamos,index) =>{
                  return (
                  <tr key={prestamos.id}>
                    <td>{prestamos.id}</td>
                    <td>{prestamos.Libro}</td>
                    <td>{prestamos.usuario}</td>
                    <td>{prestamos.fechaIni}</td>
                    <td>{prestamos.fechaFin}</td>
                    <td>
                      <Button variant="success" onClick={()=>this.mostrar(prestamos.id,index)}>Editar</Button>
                      <Button variant="danger" onClick={()=>this.eliminar(prestamos.id,index)}>Eliminar</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <hr />
            <h1>{this.state.titulo}</h1>
            <Form onSubmit={this.guardar}>
              <Form.Control type="hidden" value={this.state.id} />
              <Form.Group className="mb-3">
                <Form.Label>Ingrese Nombre del Libro:</Form.Label>
                <Form.Control type="text" value={this.state.libro} onChange={this.cambioLibro} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ingrese Nombre del Usuario:</Form.Label>
                <Form.Control type="text" value={this.state.usuario} onChange={this.cambioUsuario} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control type="datetime-local" value={this.state.fechaIni}  onChange={this.cambioFechaIni}/>
                </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control type="datetime-local" value={this.state.fechaFin}  onChange={this.cambioFechaFin}/>
              </Form.Group>


              <Button variant="primary" type="submit">
                GUARDAR
              </Button>
          </Form>
        </Container>
    </div>)
  }
}

export default App;
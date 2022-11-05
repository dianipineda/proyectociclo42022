import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      edad: "",
      telefono: "",
      genero: "",
      mensaje: false,
      textoMsj: "",
      invitados: [],
      _id: "",
    };
    this.guardarInvitado = this.guardarInvitado.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.duracionMensaje = null;
    this.cerrarMensaje = this.cerrarMensaje.bind(this);
  }

  componentDidMount() {
    this.obtenerInvitados();
  }

  guardarInvitado(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch("/api/" + this.state._id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            mensaje: true,
            textoMsj: "datos de invitado actualizados",
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            edad: "",
            telefono: "",
            genero: "",
            _id: "",
          });
          this.duracionMensaje = setInterval(this.cerrarMensaje, 5000);
          console.log(data);
          this.obtenerInvitados();
        });
    } else {
      fetch("/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            mensaje: true,
            textoMsj: "Invitado guardado",
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            edad: "",
            telefono: "",
            genero: "",
          });
          this.duracionMensaje = setInterval(this.cerrarMensaje, 5000);
          console.log(data);
          this.obtenerInvitados();
        })
        .catch((err) => console.log(err));
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  cerrarMensaje() {
    clearInterval(this.duracionMensaje);
    this.setState({ mensaje: false, textoMsj: "" });
  }

  obtenerInvitados() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => this.setState({ invitados: data.invitados }))
      .catch((err) => console.log(err));
  }

  editarInvitado(id) {
    fetch("/api/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          primer_nombre: data.invitado.primer_nombre,
          segundo_nombre: data.invitado.segundo_nombre,
          primer_apellido: data.invitado.primer_apellido,
          segundo_apellido: data.invitado.segundo_apellido,
          edad: data.invitado.edad,
          telefono: data.invitado.telefono,
          genero: data.invitado.genero,
          _id: data.invitado._id,
        });
      });
  }

  eliminarInvitado(id) {
    fetch("/api/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.obtenerInvitados();
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">
              Proyecto fiesta año nuevo
            </a>
          </div>
        </nav>
        <div className="container px-0 mx-5 py-3">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Invitado</h5>
                  <form onSubmit={this.guardarInvitado}>
                    {/* inicia form */}

                    {/* primer nombre */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="primer_nombre"
                          className="form-control"
                          placeholder="primer nombre"
                          value={this.state.primer_nombre}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* segundo nombre */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="segundo_nombre"
                          className="form-control"
                          placeholder="segundo nombre"
                          value={this.state.segundo_nombre}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* primer apellido */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="primer_apellido"
                          className="form-control"
                          placeholder="primer apelido"
                          value={this.state.primer_apellido}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* segundo apellido */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="segundo_apellido"
                          className="form-control"
                          placeholder="segundo apellido"
                          value={this.state.segundo_apellido}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* edad */}
                    <div className="row">
                      <div className="form-group col-6">
                        <input
                          type="number"
                          name="edad"
                          className="form-control"
                          placeholder="edad"
                          value={this.state.edad}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* telefono */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="telefono"
                          className="form-control"
                          placeholder="teléfono"
                          value={this.state.telefono}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* genero */}
                    <div className="row">
                      <div className="form-group col-12">
                        <input
                          type="text"
                          name="genero"
                          className="form-control"
                          placeholder="género"
                          value={this.state.genero}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    {/*botón guardar y alerta*/}
                    <div className="row">
                      {/* boton */}
                      <div className="form-group col-4">
                        <button
                          className="btn btn-secondary my-2 my-sm-2 py-2"
                          type="submit"
                        >
                          Guardar
                        </button>
                      </div>
                      {/* alerta */}
                      {this.state.mensaje ? (
                        <div className="form-group col-7">
                          <div
                            className="alert alert-success my-sm-2 p-1"
                            role="alert"
                          >
                            <h5
                              style={{ fontSize: "12px", textAlign: "center" }}
                            >
                              {this.state.textoMsj}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* termina boton y alerta */}
                    </div>

                    {/* termina form */}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-8 px-5 table-responsive-md">
              <table
                className="table table-condensed table-bordered table-hover"
                style={{
                  borderWidth: "1px",
                  borderColor: "#44d9e8",
                  borderStyle: "solid",
                  boxShadow: "0 0 .4rem #fff",
                }}
              >
                <thead>
                  <tr
                    className="active"
                    style={{ fontSize: "15px", verticalAlign: "middle" }}
                  >
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Genero</th>
                    <th style={{ width: "100%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.invitados.map((i) => {
                    return (
                      <tr
                        key={i._id}
                        style={{ fontSize: "12px", verticalAlign: "middle" }}
                      >
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.primer_nombre}
                        </td>
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.segundo_nombre}
                        </td>
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.primer_apellido}
                        </td>
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.segundo_apellido}
                        </td>
                        <td style={{ backgroundColor: "#30115e" }}>{i.edad}</td>
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.telefono}
                        </td>
                        <td style={{ backgroundColor: "#30115e" }}>
                          {i.genero}
                        </td>
                        <td className="row px-3 mr-0">
                          <button
                            className="btn btn-outline-info"
                            style={{
                              width: "15px",
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => this.editarInvitado(i._id)}
                          >
                            <i className="small material-icons">edit</i>
                          </button>
                          <button
                            className="btn btn-outline-danger mx-1"
                            style={{
                              width: "15px",
                              height: "30px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => this.eliminarInvitado(i._id)}
                          >
                            <i className="small material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

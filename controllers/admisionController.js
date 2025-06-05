const { Admision, Paciente, Usuario } = require('../models/sync');


async function mostrarFormularioNuevaAdmision(req, res) {
  try {
    res.render('admision/nueva_admision', {
      title: 'Registrar Nueva Admisión de Paciente',
    });
  } catch (error) {
    console.error("Error al mostrar el formulario de nueva admisión:", error);
    res.status(500).send("Error al cargar el formulario de admisión.");
  }
}

async function procesarNuevaAdmision(req, res) {
  try {
    console.log('Datos recibidos para la admisión:', req.body);
    const {
      dniPaciente,
      nombrePaciente: formNombrePaciente,
      apellidoPaciente: formApellidoPaciente,
      fechaNacimientoPaciente: formFechaNacimiento,
      generoPaciente: formGenero,
      fechaHoraAdmision,
      motivoDeAdmision,
      tipoAdmision,
      medicoDerivante,
      datosSeguroMedico
    } = req.body;

    const usuarioIdRegistra = req.session.usuarioId;
    if (!usuarioIdRegistra) {
      console.error("Error: No se pudo obtener el usuarioId de la sesión para registrar la admisión.");
      return res.status(403).render('admision/nueva_admision', {
        title: 'Registrar Nueva Admisión de Paciente',
        error: 'Error de autenticación. No se pudo identificar al usuario registrador.',
        formData: req.body
      });
    }

    let paciente;
    const [pacienteEncontradoOcreado, fueCreado] = await Paciente.findOrCreate({
      where: { dni: dniPaciente },
      defaults: {
        nombrePaciente: formNombrePaciente,
        apellidoPaciente: formApellidoPaciente,
        dni: dniPaciente,
        fechaNacimientoPaciente: formFechaNacimiento,
        genero: formGenero,
      }
    });
    paciente = pacienteEncontradoOcreado;

    if (!fueCreado) {
      let necesitaGuardar = false;
      if (formNombrePaciente && paciente.nombrePaciente !== formNombrePaciente) {
        paciente.nombrePaciente = formNombrePaciente;
        necesitaGuardar = true;
      }
      if (formApellidoPaciente && paciente.apellidoPaciente !== formApellidoPaciente) {
        paciente.apellidoPaciente = formApellidoPaciente;
        necesitaGuardar = true;
      }
      if (formFechaNacimiento && paciente.fechaNacimientoPaciente !== formFechaNacimiento) {
        paciente.fechaNacimientoPaciente = formFechaNacimiento;
        necesitaGuardar = true;
      }
      if (formGenero && paciente.genero !== formGenero) {
        paciente.genero = formGenero;
        necesitaGuardar = true;
      }

      if (necesitaGuardar) {
        await paciente.save();
        console.log('Datos del paciente actualizados.');
      }
    } else {
      console.log(`Nuevo paciente creado con DNI: ${dniPaciente}, ID: ${paciente.id}`);
    }

    const nuevaAdmision = await Admision.create({
      fechaHoraAdmision: fechaHoraAdmision,
      motivoDeAdmision: motivoDeAdmision,
      tipoAdmision: tipoAdmision,
      medicoDerivante: medicoDerivante || null,
      datosSeguroMedico: datosSeguroMedico || null,
      pacienteId: paciente.id,
      usuarioId: usuarioIdRegistra,
    });

    console.log('Nueva admisión creada con ID:', nuevaAdmision.id);
    res.redirect("/");


  } catch (error) {
    console.error("Error al procesar nueva admisión:", error);
    res.status(500).render('admision/nueva_admision', {
      title: 'Registrar Nueva Admisión de Paciente',
      error: 'Ocurrió un error al procesar la admisión. Revise los datos e intente de nuevo.',
      formData: req.body
    });
  }
}

module.exports = {
  mostrarFormularioNuevaAdmision,
  procesarNuevaAdmision
};

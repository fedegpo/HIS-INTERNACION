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
      nombrePaciente,
      apellidoPaciente,
      fechaNacimientoPaciente,
      generoPaciente,
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
        nombres: nombrePaciente,
        apellidos: apellidoPaciente,
        dni: dniPaciente,
        fechaNacimiento: fechaNacimientoPaciente,
        genero: generoPaciente,
      }
    });
    paciente = pacienteEncontradoOcreado;

    if (!fueCreado) {
      console.log(`Paciente encontrado con DNI: ${dniPaciente}, ID: ${paciente.id}`);
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
    res.send(`¡Admisión registrada con éxito para el paciente DNI ${paciente.dni}! ID de Admisión: ${nuevaAdmision.id}. (Redirección pendiente)`);


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

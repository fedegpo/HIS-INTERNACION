const { Paciente, Admision } = require('../models/sync');

async function mostrarFormularioEditar(req, res) {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }
    res.render('paciente/editar', {
      title: `Editar Paciente: ${paciente.nombrePaciente} ${paciente.apellidoPaciente}`,
      paciente: paciente
    });
  } catch (error) {
    console.error("Error al mostrar el formulario de edición:", error);
    res.status(500).send("Error al cargar el formulario.");
  }
}

async function procesarEdicion(req, res) {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }
    await paciente.update(req.body);
    console.log(`Paciente ID: ${paciente.id} actualizado exitosamente.`);
    res.redirect('/admisiones');
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    res.status(500).render('paciente/editar', {
      title: 'Editar Paciente',
      error: 'Ocurrió un error al actualizar. Revise los datos.',
      paciente: req.body
    });
  }
}

async function mostrarFormularioEmergencia(req, res) {
  res.render('paciente/emergencia', {
    title: 'Ingreso de Emergencia'
  });
}

async function procesarAltaEmergencia(req, res) {
  try {
    const { nombrePaciente, apellidoPaciente, genero, dni } = req.body;

    if (!nombrePaciente || !apellidoPaciente || !genero) {
        return res.render('paciente/emergencia', {
            title: 'Ingreso de Emergencia',
            error: 'Nombre, Apellido y Género son obligatorios.'
        });
    }

    const nuevoPaciente = await Paciente.create({
      nombrePaciente,
      apellidoPaciente,
      genero,
      dni: dni || null,
      tipoAdmision: 'EMERGENCIA',
    });
    console.log(`Paciente de emergencia ID: ${nuevoPaciente.id} creado.`);

    const nuevaAdmision = await Admision.create({
        fechaHoraAdmision: new Date(),
        motivoDeAdmision: 'Ingreso por emergencia',
        tipoAdmision: 'Emergencia',
        pacienteId: nuevoPaciente.id,
        usuarioId: req.session.usuarioId,
    });
    console.log(`Admisión de emergencia ID: ${nuevaAdmision.id} creada para el paciente ID: ${nuevoPaciente.id}`);

    res.redirect('/admisiones');

  } catch (error) {
    console.error("Error al procesar alta de emergencia:", error);
    res.status(500).send(`Error interno: ${error.message}`);
  }
}

module.exports = {
  mostrarFormularioEditar,
  procesarEdicion,
  mostrarFormularioEmergencia,
  procesarAltaEmergencia
};

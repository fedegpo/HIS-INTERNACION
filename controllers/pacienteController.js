const { Paciente } = require('../models/sync');

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

module.exports = {
  mostrarFormularioEditar,
  procesarEdicion
};

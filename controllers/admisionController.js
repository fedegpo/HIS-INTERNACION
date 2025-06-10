const { sequelize, Admision, Paciente, Usuario, Cama, Habitacion, Ala } = require('../models/sync');


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

async function mostrarFormularioAsignarCama(req, res) {
  try {
    const admisionId = req.params.admisionId;

    const admision = await Admision.findByPk(admisionId, {
      include: {
        model: Paciente,
        as: 'paciente'
      }
    });

    if (!admision) {
      return res.status(404).send('Admisión no encontrada');
    }

    const camasDisponibles = await Cama.findAll({
      where: {
        estado: 'Libre'
      },
      include: [
        {
          model: Habitacion,
          as: 'habitacion',
          include: {
            model: Ala,
            as: 'ala'
          }
        }
      ],
    });

    res.render('admision/asignar_cama', {
      title: `Asignar Cama para Admisión #${admision.id}`,
      admision: admision,
      camasDisponibles: camasDisponibles
    });

  } catch (error) {
    console.error("Error al mostrar el formulario de asignar cama:", error);
    res.status(500).send("Error al cargar la página de asignación de cama.");
  }
}

async function procesarAsignacionCama(req, res) {
  try {
    const { admisionId } = req.params;
    const { camaId } = req.body;

    if (!camaId) {

      return res.redirect(`/admisiones/${admisionId}/asignar-cama`);
    }

    const admision = await Admision.findByPk(admisionId);
    const cama = await Cama.findByPk(camaId);

    if (!admision || !cama) {
      return res.status(404).send('Admisión o Cama no encontrada.');
    }
    if (cama.estado !== 'Libre') {

      return res.redirect(`/admisiones/${admisionId}/asignar-cama`);
    }

    admision.camaId = cama.id;
    cama.estado = 'Ocupada';

    await admision.save();
    await cama.save();

    console.log(`Cama ID: ${cama.id} asignada a Admisión ID: ${admision.id}`);
    res.redirect(`/`);

  } catch (error) {
    console.error("Error al procesar la asignación de cama:", error);
    res.status(500).send("Error interno al intentar asignar la cama.");
  }
}

async function listarAdmisiones(req, res) {
  try {
    const admisiones = await Admision.findAll({
      where: { estadoAdmision: 'Activa' },

      include: [
        {
          model: Paciente,
          as: 'paciente',
          attributes: ['nombrePaciente', 'apellidoPaciente', 'dni']
        },
        {
          model: Cama,
          as: 'camaAsignada',
          include: {
            model: Habitacion,
            as: 'habitacion',
            include: {
              model: Ala,
              as: 'ala'
            }
          }
        }
      ],
      order: [['fechaHoraAdmision', 'DESC']]
    });

    res.render('admision/lista', {
      title: 'Admisiones Activas',
      admisiones: admisiones
    });

  } catch (error) {
    console.error("Error al listar las admisiones:", error);
    res.status(500).send("Error al cargar la lista de admisiones.");
  }
}

async function verDetalleAdmision(req, res) {
  try {
    const { admisionId } = req.params;

    const admision = await Admision.findByPk(admisionId, {
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Usuario, as: 'registradoPor', attributes: ['nombreUsuario'] },
        {
          model: Cama, as: 'camaAsignada', required: false,
          include: {
            model: Habitacion, as: 'habitacion',
            include: { model: Ala, as: 'ala' }
          }
        }
      ]
    });

    if (!admision) {
      return res.status(404).render('error', { title: 'Error', mensaje: 'Admisión no encontrada.' });
    }

    res.render('admision/detalle', {
      title: `Detalle de Admisión #${admision.id}`,
      admision: admision
    });

  } catch (error) {
    console.error("Error al ver el detalle de la admisión:", error);
    res.status(500).send("Error al cargar los detalles de la admisión.");
  }
}

async function procesarAlta(req, res) {
  const t = await sequelize.transaction();

  try {
    const { admisionId } = req.params;

    const admision = await Admision.findByPk(admisionId, {
      include: [{ model: Cama, as: 'camaAsignada' }],
      transaction: t
    });

    if (!admision) {
      await t.rollback();
      return res.status(404).send('Admisión no encontrada.');
    }
    if (admision.estadoAdmision !== 'Activa') {
      await t.rollback();
      return res.redirect(`/admisiones/${admisionId}`);
    }

    admision.estadoAdmision = 'Finalizada';
    admision.fechaHoraAlta = new Date();
    await admision.save({ transaction: t });

    if (admision.camaAsignada) {
      const cama = admision.camaAsignada;
      cama.estado = 'En Limpieza';
      await cama.save({ transaction: t });
    }

    await t.commit();
    console.log(`Admisión ID: ${admisionId} finalizada exitosamente.`);

    res.redirect(`/admisiones/${admisionId}`);

  } catch (error) {
    await t.rollback();
    console.error("Error al procesar el alta:", error);
    res.redirect(`/admisiones/${req.params.admisionId}`);
  }
}



module.exports = {
  mostrarFormularioNuevaAdmision,
  procesarNuevaAdmision,
  mostrarFormularioAsignarCama,
  procesarAsignacionCama,
  listarAdmisiones,
  verDetalleAdmision,
  procesarAlta,
};

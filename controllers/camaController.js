const { Cama, Habitacion, Ala, Admision, Paciente } = require('../models/sync');

async function listarCamas(req, res) {
  try {
    const camas = await Cama.findAll({
      include: [
        {
          model: Habitacion, as: 'habitacion',
          include: { model: Ala, as: 'ala' }
        },
        {
          model: Admision, as: 'admisionActual', required: false,
          where: { estadoAdmision: 'Activa' },
          include: { model: Paciente, as: 'paciente' }
        }
      ],
      order: [
        [{ model: Habitacion, as: 'habitacion' }, { model: Ala, as: 'ala' }, 'nombre', 'ASC'],
        [{ model: Habitacion, as: 'habitacion' }, 'numero', 'ASC'],
        ['codigo', 'ASC']
      ]
    });
    res.render('gestion/camas_lista', { title: 'Gestión y Estado de Camas', camas });
  } catch (error) {
    console.error("Error al listar las camas:", error);
    res.status(500).send("Error al cargar la gestión de camas.");
  }
}

module.exports = { listarCamas };

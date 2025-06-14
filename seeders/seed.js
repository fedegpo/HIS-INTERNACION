const sequelize = require('../db/connection');
const db = require('../models/sync');

async function seed() {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Base de datos reseteada y tablas creadas exitosamente.');

    const alas = await db.Ala.bulkCreate([
      { nombre: 'Ala Norte', piso: '1' },
      { nombre: 'Ala Sur - Pediatría', piso: '2' },
      { nombre: 'Ala Este - Cirugía', piso: '3' },
    ]);
    console.log(`${alas.length} alas han sido creadas.`);

    const habitaciones = await db.Habitacion.bulkCreate([
      { numero: '101', tipo: 'Doble', alaId: alas[0].id },
      { numero: '102', tipo: 'Individual', alaId: alas[0].id },
      { numero: '103', tipo: 'Doble', alaId: alas[0].id },
      { numero: '201', tipo: 'Doble', alaId: alas[1].id },
      { numero: '301', tipo: 'Individual', alaId: alas[2].id },
    ]);
    console.log(`${habitaciones.length} habitaciones han sido creadas.`);

    const hab101 = habitaciones.find(h => h.numero === '101');
    const hab102 = habitaciones.find(h => h.numero === '102');
    const hab201 = habitaciones.find(h => h.numero === '201');
    const hab103 = habitaciones.find(h => h.numero === '103');
    const hab301 = habitaciones.find(h => h.numero === '301');

    const camas = await db.Cama.bulkCreate([
      { codigo: '101-A', estado: 'Libre', habitacionId: hab101.id },
      { codigo: '101-B', estado: 'Ocupada', habitacionId: hab101.id },
      { codigo: '102-A', estado: 'Libre', habitacionId: hab102.id },
      { codigo: '201-A', estado: 'En Limpieza', habitacionId: hab201.id },
      { codigo: '201-B', estado: 'Libre', habitacionId: hab201.id },
      { codigo: '103-A', estado: 'Libre', habitacionId: hab103.id },
      { codigo: '103-B', estado: 'Libre', habitacionId: hab103.id },
      { codigo: '301-A', estado: 'En Mantenimiento', habitacionId: hab301.id },
    ]);
    console.log(`${camas.length} camas han sido creadas.`);

    console.log('¡Datos de prueba insertados exitosamente!');

  } catch (error) {
    console.error('Error durante el proceso de seeding:', error);
  } finally {
    await db.sequelize.close();
  }
}

seed();

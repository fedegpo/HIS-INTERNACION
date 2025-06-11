-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2025 a las 19:29:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `his_node`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admisiones`
--

CREATE TABLE `admisiones` (
  `id` int(11) NOT NULL,
  `fechaHoraAdmision` datetime NOT NULL,
  `motivoDeAdmision` varchar(255) NOT NULL,
  `pacienteId` int(11) NOT NULL,
  `tipoAdmision` enum('Programada','Derivación Médica','Emergencia','Derivación Guardia') NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `medicoDerivante` varchar(255) DEFAULT NULL,
  `datosSeguroMedico` text DEFAULT NULL,
  `estadoAdmision` enum('Activa','Pre-Admisión','Cancelada','Finalizada') NOT NULL DEFAULT 'Activa',
  `fechaHoraAlta` datetime DEFAULT NULL,
  `camaId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admisiones`
--

INSERT INTO `admisiones` (`id`, `fechaHoraAdmision`, `motivoDeAdmision`, `pacienteId`, `tipoAdmision`, `usuarioId`, `medicoDerivante`, `datosSeguroMedico`, `estadoAdmision`, `fechaHoraAlta`, `camaId`, `createdAt`, `updatedAt`) VALUES
(1, '2025-06-10 23:14:00', 'Dolor', 1, 'Programada', 1, 'Juan', '123', 'Activa', NULL, NULL, '2025-06-10 23:14:50', '2025-06-10 23:14:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alas`
--

CREATE TABLE `alas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `piso` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alas`
--

INSERT INTO `alas` (`id`, `nombre`, `piso`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 'Ala Norte', '1', NULL, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(2, 'Ala Sur - Pediatría', '2', NULL, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(3, 'Ala Este - Cirugía', '3', NULL, '2025-06-10 23:13:54', '2025-06-10 23:13:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `estado` enum('Libre','Ocupada','En Limpieza','En Mantenimiento') NOT NULL DEFAULT 'Libre',
  `habitacionId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`id`, `codigo`, `estado`, `habitacionId`, `createdAt`, `updatedAt`) VALUES
(1, '101-A', 'Libre', 1, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(2, '101-B', 'Ocupada', 1, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(3, '102-A', 'Libre', 2, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(4, '201-A', 'En Limpieza', 3, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(5, '201-B', 'Libre', 3, '2025-06-10 23:13:54', '2025-06-10 23:13:54'),
(6, '301-A', 'En Mantenimiento', 4, '2025-06-10 23:13:54', '2025-06-10 23:13:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `tipo` enum('Individual','Doble') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `alaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `numero`, `tipo`, `createdAt`, `updatedAt`, `alaId`) VALUES
(1, '101', 'Doble', '2025-06-10 23:13:54', '2025-06-10 23:13:54', 1),
(2, '102', 'Individual', '2025-06-10 23:13:54', '2025-06-10 23:13:54', 1),
(3, '201', 'Doble', '2025-06-10 23:13:54', '2025-06-10 23:13:54', 2),
(4, '301', 'Individual', '2025-06-10 23:13:54', '2025-06-10 23:13:54', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombrePaciente` varchar(255) NOT NULL,
  `apellidoPaciente` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `genero` enum('M','F') NOT NULL,
  `fechaNacimientoPaciente` date NOT NULL,
  `numeroCelular` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombrePaciente`, `apellidoPaciente`, `dni`, `genero`, `fechaNacimientoPaciente`, `numeroCelular`, `createdAt`, `updatedAt`) VALUES
(1, 'Federico', 'Grippo', '44752589', 'M', '2003-04-01', '2664927113', '2025-06-10 23:14:50', '2025-06-10 23:57:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombreUsuario` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL DEFAULT 'administrador',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombreUsuario`, `contraseña`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'fede', '$2b$10$Lm.Vx.UvjJiMuXVwBqxF6.iFo4SyJroWgNs0px05NM5qMmL4UU5um', 'administrador', '2025-06-10 23:14:02', '2025-06-10 23:14:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pacienteId` (`pacienteId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `camaId` (`camaId`);

--
-- Indices de la tabla `alas`
--
ALTER TABLE `alas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `nombre_2` (`nombre`),
  ADD UNIQUE KEY `nombre_3` (`nombre`),
  ADD UNIQUE KEY `nombre_4` (`nombre`),
  ADD UNIQUE KEY `nombre_5` (`nombre`),
  ADD UNIQUE KEY `nombre_6` (`nombre`),
  ADD UNIQUE KEY `nombre_7` (`nombre`),
  ADD UNIQUE KEY `nombre_8` (`nombre`),
  ADD UNIQUE KEY `nombre_9` (`nombre`),
  ADD UNIQUE KEY `nombre_10` (`nombre`),
  ADD UNIQUE KEY `nombre_11` (`nombre`),
  ADD UNIQUE KEY `nombre_12` (`nombre`),
  ADD UNIQUE KEY `nombre_13` (`nombre`),
  ADD UNIQUE KEY `nombre_14` (`nombre`),
  ADD UNIQUE KEY `nombre_15` (`nombre`),
  ADD UNIQUE KEY `nombre_16` (`nombre`);

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `codigo_2` (`codigo`),
  ADD UNIQUE KEY `codigo_3` (`codigo`),
  ADD UNIQUE KEY `codigo_4` (`codigo`),
  ADD UNIQUE KEY `codigo_5` (`codigo`),
  ADD UNIQUE KEY `codigo_6` (`codigo`),
  ADD UNIQUE KEY `codigo_7` (`codigo`),
  ADD UNIQUE KEY `codigo_8` (`codigo`),
  ADD UNIQUE KEY `codigo_9` (`codigo`),
  ADD UNIQUE KEY `codigo_10` (`codigo`),
  ADD UNIQUE KEY `codigo_11` (`codigo`),
  ADD UNIQUE KEY `codigo_12` (`codigo`),
  ADD UNIQUE KEY `codigo_13` (`codigo`),
  ADD UNIQUE KEY `codigo_14` (`codigo`),
  ADD UNIQUE KEY `codigo_15` (`codigo`),
  ADD UNIQUE KEY `codigo_16` (`codigo`),
  ADD KEY `habitacionId` (`habitacionId`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alaId` (`alaId`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `dni_6` (`dni`),
  ADD UNIQUE KEY `dni_7` (`dni`),
  ADD UNIQUE KEY `dni_8` (`dni`),
  ADD UNIQUE KEY `dni_9` (`dni`),
  ADD UNIQUE KEY `dni_10` (`dni`),
  ADD UNIQUE KEY `dni_11` (`dni`),
  ADD UNIQUE KEY `dni_12` (`dni`),
  ADD UNIQUE KEY `dni_13` (`dni`),
  ADD UNIQUE KEY `dni_14` (`dni`),
  ADD UNIQUE KEY `dni_15` (`dni`),
  ADD UNIQUE KEY `dni_16` (`dni`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_2` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_3` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_4` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_5` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_6` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_7` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_8` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_9` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_10` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_11` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_12` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_13` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_14` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_15` (`nombreUsuario`),
  ADD UNIQUE KEY `nombreUsuario_16` (`nombreUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alas`
--
ALTER TABLE `alas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD CONSTRAINT `admisiones_ibfk_46` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_47` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_48` FOREIGN KEY (`camaId`) REFERENCES `camas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`habitacionId`) REFERENCES `habitaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`alaId`) REFERENCES `alas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

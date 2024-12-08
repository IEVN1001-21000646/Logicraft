-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-12-2024 a las 19:09:40
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `logicraft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ads`
--

CREATE TABLE `ads` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `views` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ads`
--

INSERT INTO `ads` (`id`, `name`, `duration`, `views`) VALUES
(13, 'lola', 78, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apis`
--

CREATE TABLE `apis` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `apis`
--

INSERT INTO `apis` (`id`, `name`, `location`) VALUES
(3, 'Alan', 'Afganistan'),
(4, 'Jaime', 'España'),
(5, 'Alan', 'Panama'),
(8, 'Api_UTL', 'Mexico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `downloads`
--

CREATE TABLE `downloads` (
  `id` int NOT NULL,
  `payment_id` int DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `download_type` enum('demo','full') NOT NULL,
  `downloaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `downloads`
--

INSERT INTO `downloads` (`id`, `payment_id`, `file_name`, `download_type`, `downloaded_at`) VALUES
(16, 67, 'Logicraft_full.apk', 'full', '2024-11-25 22:07:33'),
(17, NULL, 'Logicraft().apk', 'demo', '2024-11-25 22:07:46'),
(18, NULL, 'Logicraft().apk', 'demo', '2024-11-25 22:15:22'),
(20, NULL, 'Logicraft().apk', 'demo', '2024-11-25 22:19:49'),
(21, 70, 'Logicraft_full.apk', 'full', '2024-11-25 22:20:21'),
(22, NULL, 'Logicraft().apk', 'demo', '2024-12-02 04:12:25'),
(23, 71, 'Logicraft_full.apk', 'full', '2024-12-02 04:13:00'),
(24, NULL, 'Logicraft().apk', 'demo', '2024-12-02 20:11:22'),
(25, 74, 'Logicraft_full.apk', 'full', '2024-12-02 20:12:04'),
(26, 75, 'Logicraft_full.apk', 'full', '2024-12-02 20:13:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `method` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `method`, `amount`, `status`, `created_at`) VALUES
(67, 'tarjeta', 199.00, 'completed', '2024-11-25 22:07:32'),
(68, 'oxxo', 199.00, 'completed', '2024-11-25 22:15:39'),
(70, 'tarjeta', 199.00, 'completed', '2024-11-25 22:20:20'),
(71, 'tarjeta', 199.00, 'completed', '2024-12-02 04:12:59'),
(72, 'oxxo', 199.00, 'completed', '2024-12-02 04:13:12'),
(73, 'oxxo', 199.00, 'pending', '2024-12-02 04:16:16'),
(74, 'tarjeta', 199.00, 'completed', '2024-12-02 20:12:03'),
(75, 'tarjeta', 199.00, 'completed', '2024-12-02 20:13:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_details`
--

CREATE TABLE `payment_details` (
  `id` int NOT NULL,
  `payment_id` int NOT NULL,
  `card_name` varchar(100) DEFAULT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `oxxo_reference` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `payment_details`
--

INSERT INTO `payment_details` (`id`, `payment_id`, `card_name`, `card_number`, `cvv`, `expiry_date`, `bank`, `oxxo_reference`) VALUES
(47, 67, 'Saldo', '1234564444444444', '123', '2024-11-26', 'Banamex', NULL),
(48, 68, NULL, NULL, NULL, NULL, NULL, 'OXXO-68-1'),
(50, 70, 'Alan Emiliano Alcaraz Rocha', '3333333333333333', '333', '2024-11-20', 'BBVA', NULL),
(51, 71, 'Alan Emiliano Alcaraz Rocha', '1222222222222222', '321', '2025-01-02', 'Banamex', NULL),
(52, 72, NULL, NULL, NULL, NULL, NULL, 'OXXO-72-1'),
(53, 74, 'Alan Emiliano Alcaraz Rocha', '5565874123695478', '222', '2025-01-08', 'Banamex', NULL),
(54, 75, 'Alan Emiliano Alcaraz Rocha', '4788888888888888', '888', '2024-12-25', 'Banorte', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','client','editor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(10, 'jlooo', '@hotmail.com', 'nnnnl', 'admin'),
(13, 'Emilliano Alcaraz', 'Emi@gmail.com', '123456', 'admin'),
(15, 'holaaaaaa', 'vdbmbv szndmlW11', 'default_password', 'editor'),
(16, 'lolla', 'l@gmail.com', '1234', 'client'),
(28, 'Alan', 'a@gmail.com', 'default_password', 'editor'),
(31, 'Jaime', 'oooo@gmail.com', 'default_password', 'client'),
(33, 'lpoi', 'lkkkk', 'poi9098', 'client'),
(34, 'Alan', 'lola@gmail.com', '1234', 'client');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `apis`
--
ALTER TABLE `apis`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `downloads`
--
ALTER TABLE `downloads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payment_id` (`payment_id`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `apis`
--
ALTER TABLE `apis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `payment_details`
--
ALTER TABLE `payment_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `downloads`
--
ALTER TABLE `downloads`
  ADD CONSTRAINT `fk_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

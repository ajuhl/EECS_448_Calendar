-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 05, 2016 at 09:47 PM
-- Server version: 5.1.73
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sdiffin`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `stop` datetime NOT NULL,
  `repeat` varchar(8) NOT NULL DEFAULT 'n',
  `event` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `month` (`start`,`stop`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=62 ;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `start`, `stop`, `repeat`, `event`) VALUES
(59, '2016-10-03 01:00:00', '2016-10-03 02:00:00', 'b135', 'Alaska Day'),
(57, '2016-09-21 12:30:00', '2016-09-21 23:30:00', 'n', 'September equinox'),
(58, '2017-03-10 00:00:00', '2017-03-13 00:00:00', 'n', 'Columbus Day'),
(54, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Commencement'),
(55, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Labor Day Holiday - No classes'),
(52, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'First day of Finals'),
(53, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last day of Finals'),
(50, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last day of classes'),
(51, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Stop Day'),
(49, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last Day of Spring Break'),
(47, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last day to enroll online'),
(48, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'First day of Spring Break'),
(46, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'First day of classes'),
(42, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Thanksgiving Break Last Day'),
(45, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Enrollment Appointments begin'),
(41, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Thanksgiving Break First Day'),
(39, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Stop Day'),
(40, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last day of classes'),
(38, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'First day of fall break'),
(37, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Last Day of Fall Break'),
(36, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'First Day of Fall Break'),
(35, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'All of our code is due!'),
(44, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Diplomas available'),
(43, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'n', 'Nicks Birthday');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

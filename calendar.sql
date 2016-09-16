-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 16, 2016 at 01:46 AM
-- Server version: 5.1.73
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nbukaty`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `month` varchar(255) NOT NULL,
  `day` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `month` (`month`,`day`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=62 ;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `month`, `day`, `event`) VALUES
(59, '9', '18', 'Alaska Day'),
(57, '8', '22', 'September equinox'),
(58, '9', '10', 'Columbus Day'),
(54, '4', '14', 'Commencement'),
(55, '8', '5', 'Labor Day Holiday - No classes'),
(52, '4', '8', 'First day of Finals'),
(53, '4', '12', 'Last day of Finals'),
(50, '4', '4', 'Last day of classes'),
(51, '4', '5', 'Stop Day'),
(49, '2', '26', 'Last Day of Spring Break'),
(47, '0', '23', 'Last day to enroll online'),
(48, '2', '20', 'First day of Spring Break'),
(46, '0', '17', 'First day of classes'),
(42, '10', '27', 'Thanksgiving Break Last Day'),
(45, '9', '21', 'Enrollment Appointments begin'),
(41, '10', '23', 'Thanksgiving Break First Day'),
(39, '11', '9', 'Stop Day'),
(40, '11', '8', 'Last day of classes'),
(38, '9', '8', 'First day of fall break'),
(37, '9', '11', 'Last Day of Fall Break'),
(36, '9', '11', 'First Day of Fall Break'),
(35, '8', '18', 'All of our code is due!'),
(44, '1', '6', 'Diplomas available'),
(43, '10', '29', 'Nicks Birthday');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

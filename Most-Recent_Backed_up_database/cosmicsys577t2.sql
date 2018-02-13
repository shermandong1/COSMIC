-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 04, 2018 at 03:28 AM
-- Server version: 5.6.38
-- PHP Version: 7.1.12



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cosmicsys577t2`
--

-- --------------------------------------------------------

-- Table structure for table `items`
--
-- DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `itemid` int(11) NOT NULL,
  `hardware` tinyint(4) NOT NULL,
  `name` varchar(200) NOT NULL,
  `desc` varchar(500) NOT NULL,
  `tag1` varchar(80) DEFAULT NULL,
  `tag2` varchar(80) DEFAULT NULL,
  `tag3` varchar(80) DEFAULT NULL,
  `tag4` varchar(80) DEFAULT NULL,
  `tag5` varchar(80) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `quantityAvailable` int(11) NOT NULL,
  `quantityTotal` int(11) NOT NULL,
  `locationid` int(11) DEFAULT NULL,
  `reorderThreshold` int(11) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--
-- LOCK TABLES `items` WRITE;

INSERT INTO `items` (`itemid`, `hardware`, `name`, `desc`, `tag1`, `tag2`, `tag3`, `tag4`, `tag5`, `status`, `quantityAvailable`, `quantityTotal`, `locationid`, `reorderThreshold`) VALUES
(1, 1, 'Arduino Uno', 'Single-board microcontroller. Ages 10+. Measured in units of Arduinos..', 'Arduino', 'Computer', NULL, NULL, NULL, 'Available', 13, 13, 1, 4),
(2, 1, 'BIOLOID STEM Standard Robot Kit', 'Ages 8+. Measured in units of complete kits.', 'Robot', NULL, NULL, NULL, NULL, 'Available', 5, 5, 2, 4),
(15, 0, 'AAA Batteries', 'Standard batteries. Measured in units of battery.', 'Battery', 'AAA', 'AAA', NULL, NULL, 'Available', 90, 99, 2, 10),
(16, 0, 'Colored Pencils', 'Colored pencils. Measured in units per box of pencils.', 'Crafts', 'Pencils', NULL, NULL, NULL, 'Available', 10, 10, 1, 2),
(17, 1, 'Laptop', 'Dell', 'Computer', NULL, NULL, NULL, NULL, 'Available', 39, 39, 1, 2),
(28, 1, '3D Printer Pro', '3D printer each', '3D', 'Design', NULL, NULL, NULL, 'Available', 1, 1, 3, 0);
-- UNLOCK TABLES;
-- --------------------------------------------------------
CREATE TABLE `locations` (
  `locationid` int(11) NOT NULL,
  `location` varchar(200) NOT NULL
  )ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `locations` (`locationid`, `location`) VALUES
(1, 'USC'),
(2, 'Off Site'),
(3,'RTH 210D');

--
--
-- Table structure for table `items_checkedout`
--
-- DROP TABLE IF EXISTS `items_checkedout`;

CREATE TABLE `items_checkedout` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `return_date` varchar(80) DEFAULT NULL,
  `checkout_user` varchar(80) DEFAULT NULL,
  `checkout_useremail` varchar(80) DEFAULT NULL,
  `checkout_adminusername` varchar(80) DEFAULT NULL,
  `checkout_adminemail` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items_checkedout`
--



-- --------------------------------------------------------

--
-- Table structure for table `items_reserved`
--
-- DROP TABLE IF EXISTS `items_reserved`;

CREATE TABLE `items_reserved` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `useremail` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL,
  `daterange` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--
-- DROP TABLE IF EXISTS `superadmin`;

CREATE TABLE `superadmin` (
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `superadmin`
--
-- LOCK TABLES `superadmin` WRITE;

INSERT INTO `superadmin` (`title`, `name`, `email`) VALUES
('Director', 'Darin Gray', 'aleem@usc.edu'),
('Inventory Manager', 'Xue Fei', 'aleem@usc.edu');
-- UNLOCK TABLES:
-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--
-- LOCK TABLES `users` WRITE;

INSERT INTO `users` (`uid`, `name`, `email`, `type`, `password`, `created`) VALUES
(204, 'Sarah Wu', 'sarahlwu@usc.edu', 'Admin', '$2a$10$5d7474b7f9b612361a50fuB87H7qkZmGgLsPoeL9tVqQ7PUYCluEi', '2017-09-29 05:44:13'),
(205, 'Jenny Miller', 'jmiller@jmiller.com', 'USC Student', '$2a$10$11a863619324d25fe100aupJnUm6vy.KB7Yohys4/J3vn7YUn1btO', '2017-09-29 05:44:12'),
(209, 'Mishaal Aleem', 'aleem@usc.edu', 'Admin', '$2a$10$fb80074b01fe3a3b46e8duSVCk1GdADMlgpURG4G64jgKX/XMVcBG', '2017-11-02 17:29:59'),
(210, 'Sam Lehardi', 'lehardi@usc.edu', 'Admin', '$2a$10$9521d45d62ea36b8d9c90u18iijTf67SYHlJtUTGF27iVQDkmQ9Z.', '2017-11-02 17:30:52'),
(211, 'Rachel Inouye', 'rinouye@usc.edu', 'Admin', '$2a$10$d74b0880db220b08cd25au0PJmfqnTbN5oc5q7v7pGidqidDPIQjK', '2017-11-02 17:31:20'),
(212, 'Terence Williams', 'terencew@usc.edu', 'Admin', '$2a$10$10e7bfcba73800874e596ewJKtmE1Q4YOdrwPJj66N1ydFFVqxR12', '2017-11-02 17:31:46'),
(214, 'Nick Kwong', 'kwongn@usc.edu', 'Admin', '$2a$10$3e2cbea234d237687537aOLirvuJzlPI6fmgiPMdeWllnkoi90n.6', '2017-11-02 17:33:11'),
(218, 'Sitan Gao', 'sitangao@usc.edu', 'Admin', '$2a$10$b321d09283da4a665013eOncq1os7NfeCZVPCkfuVE8ITs8e5.PcO', '2017-11-08 19:17:26'),
(225, 'sam villarreal', 'samuelvi@usc.edu', 'Admin', '$2a$10$d87b99763fee3e0c335bfe7o0z4xz0yT.oJdu3eCNb8CyhlkH7TGa', '2017-11-18 08:41:09'),
(230, 'Darin Gray', 'daring@usc.edu', 'Admin', '$2a$10$244d278375ec992a8c957u0VKobp2cmKFkuIz/Rxa.acFAgkBaeB.', '2017-11-19 20:42:26');
-- UNLOCK TABLES
--


ALTER TABLE `locations`
	MODIFY `locationid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29,
  ADD PRIMARY KEY(`locationid`);

-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `items_checkedout`
--
ALTER TABLE `items_checkedout`
  ADD PRIMARY KEY (`itemid`,`checkout_user`, `checkout_useremail`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `items_reserved`
--
ALTER TABLE `items_reserved`
  ADD PRIMARY KEY (`itemid`,`username`,`useremail`,`quantity`,`daterange`),
  ADD KEY `items_reserved_ibfk_2` (`uid`);

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`title`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);





--
-- AUTO_INCREMENT for dumped tables
--


--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29,
   ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`locationid`) REFERENCES `locations` (`locationid`);


--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items_checkedout`
--
ALTER TABLE `items_checkedout`
  ADD CONSTRAINT `items_checkedout_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  ADD CONSTRAINT `items_checkedout_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);

--
-- Constraints for table `items_reserved`
--
ALTER TABLE `items_reserved`
  ADD CONSTRAINT `items_reserved_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  ADD CONSTRAINT `items_reserved_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`);
--
-- Constraints for table `locations`
--

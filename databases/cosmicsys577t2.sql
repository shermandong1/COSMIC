-- MySQL dump 10.13  Distrib 5.5.19, for Linux (x86_64)
--
-- Host: 45.40.164.96    Database: cosmicsys577t2
-- ------------------------------------------------------
-- Server version	5.5.51-38.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `itemid` int(11) NOT NULL AUTO_INCREMENT,
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
  `location` varchar(100) DEFAULT NULL,
  `reorderThreshold` int(11) NOT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,'Arduino Uno','Single-board microcontroller. Ages 10+. Measured in units of Arduinos..','Arduino','Computer',NULL,NULL,NULL,'Available',13,13,'A125',4);
INSERT INTO `items` VALUES (2,1,'BIOLOID STEM Standard Robot Kit','Ages 8+. Measured in units of complete kits.','Robot',NULL,NULL,NULL,NULL,'Available',5,5,'B26',4);
INSERT INTO `items` VALUES (15,0,'AAA Batteries','Standard batteries. Measured in units of battery.','Battery','AAA','AAA',NULL,NULL,'Available',99,99,'A1234',10);
INSERT INTO `items` VALUES (16,0,'Colored Pencils','Colored pencils. Measured in units per box of pencils.','Crafts','Pencils',NULL,NULL,NULL,'Available',10,10,'',2);
INSERT INTO `items` VALUES (17,1,'Laptop','Dell','Computer',NULL,NULL,NULL,NULL,'Available',39,39,'RTH 210D',2);
INSERT INTO `items` VALUES (28,1,'3D Printer Pro','3D printer each','3D','Design',NULL,NULL,NULL,'Available',1,1,'RTH 210D',0);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_checkedout`
--

DROP TABLE IF EXISTS `items_checkedout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_checkedout` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`itemid`,`uid`),
  KEY `uid` (`uid`),
  CONSTRAINT `items_checkedout_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  CONSTRAINT `items_checkedout_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_checkedout`
--

LOCK TABLES `items_checkedout` WRITE;
/*!40000 ALTER TABLE `items_checkedout` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_checkedout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_reserved`
--

DROP TABLE IF EXISTS `items_reserved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_reserved` (
  `itemid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `daterange` varchar(200) NOT NULL,
  PRIMARY KEY (`itemid`,`uid`,`quantity`,`daterange`),
  KEY `items_reserved_ibfk_2` (`uid`),
  CONSTRAINT `items_reserved_ibfk_1` FOREIGN KEY (`itemid`) REFERENCES `items` (`itemid`),
  CONSTRAINT `items_reserved_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_reserved`
--

LOCK TABLES `items_reserved` WRITE;
/*!40000 ALTER TABLE `items_reserved` DISABLE KEYS */;
/*!40000 ALTER TABLE `items_reserved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superadmin`
--

DROP TABLE IF EXISTS `superadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `superadmin` (
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`title`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superadmin`
--

LOCK TABLES `superadmin` WRITE;
/*!40000 ALTER TABLE `superadmin` DISABLE KEYS */;
INSERT INTO `superadmin` VALUES ('Director','Darin Gray','aleem@usc.edu');
INSERT INTO `superadmin` VALUES ('Inventory Manager','Xue Fei','aleem@usc.edu');
/*!40000 ALTER TABLE `superadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (205,'Jenny Miller','jmiller@jmiller.com','USC Student','$2a$10$11a863619324d25fe100aupJnUm6vy.KB7Yohys4/J3vn7YUn1btO','2017-09-29 05:44:12');
INSERT INTO `users` VALUES (209,'Mishaal Aleem','aleem@usc.edu','Admin','$2a$10$fb80074b01fe3a3b46e8duSVCk1GdADMlgpURG4G64jgKX/XMVcBG','2017-11-02 17:29:59');
INSERT INTO `users` VALUES (210,'Sam Lehardi','lehardi@usc.edu','Admin','$2a$10$9521d45d62ea36b8d9c90u18iijTf67SYHlJtUTGF27iVQDkmQ9Z.','2017-11-02 17:30:52');
INSERT INTO `users` VALUES (211,'Rachel Inouye','rinouye@usc.edu','Admin','$2a$10$d74b0880db220b08cd25au0PJmfqnTbN5oc5q7v7pGidqidDPIQjK','2017-11-02 17:31:20');
INSERT INTO `users` VALUES (212,'Terence Williams','terencew@usc.edu','Admin','$2a$10$10e7bfcba73800874e596ewJKtmE1Q4YOdrwPJj66N1ydFFVqxR12','2017-11-02 17:31:46');
INSERT INTO `users` VALUES (214,'Nick Kwong','kwongn@usc.edu','Admin','$2a$10$3e2cbea234d237687537aOLirvuJzlPI6fmgiPMdeWllnkoi90n.6','2017-11-02 17:33:11');
INSERT INTO `users` VALUES (218,'Sitan Gao','sitangao@usc.edu','Admin','$2a$10$b321d09283da4a665013eOncq1os7NfeCZVPCkfuVE8ITs8e5.PcO','2017-11-08 19:17:26');
INSERT INTO `users` VALUES (225,'sam villarreal','samuelvi@usc.edu','Admin','$2a$10$d87b99763fee3e0c335bfe7o0z4xz0yT.oJdu3eCNb8CyhlkH7TGa','2017-11-18 08:41:09');
INSERT INTO `users` VALUES (230,'Darin Gray','daring@usc.edu','Admin','$2a$10$244d278375ec992a8c957u0VKobp2cmKFkuIz/Rxa.acFAgkBaeB.','2017-11-19 20:42:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-21 17:06:56

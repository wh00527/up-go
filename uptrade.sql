/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : uptrade

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-05-16 09:21:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for `apply`
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='申请表';

-- ----------------------------
-- Records of apply
-- ----------------------------

-- ----------------------------
-- Table structure for `collection`
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='收藏表';

-- ----------------------------
-- Records of collection
-- ----------------------------

-- ----------------------------
-- Table structure for `integral`
-- ----------------------------
DROP TABLE IF EXISTS `integral`;
CREATE TABLE `integral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL COMMENT '1+ 2-',
  `number` int(11) DEFAULT NULL COMMENT '数额',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='积分表';

-- ----------------------------
-- Records of integral
-- ----------------------------

-- ----------------------------
-- Table structure for `job`
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `trade_type` tinyint(4) DEFAULT NULL COMMENT '类型',
  `location` varchar(255) DEFAULT NULL COMMENT '地址',
  `job_type` tinyint(4) DEFAULT NULL COMMENT '工作类型',
  `salary_range` varchar(255) DEFAULT NULL COMMENT '薪水范围',
  `apprentice` tinyint(4) DEFAULT NULL COMMENT '1是 2否',
  `summary` text COMMENT '概要',
  `description` text COMMENT '描述',
  `logo` varchar(255) DEFAULT NULL,
  `starttime` int(11) DEFAULT NULL COMMENT '开始时间',
  `endtime` int(11) DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='职位表';

-- ----------------------------
-- Records of job
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `integral` int(11) DEFAULT NULL COMMENT '积分',
  `type` tinyint(4) DEFAULT NULL COMMENT '1雇主 2雇员',
  `remind` tinyint(4) DEFAULT NULL COMMENT '提醒',
  `company` varchar(255) DEFAULT NULL COMMENT '公司名',
  `address` varchar(255) DEFAULT NULL,
  `CV` varchar(255) DEFAULT NULL COMMENT '简历',
  `summary` text COMMENT '总结',
  `description` text COMMENT '描述',
  `license` text COMMENT '证书',
  `additional_details` text COMMENT '附加细节',
  `references` text COMMENT '参考',
  `examples` text COMMENT '工作实例',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------

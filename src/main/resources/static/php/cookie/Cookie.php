<?php 
/**
* @copyright (c) 2014, rdtecnologia.com.br  
* @license MIT Licence 
*/
class Cookie { private static $_userKey = 'userLogin'; public static function setLoginCookie($userLogin) { self::addValue(self::$_userKey, $userLogin); } public static function getLoginCookie() { if (array_key_exists(self::$_userKey, $_COOKIE)) return $_COOKIE[self::$_userKey]; else return ''; } public static function addValue($key, $value) { if (! is_string($key) || ! is_string($value)) return false; setcookie($key, $value, time() + 60 * 60 * 24 * 30); } } 
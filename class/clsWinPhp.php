<?php
/*
 * WinPHP (c) crothhass 2013-2015
 */
//+++++++++++++++++++++++++++++++++++++++++++++
// KONST
//+++++++++++++++++++++++++++++++++++++++++++++
define("__APPNAME","WinPHP");
define("__APPVERSION","0.2 beta");

//+++++++++++++++++++++++++++++++++++++++++++++
// CLASS
//+++++++++++++++++++++++++++++++++++++++++++++
class clsWinPhp
{
	public static function init($args)
	{
		// Erzeugt das Layout
		echo '<!DOCTYPE html>' . NL;
		echo '<html>' . NL;
		echo '<head>' . NL;
		echo '<title>' . constant("__APPNAME") . ' ' . constant("__APPVERSION") . '</title>' . NL;
		echo '<meta http-equiv="content-type" content="text/html; charset=utf-8" />' . NL;
		echo '<link rel="shortcut icon" href="icon_winphp.ico" type="image/x-icon" />' . NL;
		echo '<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui.css">' . NL;
		echo '<link rel="stylesheet" type="text/css" href="css/winphp.css">' . NL;
		echo '<script type="text/javascript" src="javascript/jquery.js"></script>' . NL;
		echo '<script type="text/javascript" src="javascript/jquery-ui.js"></script>' . NL;
		echo '<script type="text/javascript" src="javascript/winphp.js"></script>' . NL;
		echo '</head>' . NL;
		echo '<body>' . NL;
		echo '<div id="wintaskbar">' . NL;
		
		echo '<div class="homebutton" id="task_home" title="Startmen�" style="background-image:url(images/icon_winphp.png)"></div>' . NL;
		
		echo '</div>' . NL; //wintaskbar
		

		echo '<div id="winmain"></div>' . NL; // winmain
		echo '</body>' . NL;
		echo '</html>';
	}
}
?>
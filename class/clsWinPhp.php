<?php
/*
 * WinPHP (c) crothhass 2013-2015
 */
//+++++++++++++++++++++++++++++++++++++++++++++
// KONST
//+++++++++++++++++++++++++++++++++++++++++++++
define("__APPNAME", "WinPHP");
define("__APPVERSION", "0.2 beta");

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
		
		echo '<div class="homebutton" id="task_home" title="Startmenü" style="background-image:url(images/icon_winphp.png)"></div>' . NL;
		
		echo '</div>' . NL; //wintaskbar
		

		// Module lesen und Menü erzeugen
		self::getStartMenu();
		
		echo '<div id="winmain"></div>' . NL; // winmain
		echo '</body>' . NL;
		echo '</html>';
	}

	private static function getStartMenu()
	{
		echo '<div id="startmenu">' . NL;
		if ($handle = opendir('modules'))
		{
			while (false !== ($moduleDir = readdir($handle)))
			{
				if ($moduleDir != "." && $moduleDir != "..")
				{
					// open module config file
					$cfgFile = "modules/$moduleDir/config_mod_$moduleDir.json";
					if (file_exists($cfgFile))
					{
						$cfg = json_decode(file_get_contents($cfgFile));
						if (is_object($cfg))
						{
							self::echoStartMenuEntry($moduleDir, $cfg->module_icon, $cfg->module_name);
						}
					}
				}
			}
			closedir($handle);
		}
		echo '</div>';
	}

	private function echoStartMenuEntry($moddir, $modpic, $modname)
	{
		echo '<div class="startmenu_module" data-module="' . $moddir . '">';
		echo '<table width="100%;"><tr>';
		echo '<td style="width:36px;"><img src="modules/' . $moddir . '/' . $modpic . '"></td>';
		echo '<td>' . $modname . '</td>';
		echo '<tr></table>';
		echo '</div>';
	}
}
?>
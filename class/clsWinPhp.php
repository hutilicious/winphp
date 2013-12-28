<?php

class clsWinPhp
{

    public static function init ($args)
    {
        // Erzeugt das Layout
        echo '<!DOCTYPE html>' . NL;
        echo '<html>' . NL;
        echo '<head>' . NL;
        echo '<title>WinPHP 0.1</title>' . NL;
        echo '<link rel="shortcut icon" href="icon_winphp.ico" type="image/x-icon" />' . NL;
        echo '<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui.css">' . NL;
        echo '<link rel="stylesheet" type="text/css" href="css/winphp.css">' . NL;
        echo '<script type="text/javascript" src="javascript/jquery.js"></script>' . NL;
        echo '<script type="text/javascript" src="javascript/jquery-ui.js"></script>' . NL;
        echo '<script type="text/javascript" src="javascript/winphp.js"></script>' . NL;
        echo '</head>' . NL;
        echo '<body>' . NL;
        echo '<div id="wintaskbar">' . NL;
        
        echo '<div class="task" id="task_home" style="background-image:url(images/icon_winphp.png)"></div>' . NL;
        
        echo '</div>' . NL;
        
        echo '<div id="winmain"></div>' . NL;
        echo '</body>' . NL;
        echo '</html>';
    }
}
?>
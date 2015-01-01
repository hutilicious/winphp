/**
 * Controller fuer WinPHP
 * 
 * TODO: Alle Fenster resizen bei resize, save window size, read modules and set
 * desktop icons, check if module has no app icon, arrange windows so that they are visible
 * wenn Task schon da, mach active
 * wenn Task nicht verfügbar, Fehlermeldung
 */
$(document).ready(function()
{
	WinPHP.init();
	WinPHP.createWindow("music");
});

//-------------------------------
// WinPHP class
//-------------------------------
var WinPHP = new function()
{
	this.winpos = new Object();
	
	this.init = function()
	{
		$(window).resize(function()
		{
			WinPHP.resizeContent();
		});
		
		this.resizeContent();
		// -------------------------------
		// TASKBAR HANDLER
		// -------------------------------
		$(document).on("click", ".task", function(event)
		{
			// Fenster in den Vordergrund bringen + anzeigen
			taskname = $(this).prop("id").substr(5);
			bolActive = $("#window_" + taskname).hasClass("activetask");
			if ((!bolActive) || $("#window_" + taskname).css("display") == "none")
			{
				$("#window_" + taskname).css("display", "");
				WinPHP.setActive(taskname);
			}
			else
			{
				$("#window_" + taskname).css("display", "none");
				WinPHP.removeActive(taskname);
				if (bolActive)
				{
					// active task gets minimized, lets choose another
					$(".window").each(function()
					{
						if ($(this).css("display") != "none")
						{
							WinPHP.setActive($(this).prop("id").substr(7));
							return false;
						}
					});
				}
			}
		});
		$(document).on("mouseover", ".task", function(event)
		{
			$(this).find("img").prop("src", "images/icon_hover.png");
		});
		$(document).on("mouseout", ".task", function(event)
		{
			if (!$(this).hasClass("activetask"))
			{
				$(this).find("img").prop("src", "images/icon_inactive.png");
			}
			else
			{
				$(this).find("img").prop("src", "images/icon_active.png");
			}
		});
		$(document).on("mouseover", ".homebutton", function(event)
		{
			$(this).css("background-image", "url(images/icon_winphp_glow.png)");
		});
		$(document).on("mouseout", ".homebutton", function(event)
		{
			$(this).css("background-image", "url(images/icon_winphp.png)");
		});
		
		$(document).on("click", ".homebutton", function(event)
		{
			// Todo Click on Home
		});
		
		// -------------------------------
		// WINDOW HANDLER
		// -------------------------------
		$(document).on("mousedown", ".window_title_buttons#window_close", function()
		{
			// Fenster schließen
			taskname = $(this).parents(".window").prop("id").substr(7);
			WinPHP.closeWindow(taskname);
		});
		$(document).on("mousedown", ".window_title_buttons#window_minimize", function(event)
		{
			// Fenster minimieren
			event.stopPropagation();
			taskname = $(this).parents(".window").prop("id").substr(7);
			$(this).parents(".window").css("display", "none");
			bolActive = $("#window_" + taskname).hasClass("activetask");
			WinPHP.removeActive(taskname);
			if (bolActive)
			{
				// active task gets minimized, lets choose another
				$(".window").each(function()
				{
					if ($(this).css("display") != "none")
					{
						WinPHP.setActive($(this).prop("id").substr(7));
						return true;
					}
				});
			}
		});
		$(document).on("mousedown", ".window_title_buttons#window_maximize", function()
		{
			// Fenster maximieren
			taskname = $(this).parents(".window").prop("id").substr(7);
			objwin = $(this).parents(".window");
			if (!$(objwin).hasClass("maximized"))
			{
				// maximize
				WinPHP.winpos[taskname + "_left"] = $(objwin).css("left");
				WinPHP.winpos[taskname + "_top"] = $(objwin).css("top");
				$(objwin).animate({
					width : $("#winmain").width() + "px",
					height : $("#winmain").height() + "px",
					left : "0px",
					top : "0px"
				}, 50, function()
				{
					$(objwin).find("div.window_content").css("height", ($(objwin).height() - $(objwin).find("div.window_title").height() - 2) + "px");
					$(objwin).resizable("destroy").draggable("destroy");
					$(objwin).addClass("maximized");
				});
			}
			else
			{
				// restore
				$(objwin).animate({
					width : "400px",
					height : "300px",
					left : WinPHP.winpos[taskname + "_left"],
					top : WinPHP.winpos[taskname + "_top"]
				}, 50, function()
				{
					$(objwin).removeClass("maximized");
					$(objwin).find("div.window_content").css("height", ($(objwin).height() - $(objwin).find("div.window_title").height() - 2) + "px");
					addWindowFunctionality(taskname);
				});
			}
		});
		$(document).on("mousedown", ".window", function()
		{
			taskname = $(this).prop("id").substr(7);
			WinPHP.setActive(taskname);
		});
	}

	this.resizeContent = function()
	{
		$("#winmain").css("height", $(window).height() - $("#wintaskbar").height() + "px");
	}

	this.setActive = function(taskname)
	{
		$(".task").each(function()
		{
			task = $(this).prop("id").substr(5);
			WinPHP.removeActive(task);
		});
		$("#task_" + taskname).find("img").prop("src", "images/icon_active.png");
		$("#task_" + taskname).addClass("activetask");
		$("#window_" + taskname).addClass("activetask");
		$("#window_" + taskname).css("z-index", 101);
		$("#window_" + taskname).css("display", "");
	}

	this.removeActive = function(taskname)
	{
		$("#task_" + taskname).find("img").prop("src", "images/icon_inactive.png");
		$("#task_" + taskname).removeClass("activetask");
		$("#window_" + taskname).css("z-index", 100);
		$("#window_" + taskname).removeClass("activetask");
	}

	this.createWindow = function(taskname)
	{
		if ($("#task_"+taskname).length > 0)
		{
			this.setActive(taskname);
			return true;
		}
		var task = "";
		task = '<div class="task" id="task_' + taskname + '" style="background-image:url(modules/' + taskname + '/icon_app_' + taskname + '.png)">';
		task += '<img src="images/icon_active.png">';
		task += '</div>';
		
		$("#wintaskbar").append(task);
		
		var window = "";
		window = '<div class="window" id="window_' + taskname + '">';
		window += '<div class="window_title">';
		window += '<div class="window_title_string">' + ucfirst(taskname) + '</div>';
		window += '<div class="window_title_buttons" id="window_close"><img src="images/window_button_close.png"></div>';
		window += '<div class="window_title_buttons" id="window_maximize"><img src="images/window_button_maximize.png" width="10"></div>';
		window += '<div class="window_title_buttons" id="window_minimize"><img src="images/window_button_minimize.png" width="10"></div>';
		window += '</div>';
		window += '<div class="window_content"></div>';
		window += '</div>';
		
		$("#winmain").append(window);
		$("#window_" + taskname + " div.window_content").css("height", ($("#window_" + taskname).height() - $("#window_" + taskname + " div.window_title").height() - 2) + "px");
		
		$("#window_" + taskname).draggable({
			containment : "parent",
			handle : "div.window_title",
			cancel : "div.window_title_buttons"
		}).resizable({
			minHeight : 300,
			minWidth : 400,
			maxHeight : $("#winmain").height(),
			containment : "parent",
			resize : function(event, ui)
			{
				$(this).find("div.window_content").css("height", ($(this).height() - $(this).find("div.window_title").height() - 2) + "px");
			}
		});
		
		this.setActive(taskname);
	};
	
	this.closeWindow = function(taskname)
	{
		$("#task_" + taskname + ",#window_" + taskname).remove();
	}
}

//-------------------------------
//HELPING FUNCTIONS
//-------------------------------
function ucfirst(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1);
}
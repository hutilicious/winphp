/**
 * Controller fuer WinPHP
 * 
 * TODO: JS-Handler fuer 2 Fenster kompatibel machen,Alle Fenster resizen bei
 * resize, bring-to-front feature (maximized windows available), save window
 * size
 */

var winpos = new Object();

$(document).ready(function()
{
	// main function
	resizeContent();

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
			setActive(taskname);
		}
		else
		{
			$("#window_" + taskname).css("display", "none");
			removeActive(taskname);
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
	$(document).on("click", ".window_title_buttons#window_close", function()
	{
		// Fenster schlieﬂen
		taskname = $(this).parents(".window").prop("id").substr(7);
		removeTask(taskname);
		$(this).parents(".window").remove();
	});
	$(document).on("click", ".window_title_buttons#window_minimize", function()
	{
		// Fenster minimieren
		taskname = $(this).parents(".window").prop("id").substr(7);
		$(this).parents(".window").css("display", "none");
		removeActive(taskname);
		alert($(".task").first().prop("id"));
	});
	$(document).on("click", ".window_title_buttons#window_maximize", function()
	{
		// Fenster maximieren
		taskname = $(this).parents(".window").prop("id").substr(7);
		objwin = $(this).parents(".window");
		if (!$(objwin).hasClass("maximized"))
		{
			// maximize
			winpos[taskname + "_left"] = $(objwin).css("left");
			winpos[taskname + "_top"] = $(objwin).css("top");
			$(objwin).animate(
			{
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
			$(objwin).animate(
			{
				width : "400px",
				height : "300px",
				left : winpos[taskname + "_left"],
				top : winpos[taskname + "_top"]
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
		setActive(taskname);
	});

	// -------------------------------
	// SOME MISC STUFF
	// -------------------------------
	createTask("music");
	createTask("editor");
	createTask("picture");
	setActive("music");
	createWindow("editor");
	createWindow("music");
	createWindow("picture");
});

$(window).resize(function()
{
	resizeContent();
});

function resizeContent()
{
	$("#winmain").css("height", $(window).height() - $("#wintaskbar").height() + "px");
}

function createTask(taskname)
{
	var task = "";
	task = '<div class="task" id="task_' + taskname + '" style="background-image:url(images/icon_app_' + taskname + '.png)">';
	task += '<img src="images/icon_inactive.png">';
	task += '</div>';

	$("#wintaskbar").append(task);
}

function removeTask(taskname)
{
	$("#task_" + taskname).remove();
}

function createWindow(taskname)
{
	var window = "";
	window = '<div class="window" id="window_' + taskname + '">';
	window += '<div class="window_title">';
	window += '<div class="window_title_string">' + taskname + '</div>';
	window += '<div class="window_title_buttons" id="window_close"><img src="images/window_button_close.png"></div>';
	window += '<div class="window_title_buttons" id="window_maximize"><img src="images/window_button_maximize.png" width="10"></div>';
	window += '<div class="window_title_buttons" id="window_minimize"><img src="images/window_button_minimize.png" width="10"></div>';
	window += '</div>';
	window += '<div class="window_content"></div>';
	window += '</div>';

	$("#winmain").append(window);
	$("#window_" + taskname + " div.window_content").css("height", ($("#window_" + taskname).height() - $("#window_" + taskname + " div.window_title").height() - 2) + "px");
	addWindowFunctionality(taskname);
}

function addWindowFunctionality(taskname)
{
	$("#window_" + taskname).draggable(
	{
		containment : "parent",
		handle : "div.window_title",
		cancel : "div.window_title_buttons"
	}).resizable(
	{
		minHeight : 300,
		minWidth : 400,
		maxHeight : $("#winmain").height(),
		containment : "parent",
		resize : function(event, ui)
		{
			$(this).find("div.window_content").css("height", ($(this).height() - $(this).find("div.window_title").height() - 2) + "px");
		}
	});
}

function setActive(taskname)
{
	$(".task").each(function()
	{
		task = $(this).prop("id").substr(5);
		removeActive(task);
	});
	$("#task_" + taskname).find("img").prop("src", "images/icon_active.png");
	$("#task_" + taskname).addClass("activetask");
	$("#window_" + taskname).addClass("activetask");
	$("#window_" + taskname).css("z-index", 101);
}

function removeActive(taskname)
{
	$("#task_" + taskname).find("img").prop("src", "images/icon_inactive.png");
	$("#task_" + taskname).removeClass("activetask");
	$("#window_" + taskname).css("z-index", 100);
	$("#window_" + taskname).removeClass("activetask");
}
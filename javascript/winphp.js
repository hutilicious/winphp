/**
 * Controller fuer WinPHP
 * 
 * TODO: resize fuer content wenn maximiert/minimiert
 * handler fuer 2 fenster kompatibel machen
 */

$(document).ready(function() {
	// main function
	resizeContent();

	$(document).on("click", ".task", function(event) {

		if ($(this).prop("id") != "task_home") {
			// Tasks
			// Fenster in den Vordergrund bringen + anzeigen
			taskname = $(this).prop("id").substr(5);
			if ($("#window_" + taskname).css("display") == "none") {
				$("#window_" + taskname).css("display", "");
				setActive(taskname);
			} else {
				$("#window_" + taskname).css("display", "none");
				removeActive(taskname);
			}
		} else {
			// Home
			alert("home");
		}

	});
	$(document).on("mouseover", ".task", function(event) {

		if ($(this).prop("id") != "task_home") {
			$(this).find("img").prop("src", "images/icon_hover.png");
		} else {
			$(this).css("background-image", "url(images/icon_winphp_glow.png)");
		}

	});
	$(document).on("mouseout", ".task", function(event) {

		if ($(this).prop("id") != "task_home") {
			if (!$(this).hasClass("activetask")) {
				$(this).find("img").prop("src", "images/icon_inactive.png");
			} else {
				$(this).find("img").prop("src", "images/icon_active.png");
			}
		} else {
			$(this).css("background-image", "url(images/icon_winphp.png)");
		}
	});

	$(document).on("click", ".window_title_buttons#window_close", function() {
		// Fenster schlieﬂen
		taskname = $(this).parents(".window").prop("id").substr(7);
		removeTask(taskname);
		$(this).parents(".window").remove();
	});
	$(document).on("click", ".window_title_buttons#window_minimize", function() {
		// Fenster minimieren
		taskname = $(this).parents(".window").prop("id").substr(7);
		$(this).parents(".window").css("display", "none");
		removeActive(taskname);
	});
	$(document).on("click", ".window_title_buttons#window_maximize", function() {
		// Fenster maximieren
		if (!$(this).parents(".window").hasClass("maximized")) {
			$(this).parents(".window").css("left", "0px");
			$(this).parents(".window").css("top", "0px");
			$(this).parents(".window").css("width", $("#winmain").width() + "px");
			$(this).parents(".window").css("height", $("#winmain").height() + "px");
			$(this).parents(".window").resizable("destroy").draggable("destroy");
			$(this).parents(".window").addClass("maximized");
		} else {
			taskname = $(this).parents(".window").prop("id").substr(7);
			$(this).parents(".window").css("width", "400px");
			$(this).parents(".window").css("height", "300px");
			$(this).parents(".window").removeClass("maximized");
			addWindowFunctionality(taskname);
		}
	});

	createTask("music");
	setActive("music");
	// createWindow("editor");
	createWindow("music");
});

$(window).resize(function() {
	resizeContent();
});

function resizeContent() {
	$("#winmain").css("height", $(window).height() - $("#wintaskbar").height() + "px");
}

function createTask(taskname) {
	var task = "";
	task = '<div class="task" id="task_' + taskname + '" style="background-image:url(images/icon_app_' + taskname + '.png)">';
	task += '<img src="images/icon_inactive.png">';
	task += '</div>';

	$("#wintaskbar").append(task);
}

function removeTask(taskname) {
	$("#task_" + taskname).remove();
}

function createWindow(taskname) {
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

function addWindowFunctionality(taskname) {
	$("#window_" + taskname).draggable({
		containment : "parent",
		handle : "div.window_title",
		cancel : "div.window_title_buttons"
	}).resizable({
		minHeight : 300,
		minWidth : 400,
		maxHeight : $("#winmain").height(),
		containment : "parent",
		resize : function(event, ui) {
			$(this).find("div.window_content").css("height", ($(this).height() - $(this).find("div.window_title").height() - 2) + "px");
		}
	});
}

function setActive(taskname) {
	$("#task_" + taskname).find("img").prop("src", "images/icon_active.png");
	$("#task_" + taskname).addClass("activetask");
}

function removeActive(taskname) {
	$("#task_" + taskname).find("img").prop("src", "images/icon_inactive.png");
	$("#task_" + taskname).removeClass("activetask");
}
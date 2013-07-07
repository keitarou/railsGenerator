$(function(){
	
	var table = $("#table tbody");
	var alert = $("#alert");

	// up btn clicked
	table.delegate(".up", "click", function(e){
		$(this).closest('tr').insertBefore($(this).closest('tr').prev());
	});

	// down btn clicked
	table.delegate(".down", "click", function(e){
		$(this).closest('tr').insertAfter($(this).closest('tr').next());
	});

	// remove btn clicked
	table.delegate(".remove", "click", function(e){
		$(this).closest('tr').remove();
	});

	// add record
	$('.add_btn').click(function(e){
		var parts = [];
		parts[0] = '<tr><td style="text-align:center;"><button class="btn up">↑</button><button class="btn down">↓</button></td><td><span class="type">';
		parts[1] = '</span></td><td><input type="text" class="coulmn span12" value="';
		parts[2] = '"></td><td class="ext"><button class="remove btn btn-danger">×</button></td></tr>';
		var row  = parts[0] + $('.add').val() + parts[1];
		row += $('#text').val() + parts[2];
		var obj  = $(row);
		table.append(obj);
	});

	// generate
	$('.generate').click(function(e, obj){
		alert.hide();
		alert.children().remove();

		var header = "rails generate ";
		var list   = $(".list:checked").val()+" ";
		var name   = proper($(".name").val())+" ";
		var types   = [];
		var coulmns = [];
		var string  = "";
		var command = "";

		$(".type").each(function(index){
			types[index] = $(this).text();
		});
		$(".coulmn").each(function(index){
			coulmns[index] = $(this).val();
		});

		// check
		checkName(name);
		checkRows(types);
		checkCoulmns(coulmns);

		for(i=0; i<types.length; i++){
			string = string + coulmns[i] + ":" + types[i] + " ";
		}
		
		command = header + list + name + string;
		$('textarea').val(command);
	});

	// name empty check
	function checkName(name){
		if(name==" "){
			alert.append("<p>-- Name id Empty</p>");
			alert.show();
		}
	}

	// now count check
	function checkRows(types){
		if(types.length < 1){
			alert.append("<p>-- Rows is Empty</p>");
			alert.show();
		}
	}

	// coulmn empty check
	function checkCoulmns(coulmns){
		var error = false;
		for(i=0; i<coulmns.length; i++){
			if(coulmns[i] == ""){
				error = true;
			}
		}
		if(error){
			alert.append("<p>-- Coulmns is Empty</p>");
			alert.show();
		}
	}
	
	function proper(str){
		return str.replace(/\b([a-z])([a-z']*)\b/gi,function($0,$1,$2){
			return $1.toUpperCase() + $2.toLowerCase();
		});
	}
});
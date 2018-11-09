// Polymode Definition

var state = "none"

function into_none ()
{
	state = "none";
	$("#mode").text("hypertoss").addClass("bg-secondary");
	$("#textbar").val("");
}

function from_none ()
{
	$("#mode").removeClass("bg-secondary");
}

function into_chat ()
{
	state = "chat";
	$("#mode").text("chat").addClass("bg-primary");
}

function from_chat ()
{
	$("#mode").removeClass("bg-primary");
}

function into_buzz ()
{
	state = "buzz";
	$("#mode").text("buzz").addClass("bg-danger");
}

function from_buzz ()
{
	$("#mode").removeClass("bg-danger");
}

function try_none ()
{
	switch (state)
	{
		case "chat":
			from_chat(); into_none();
			return true;
		break;
		case "buzz":
			from_buzz(); into_none();
			return true;
		break;
	}

	return false;
}

function try_buzz ()
{
	switch (state)
	{
		case "none":
			from_none(); into_buzz();
			return true;
		break;
	}

	return false;
}

function try_chat ()
{
	switch (state)
	{
		case "none":
			from_none(); into_chat();
			return true;
		break;
	}

	return false;
}

// Raw Event Binding

$("#textbar").focus
(
	function ()
	{
		try_buzz();
	}
);

$("#textbar").blur
(
	function ()
	{
		if (state == "buzz") setTimeout(function () {$("#textbar").focus();}, 0); // the timeout defers focus until after blur has registered
	}
);


$("#dropdown-button-buzz").click
(
	function ()
	{
		try_buzz();
		$("#textbar").focus();
	}
);

$(document).keypress
(
	function (e)
	{	
		switch (e.key)
		{
			case "y":
				if (try_chat())
				{
					$("#textbar").focus();
					return false;
				}
			break;
			case " ":
				if (try_buzz())
				{
					$("#textbar").focus();
					return false;
				}
			break;
			case "Enter":
			case "Escape": // TODO Logic
				if (try_none())
				{
					$("#textbar").blur();
					return false;
				}
				
			break;
		}
	}
);

// Init

into_none();

// WASM Interop
/*
const response = await fetch('hypertoss.wasm');
const buffer = await response.arrayBuffer();
const module = await WebAssembly.compile(buffer);
const instance = await WebAssembly.instantiate(module);

function get_clue()
{
	const stringBuffer = new Uint8Array(instance.exports.memory.buffer, instance.exports.get_clue(), instance.exports.get_clue_len());

	// create a string from this buffer
	let str = '';
	for (let i = 0; i < stringBuffer.length; ++i)
	{
		str += String.fromCharCode(stringBuffer[i]);
	}

	return str;
}
*/
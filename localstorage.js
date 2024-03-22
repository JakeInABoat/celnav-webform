window.addEventListener("load", (event) => {
	var persistence = {
		forms: {}
	};
	var saveInput = document.getElementById("saveinput");
	var saveButton = document.getElementById("savebutton");
	var formSelect = document.getElementById("formselect");
	var loadButton = document.getElementById("loadbutton");
	var deleteButton = document.getElementById("deletebutton");

	saveButton.addEventListener("click", (event) => {
		var name = saveInput.value;
		if (name == "") {
			alert("You must enter a save name.");
			return;
		}

		var form = {
			name: name,
			inputs: []
		};

		document.querySelectorAll("#fields input").forEach((element) => {
			form.inputs.push({
				id: element.id,
				value: element.value
			});
		});
		persistence.forms[name] = form;
		localStorage.setItem("CelestialForms", JSON.stringify(persistence));
		loadFromStorage();
	});

	loadButton.addEventListener("click", (event) => {
		if (formSelect.value == "") {
			alert("No form selected");
			return;
		}
		var form = persistence.forms[formSelect.value];
		form.inputs.forEach((input) => {
			document.getElementById(input.id).value = input.value;
		});
		formSelect.value = "";
		saveInput.value = form.name;
	});

	deleteButton.addEventListener("click", (event) => {
		if (formSelect.value == "") {
			alert("No form selected");
			return;
		}
		var form = persistence.forms[formSelect.value];
		if (!confirm("Really delete form `" + form.name + "'?")) {
			return;
		}
		delete persistence.forms[form.name];
		localStorage.setItem("CelestialForms", JSON.stringify(persistence));
		loadFromStorage();
	});

	function loadFromStorage() {
		var data = localStorage.getItem("CelestialForms");
		if (!data) {
			return;
		}
		persistence = JSON.parse(data);

		document.querySelectorAll("#formselect option").forEach((element) => {
			if (element.value != "") {
				element.remove();
			}
		});

		for (const property in persistence.forms) {
			var option = document.createElement("option");
			var form = persistence.forms[property];
			option.setAttribute("value", form.name);
			option.innerHTML = form.name;
			formSelect.appendChild(option);
		}
	}
	
	loadFromStorage();
});

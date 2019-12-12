let handlers={
	success: function(tx, result){
		let resultRows = result.rows;
		let resultElem = document.querySelector('.result');
		let table = document.createElement('table');
		for (let i=0; i<resultRows.length; i++){
			let rowElem = document.createElement('tr');
			table.appendChild(rowElem);
			for (elem in resultRows[i]){
				let columnElem = document.createElement('td');
				columnElem.innerText = resultRows[i][elem];
				rowElem.appendChild(columnElem);
			}
		}
		resultElem.appendChild(table);
	},
	error: function(tx, error){
		let resultElem = document.querySelector('.result');
		let errorElem = document.createElement('p');
		errorElem.innerText = error.message;
		errorElem.classList.add('error');
		resultElem.appendChild(errorElem);
	}
}

function replaceAll(string, search, substr=' '){
	return string.split(search).join(substr)
}

var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

function getCode(){
	let elem = document.getElementById('code');
	let code = elem.value.split(';')
	let codeArr = code.map(elem=> elem.trim());
	codeArr = codeArr.map(elem=> replaceAll(elem, '\n'));
	codeArr = codeArr.filter(elem=> elem);
	return codeArr
}



function run(){
	let resultElem = document.querySelector('.result');
	resultElem.innerText = '';
	db.transaction(function (tx) { 
		let codeArr = getCode();
	    for (let i=0; i< codeArr.length; i++){
	    	tx.executeSql(codeArr[i], [], handlers.success, handlers.error);
	    }
	}); 
}

let runBtn = document.getElementById('run');
runBtn.addEventListener('click', ()=>run());
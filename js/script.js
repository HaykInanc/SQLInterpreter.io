let handlers={
	success: function(tx, result){
		if (result.rows.length == 0){
			return
		}
		let resultRows = result.rows;
		let resultElem = document.querySelector('.result');
		let table = document.createElement('table');
		table.setAttribute('border', '1');
		let thRowElem = document.createElement('tr');
		for (elem in resultRows[0]){
			let columnElem = document.createElement('th');
			columnElem.innerText = elem;
			thRowElem.appendChild(columnElem);
		}
		table.appendChild(thRowElem);
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
	},
	showTables: function(tx, result){
		let rows = [...result.rows];
		let tableListElem = document.querySelector('.tableList');
		tableListElem.innerText = '';
		let ulElem = document.createElement('ul');
		ulElem.classList.add('tableList');
		for (elem in rows){
			let liElem = document.createElement('li');
			ulElem.appendChild(liElem);
			liElem.innerText = rows[elem].name;
		}
		tableListElem.appendChild(ulElem);
	},
	loadTables: function (tx, result){
		let rows = [...result.rows];
		for (row in rows){
			let table = rows[row].name
			db.transaction(function (tx) { 
			    tx.executeSql(`select * from ${table};`, [], (tx, result)=>handlers.csvParse(tx, result, table+'_table.csv'));
			}); 

		}

	},
	csvParse: function(tx, result, fileName){
		let dataArr = [...result.rows]
		let returnStr = '';
		let firstItter = true;
		for (row of dataArr){
			if (firstItter){
				for (elem in row){
					returnStr+=elem+',';
				}
				returnStr=returnStr.slice(0,-1);
				returnStr+='\n';
			}
			for (elem in row){
				if (String(row[elem]).toLowerCase() !== 'null') {
					returnStr+=row[elem]
				}
				returnStr += ',';
			}
			returnStr=returnStr.slice(0,-1);
			returnStr+='\n';
			firstItter = false;
		}
		loadData(returnStr, fileName)
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
	getTablesList();
}

function loadData(text, fileName){
	let type = 'data:application/octet-stream;base64, ';
	let base = window.btoa(unescape(encodeURIComponent(text)));
	let hrefStr = type + base;

	let elem = document.createElement('a');
	elem.setAttribute('download', fileName);
	elem.setAttribute('href', hrefStr);
	elem.click();
}

function getTablesList(download = false){

	let code = `SELECT 
    	name
	FROM 
	    sqlite_master 
	WHERE 
	    type ='table' 
	    AND name NOT LIKE 'sqlite_%'
	    and name <> "__WebKitDatabaseInfoTable__"
	`;

	db.transaction(function (tx) { 
		tx.executeSql(code, [], download? handlers.loadTables:handlers.showTables);
	});
}

function saveQuery(){
	localStorage.setItem('query', codeElem.value);
}

function setQuery(){
	codeElem.value = localStorage.getItem('query');
}

let runBtn = document.getElementById('run');
let codeElem = document.getElementById('code');
runBtn.addEventListener('click', ()=>run());
codeElem.addEventListener('input', ()=>saveQuery());

let loadBtn = document.getElementById('load');
loadBtn.addEventListener('click', ()=>getTablesList(true));

getTablesList();
setQuery()
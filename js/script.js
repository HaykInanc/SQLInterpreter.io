let startDate = [
	`drop table if exists Users;`,

	`create table Users(
		userID integer primary key autoincrement,
		name varchar(128),
		lastName varchar(128),
		born datetime,
		activeFlg bit default 1
	);`,



	`insert into Users (name, lastName, born) values ('Аверкий', 'Филиппов', '1990-00-20'),
	('Элеонора', 'Гаврилова', '1978-00-10'),
	('Вадим', 'Комаров', '1981-08-28'),
	('Аграфена', 'Полякова', '1992-00-10'),
	('Тамара', 'Вихирева', '1981-02-2'),
	('Фома', 'Соловьёв', '1985-06-16'),
	('Кондратий', 'Арсеньев', '1976-05-25'),
	('Руслан', 'Ерофеев', '1973-00-10'),
	('Тит', 'Шашков', '1984-03-13'),
	('Анжела', 'Русина', '1966-05-25'),
	('Марианна', 'Лапина', '1965-03-3'),
	(NULL, 'Осипова', '1972-01-21'),
	('Авксентий', 'Карпов', '1981-07-27'),
	('Инга', 'Чистякова', '1988-05-15'),
	('Флора', 'Фёдорова', '1980-06-16'),
	('Любовь', 'Петрова', '1986-03-13'),
	('Николай', NULL, '1976-06-16'),
	('Прасковья', 'Новикова', '1968-04-24'),
	('Мокей', 'Вирский', '1984-09-19'),
	('Владилена', 'Григорьева', '1986-04-24'),
	('Владлена', 'Гулевич', '1969-04-24'),
	('Мальвина', 'Демьянченко', '1964-01-11'),
	(NULL, 'Макаров', '1994-05-25'),
	('Фаина', 'Новикова', '1987-04-14'),
	('Всеслава', 'Изофатова', '1966-01-11'),
	('Инесса', 'Крылова', '1983-09-9'),
	('Алёна', '', '1972-08-8'),
	('Клементина', 'Демьянченко', '1990-07-7'),
	('Капитолина', 'Матвеева', '1990-07-27');`,


	`drop table if exists Orders;`,

	`create table Orders(
		orderID integer primary key autoincrement,
		userID integer,
		productID integer,
		quantity integer
	);`,


	`insert into Orders (userID, productID, quantity) values (17, 14, 2),
	(9, 11, 1),
	(12, 4, 5),
	(7, 1, 2),
	(27, 4, 4),
	(5, 5, 3),
	(20, 16, 4),
	(27, 2, 6),
	(1, 17, 4),
	(8, 16, 2),
	(25, 12, 5),
	(28, 6, 1),
	(11, 5, 2),
	(8, 17, 6),
	(23, 8, 1),
	(11, 10, 1),
	(12, 15, 2),
	(15, 6, 1),
	(2, 16, 4),
	(3, 13, 2),
	(6, 14, 3),
	(13, 5, 5),
	(11, 3, 1),
	(12, 7, 5),
	(12, 16, 3),
	(16, 12, 1),
	(2, 4, 6),
	(16, 2, 6),
	(15, 13, 5),
	(29, 7, 4),
	(8, 7, 4),
	(8, 15, 5),
	(18, 12, 2),
	(1, 1, 6),
	(5, 16, 6),
	(12, 6, 2),
	(1, 3, 3),
	(29, 1, 5),
	(28, 14, 1),
	(19, 15, 6),
	(15, 11, 5),
	(20, 13, 2),
	(12, 7, 4);`,


	`drop table if exists Product;`,

	`create table Product(
		productID integer primary key autoincrement,
		title varchar(128),
		price integer
	);`,


	`insert into Product (title, price) values ('Обод', 3000),
	('Педаль', 500),
	('Переключатель скоростей', 1000),
	('Подножка', 300),
	('Подшипник', 20),
	('Покрышка', 1500),
	('Рама', 6000),
	('Руль', 800),
	('Спица', 10),
	('Тормоз', 500),
	('Трещотка', 700),
	('Трос', 100),
	('Фляга', 500),
	('Цепь', 1000),
	('Шатун', 700),
	('Шлем', 1500),
	('Якорь', 300);`,
	`drop table if exists Reserves;`,

	`create table Reserves(
		orderID integer primary key autoincrement,
		userID integer,
		productID integer,
		quantity integer
	);`,

	`insert into Reserves (userID, productID, quantity) values 
	(20, 2, 1),
	(6, 13, 6),
	(5, 4, 5),
	(12, 7, 1),
	(2, 13, 5),
	(23, 5, 2),
	(19, 14, 1),
	(5, 15, 4),
	(6, 16, 6),
	(28, 14, 1),
	(12, 12, 5),
	(30, 13, 3),
	(7, 17, 4);`
]

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
				columnElem.innerText = resultRows[i][elem]||'NULL';
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


try{
	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
}
catch (e){
	alert('Упс... Ваш браузер не поддерживает webSQL. Попробуйте воспользоваться другим \n (Chrome должен помочь)')
}

function getCode(){
	let elem = document.getElementById('code');
	let code = elem.value.split(';')
	let codeArr = code.map(elem=> elem.trim());
	codeArr = codeArr.map(elem=> replaceAll(elem, '\n'));
	codeArr = codeArr.filter(elem=> elem);
	return codeArr
}

function loadStartDate(){
	db.transaction(function (tx) { 
		for (let i=0; i< startDate.length; i++){
	    	tx.executeSql(startDate[i], []);
	    }
	});
	getTablesList();
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
	let type = 'data:application/csv;charset=utf-8,';
	let hrefStr = type + text;

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


let loadStartDataElem = document.getElementById('loadData');
loadStartDataElem.addEventListener('click', ()=>loadStartDate());

getTablesList();
setQuery()
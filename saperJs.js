var map;
var bombRatio = 0.2; // [0.0 - 1.0] == [0%-100%]
var buttMap;
var crBoombs = 0;
var pressedId = [];
var checkedZeroX = [];
var checkedZeroY = [];
var mapSize;

function loadSaper()
{
	pressedId =[];
	checkedZeroX = [];
	checkedZeroY = [];
	crBoombs = 0;
	
	var myNode = document.getElementById("here");
	var fc = myNode.firstChild;

	while( fc ) {
		myNode.removeChild( fc );
		fc = myNode.firstChild;
	}
	
	mapSize = parseInt(document.getElementById("startSaperValue").value);
	map = new Array(mapSize);
	buttMap = new Array(mapSize);
	for (var i = 0; i < mapSize; i++) {
		map[i] = new Array(mapSize);
		buttMap[i] = new Array(mapSize);
	}
	createMap();
	createButts();
}

function createMap()
{
	for(i=0; i<map.length; i++)
	{
		for(j=0; j<map[0].length; j++)
		{
			map[i][j] = 0;
		}
	}
}

function createBombs(Y,X)
{
	numBombs = map.length*map[0].length*bombRatio;
	counter = 0;
	while(counter < numBombs)
	{
		r_x = parseInt((Math.random()*100)%mapSize);
		r_y = parseInt((Math.random()*100)%mapSize);
		if(map[r_x][r_y] == 0 && (r_x != Y && r_y != X))
		{
			map[r_x][r_y] = -1;
			counter++;
		}
	}
	crBoHelper()
}

function createButts()
{
	for(i=0; i<map.length; i++)
	{
		for(j=0; j<map[0].length; j++)
		{
			var btn = document.createElement("BUTTON");        // Create a <button> element
			if(i!=0){
				btn.id = i.toString() + j.toString();
			}
			else{
				btn.id = j.toString();
			}
			btn.className = "saperButs";
			btn.setAttribute('onclick','actionButt('+i.toString()+','+j.toString()+','+btn.id+')');
			var t = document.createTextNode(".");       	   // Create a text node
			btn.appendChild(t);                                // Append the text to <button>
			document.getElementById("here").appendChild(btn);  // Append <button> to <body>
			buttMap[i][j] = btn;
		}
		var br = document.createElement("br");
		document.getElementById("here").appendChild(br);
	}
}
function checkZeroArray(y,x)
{
	for(i=0;i<checkedZeroX.length;i++)
	{
		if(checkedZeroY[i] == y && checkedZeroX[i] == x)
			return 1;
	}
	return -1;
}
function activButtHelper(Y,X)
{
	try{
		if(map[Y-1][X] == 0)
		{
			document.getElementById((Y-1).toString() + (X).toString()).innerHTML = "0";
			yy = (Y-1).toString() + X.toString();
			if(checkZeroArray(Y-1,X) == -1)
			{
			checkedZeroX.push(X);
			checkedZeroY.push(Y-1);
			activButtHelper(Y-1,X);
			}
		}
	}
	catch(err){}
	try{
		if(map[Y][X-1] == 0)
		{
			document.getElementById((Y).toString() + (X-1).toString()).innerHTML = "0";
			yy = (Y).toString() + (X-1).toString();
			if(checkZeroArray(Y,X-1) == -1)
			{
			checkedZeroX.push(X-1);
			checkedZeroY.push(Y);
			activButtHelper(Y,X-1);
			}
		}
	}
	catch(err){}
	try{
		if(map[Y][X+1] == 0)
		{
			document.getElementById((Y).toString() + (X+1).toString()).innerHTML = "0";
			yy = (Y).toString() + (X+1).toString();
			if(checkZeroArray(Y,X+1) == -1)
			{
			checkedZeroX.push(X+1);
			checkedZeroY.push(Y);
			activButtHelper(Y,X+1);
			}
		}
	}
	catch(err){}
	try{
		if(map[Y+1][X] == 0)
		{
			document.getElementById((Y+1).toString() + (X).toString()).innerHTML = "0";
			yy =(Y+1).toString() + (X).toString();
			if(checkZeroArray(Y+1,X) == -1)
			{
			checkedZeroX.push(X);
			checkedZeroY.push(Y+1);
			activButtHelper(Y+1,X);
			}
		}
	}
	catch(err){}
}

function fillZero()
{
	for(k=0; k<checkedZeroX.length; k++)
	{
		for(cnt=-1;cnt<2;cnt++)
		{
			for(i=-1;i<2;i++)
			{
				try{
					cntt = cnt + parseInt(checkedZeroY[k]);
					ii = i + parseInt(checkedZeroX[k]);
					id = (cntt).toString() + (ii).toString();
					document.getElementById(id).innerHTML = map[cntt][ii];
				}
				catch(err){}
			}
		}
	}
}

function actionButt(Y,X,pos)
{
	go = 1;
	for(i=0; i<pressedId.length; i++)
	{
		if(pressedId[i] == pos){
			go = 0;
			break;
			
		}
	}

	if(go == 1){
	if(crBoombs == 0)
	{
		createBombs(Y,X);
		crBoombs = 1;
	}
	
	if(map[Y][X] == -1)
	{
		document.getElementById(pos).innerHTML = "B!";
	}
	else{
		document.getElementById(pos).innerHTML = map[Y][X];
	}
	
	point = document.getElementById("score").innerHTML;
	point = parseInt(point) + map[Y][X];
	document.getElementById("score").innerHTML = point;

	pressedId.push(pos);
	activButtHelper(Y,X);
	fillZero();
	}
}

function crBoHelper()
{
	for(Y=0; Y<map.length; Y++)
	{
		for(X=0; X<map[0].length; X++)
		{
			if(map[Y][X] == -1)
			{
		try{
			if(map[Y-1][X-1] != -1)
			{
				map[Y-1][X-1] += 1;
			}
		}
		catch(err){}

		try{
			if(map[Y-1][X] != -1)
			{
				map[Y-1][X] += 1;
			}
		}
		catch(err){}
		
		try{
			if(map[Y-1][X+1] != -1)
			{
				map[Y-1][X+1] += 1;
			}
		}
		catch(err){}
		
		try{
			if(map[Y][X-1] != -1)
			{
				map[Y][X-1] += 1;
			}
		}
		catch(err){}
		try{
			if(map[Y+1][X+1] != -1)
			{
				map[Y+1][X+1] += 1;
			}
		}
		catch(err){}
		
		try{
			if(map[Y][X+1] != -1)
			{
				map[Y][X+1] += 1;
			}
		}
		catch(err){}
		
		try{
			if(map[Y+1][X-1] != -1)
			{
				map[Y+1][X-1] += 1;
			}
		}
		catch(err){}
		
		try{
			if(map[Y+1][X] != -1)
			{
				map[Y+1][X] += 1;
			}
		}
		catch(err){}
		}
		}
	}
}















var canvas = document.getElementById('field');
var context = canvas.getContext('2d');
var startButton = document.getElementById('start');
var clearButton = document.getElementById('clear');
var lifeArray = [];
var rows = 50;
var columns = 50;
var timer;
var count = 0;

var createField= () => {
    for(var i = 0; i < rows; i++) {
    lifeArray[i] = [];
      for(var j = 0; j < columns; j++) {
        lifeArray[i][j] = 0;
    }
  }
}

createField();

canvas.onclick = (event) => {
    var x = Math.floor(event.offsetX / 10);
    var y = Math.floor(event.offsetY / 10);
    lifeArray[y][x] = 1;
    drawField();
}

var drawField = () => {
    context.clearRect(0,0,500,500);
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < columns; j++) {
            if(lifeArray[i][j] == 1) {
                context.fillRect(j*10,i*10,10,10);
            }
        }
    }
}

var startLife = () => {
	var array = [];
	for (var i = 0; i < rows; i++){
		array[i]=[];
		for (var j = 0; j < columns; j++) {
            var neighbors = 0;
            if (lifeArray[fpm(i)-1][j]==1) neighbors++;
            if (lifeArray[i][fpp(j)+1]==1) neighbors++;
            if (lifeArray[fpp(i)+1][j]==1) neighbors++;
            if (lifeArray[i][fpm(j)-1]==1) neighbors++;
            if (lifeArray[fpm(i)-1][fpp(j)+1]==1) neighbors++;
            if (lifeArray[fpp(i)+1][fpp(j)+1]==1) neighbors++;
            if (lifeArray[fpp(i)+1][fpm(j)-1]==1) neighbors++;
            if (lifeArray[fpm(i)-1][fpm(j)-1]==1) neighbors++;
            (neighbors == 3) ? array[i][j] = 1 : array[i][j] = 0;
            if (neighbors != 2 || neighbors != 3) lifeArray[i][j]=0;
		}
	}
	lifeArray = array;
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 500);
}

var fpm = (i) => {
    if (i==0) {
        return 50;
    }
	return i;
}

var fpp = (i) => {
	if(i==49) {
        return -1;
    }
	return i;
}

clearButton.onclick = () => location.reload();

startButton.onclick = startLife;
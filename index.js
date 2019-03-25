var tab__number1 = new Array(4);
var tab__position1 = new Array(4);
var tab__pos = new Array(16);
var sum;
var keyword__move;
var keyword = 1;

var container = document.getElementsByClassName("container");
var square__position = document.getElementsByClassName("container__number");


//Tworzenie tablic dwuwymiarowych
for (var i = 0; i < 16; i++) {
    tab__pos[i] = 0;
}

for (var i = 0; i < 4; i++) {
    tab__number1[i] = new Array(4);
    tab__position1[i] = new Array(4);
}

for (var i = 0; i < tab__position1.length; i++) {
    for (var j = 0; j < tab__position1.length; j++) {
        tab__number1[i][j] = 0;
        tab__position1[i][j] = 0;
        tab__pos[i * 4 + j] = 0;
    }
}

//Sterowanie za pomocą strzałek
window.addEventListener('keydown', function (event) {

    switch (event.keyCode) {

        case 37: // Left

            keyword__move = 1;
            move(keyword__move, tab__position1, tab__number1, false);

            break;

        case 38: // Up

            keyword__move = 2;
            move(keyword__move, tab__position1, tab__number1, false);

            break;

        case 39: // Right

            keyword__move = 3;
            move(keyword__move, tab__position1, tab__number1, false);

            break;

        case 40: // Down

            keyword__move = 4;
            move(keyword__move, tab__position1, tab__number1, false);

            break;

    }
}, false);

//Funkcja losująca liczbę 2 lub 4. Z prawd. 9/10 na wylosowanie 2.
function rand__numbers() {
    var tab__square = [];
    var rand = Math.floor((Math.random() * 10));

    for (var i = 0; i < 10; i++) {
        tab__square[i] = 2;

        if (i == 9) {
            tab__square[i] = 4;
        }
    }

    return tab__square[rand];
}

//Losowanie pozycji na której znajdzie się nowo wylosowana liczba
function rand__square() {
    var rand1;
    var rand2;
    var x = 0;

    tab__free = [];

    tab__free2 = [];

    for (var i = 0; i < tab__number1.length; i++) {
        for (var j = 0; j < tab__number1.length; j++) {
            tab__free[i * 4 + j] = [i, j, tab__number1[i][j]];
        }
    }

    for (var i = tab__free.length - 1; i >= 0; i--) {
        if (tab__free[i][2] != 0) {
            tab__free.splice(i, 1);
        }
    }

    var rand = Math.floor((Math.random() * tab__free.length));

    if (square__position.length < 16) {



        rand1 = tab__free[rand][0];
        rand2 = tab__free[rand][1];

        console.log(tab__free);

        if (square__position.length == 15) {

            var tab__number2 = Array(4);
            var tab__position2 = Array(4);

            for (var i = 0; i < 4; i++) {
                tab__number2[i] = new Array(4);
                tab__position2[i] = new Array(4);
            }

            for (var i = 0; i < tab__position1.length; i++) {
                for (var j = 0; j < tab__position1.length; j++) {
                    tab__number2[i][j] = tab__number1[i][j];
                    tab__position2[i][j] = tab__position1[i][j];
                }
            }

        }
        choose__square(rand1, rand2);
    }
}

//Wybranie pozycji 
function choose__square(rand1, rand2) {
    if (tab__position1[rand1][rand2] == 0) {
        var rand__number = rand__numbers();

        var left__position = 10 + 110 * rand2;
        var top__position = 10 + 110 * rand1;

        sum = 1;

        for (var a = 0; a < tab__number1.length; a++) {
            for (var b = 0; b < tab__number1.length; b++) {
                if (tab__position1[a][b] != 0) {
                    sum = sum + 1;
                }
            }
        }

        tab__number1[rand1][rand2] = rand__number;
        tab__position1[rand1][rand2] = sum;

        var container = document.getElementsByClassName("container");
        var new__div = document.createElement("div");

        container[0].appendChild(new__div);

        new__div.className = "container__number";

        var id = setInterval(change, 300);

        function change() {
            new__div.style.opacity = 1;
        }


        new__div.innerHTML = rand__number;

        new__div.style.top = top__position + "px";
        new__div.style.left = left__position + "px";

        sum__all();

    }

}

//Zmiana koloru przy zwiększeniu się wartości
function change__color() {
    for (var i = 0; i < square__position.length; i++) {
        var col = square__position[i].innerHTML + "";

        if (square__position[i].innerHTML > 2 && square__position[i].innerHTML < 10) {
            square__position[i].style.backgroundColor = "#" + col + col + col + "2da";
        } else if (square__position[i].innerHTML < 100) {
            square__position[i].style.backgroundColor = "#" + col + "e2da";
        } else if (square__position[i].innerHTML < 1000) {
            square__position[i].style.backgroundColor = "#" + col + "2da";
        } else if (square__position[i].innerHTML < 10000) {
            square__position[i].style.backgroundColor = "#" + col + "da";
        }

    }
}

//Suma wszystkich płytek
function sum__all() {
    var sum__all = 0;
    var score = document.getElementsByClassName("score__paragraph");

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            sum__all += tab__number1[i][j];
        }
    }

    score[1].innerHTML = sum__all;
}

//Funkcja do wybierania strony do której płytki mają być przesunięte
function move(keyword__move, tab__position, tab__number, check__move) {
    var memory;
    var memory__number;

    if (keyword__move == 1) {
        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[i][j] == 0) {
                        memory = tab__position[i][j];

                        tab__position[i][j] = tab__position[i][j + 1];
                        tab__position[i][j + 1] = memory;

                        memory__number = tab__number[i][j];

                        tab__number[i][j] = tab__number[i][j + 1];
                        tab__number[i][j + 1] = memory;
                    }
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (var j = 0; j < tab__position.length - 1; j++) {
                if (tab__number[i][j] === tab__number[i][j + 1] && tab__number[i][j + 1] != 0) {
                    tab__number[i][j] = 2 * tab__number[i][j];
                    tab__number[i][j + 1] = 0;

                    if (check__move == false) {
                        square__position[tab__position[i][j] - 1].innerHTML = tab__number[i][j];

                        container[0].removeChild(square__position[tab__position[i][j + 1] - 1]);
                    }

                    for (var a = 0; a < tab__position.length; a++) {
                        for (var b = 0; b < tab__position.length; b++) {
                            if (tab__position[i][j + 1] < tab__position[a][b]) {
                                tab__position[a][b] = tab__position[a][b] - 1;
                            }
                        }
                    }

                    tab__position[i][j + 1] = 0;
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[i][j] == 0) {
                        memory = tab__position[i][j];

                        tab__position[i][j] = tab__position[i][j + 1];
                        tab__position[i][j + 1] = memory;

                        memory__number = tab__number[i][j];

                        tab__number[i][j] = tab__number[i][j + 1];
                        tab__number[i][j + 1] = memory;
                    }
                }
            }
        }

        if (check__move == false) {
            for (var i = 0; i < tab__position.length; i++) {
                for (var j = 0; j < tab__position.length; j++) {
                    var left__position = 10 + 110 * j;

                    if (tab__position[i][j] != 0) {
                        square__position[tab__position[i][j] - 1].style.left = left__position + "px";
                        change__color();
                    }
                }
            }
        }

        keyword = 1;

        if (square__position.length == 16) {
            keyword = 2;
        }

    }

    if (keyword__move == 2) {
        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[j][i] == 0) {
                        memory = tab__position[j][i];

                        tab__position[j][i] = tab__position[j + 1][i];
                        tab__position[j + 1][i] = memory;

                        memory__number = tab__number[j][i];

                        tab__number[j][i] = tab__number[j + 1][i];
                        tab__number[j + 1][i] = memory;
                    }
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (var j = 0; j < tab__position.length - 1; j++) {
                if (tab__number[j][i] === tab__number[j + 1][i] && tab__number[j + 1][i] != 0) {
                    tab__number[j][i] = 2 * tab__number[j][i];
                    tab__number[j + 1][i] = 0;

                    if (check__move == false) {
                        square__position[tab__position[j][i] - 1].innerHTML = tab__number[j][i];

                        container[0].removeChild(square__position[tab__position[j + 1][i] - 1]);
                    }

                    for (var a = 0; a < tab__position.length; a++) {
                        for (var b = 0; b < tab__position.length; b++) {
                            if (tab__position[j + 1][i] < tab__position[a][b]) {
                                tab__position[a][b] = tab__position[a][b] - 1;
                            }
                        }
                    }

                    tab__position[j + 1][i] = 0;
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[j][i] == 0) {
                        memory = tab__position[j][i];

                        tab__position[j][i] = tab__position[j + 1][i];
                        tab__position[j + 1][i] = memory;

                        memory__number = tab__number[j][i];

                        tab__number[j][i] = tab__number[j + 1][i];
                        tab__number[j + 1][i] = memory;
                    }
                }
            }
        }
        if (check__move == false) {
            for (var i = 0; i < tab__position.length; i++) {
                for (var j = 0; j < tab__position.length; j++) {
                    var top__position = 10 + 110 * j;

                    if (tab__position[j][i] != 0) {
                        square__position[tab__position[j][i] - 1].style.top = top__position + "px";
                        change__color();
                    }
                }
            }
        }

        keyword = 1;

        if (square__position.length == 16) {
            keyword = 3;
        }
    }

    if (keyword__move == 3) {

        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[i][j + 1] == 0) {
                        memory = tab__position[i][j + 1];

                        tab__position[i][j + 1] = tab__position[i][j];
                        tab__position[i][j] = memory;

                        memory__number = tab__number[i][j];

                        tab__number[i][j + 1] = tab__number[i][j];
                        tab__number[i][j] = memory;
                    }
                }
            }

        }

        for (var i = 0; i < tab__position.length; i++) {
            for (var j = tab__position.length - 1; j >= 0; j--) {
                if (tab__number[i][j] === tab__number[i][j + 1] && tab__number[i][j + 1] != 0) {
                    tab__number[i][j] = 2 * tab__number[i][j];
                    tab__number[i][j + 1] = 0;

                    if (check__move == false) {
                        square__position[tab__position[i][j] - 1].innerHTML = tab__number[i][j];

                        container[0].removeChild(square__position[tab__position[i][j + 1] - 1]);
                    }

                    for (var a = 0; a < tab__position.length; a++) {
                        for (var b = 0; b < tab__position.length; b++) {
                            if (tab__position[i][j + 1] < tab__position[a][b]) {
                                tab__position[a][b] = tab__position[a][b] - 1;
                            }
                        }
                    }

                    tab__position[i][j + 1] = 0;
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[i][j + 1] == 0) {
                        memory = tab__position[i][j + 1];

                        tab__position[i][j + 1] = tab__position[i][j];
                        tab__position[i][j] = memory;

                        memory__number = tab__number[i][j];

                        tab__number[i][j + 1] = tab__number[i][j];
                        tab__number[i][j] = memory;
                    }
                }
            }
        }

        if (check__move == false) {
            for (var i = 0; i < tab__position.length; i++) {
                for (var j = 0; j < tab__position.length; j++) {
                    var left__position = 10 + 110 * j;

                    if (tab__position[i][j] != 0) {
                        square__position[tab__position[i][j] - 1].style.left = left__position + "px";
                        change__color();
                    }
                }
            }
        }

        keyword = 1;

        if (square__position.length == 16) {
            keyword = 4;
        }
    }

    if (keyword__move == 4) {
        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[j + 1][i] == 0) {
                        memory = tab__position[j + 1][i];

                        tab__position[j + 1][i] = tab__position[j][i];
                        tab__position[j][i] = memory;

                        memory__number = tab__number[j][i];

                        tab__number[j + 1][i] = tab__number[j][i];
                        tab__number[j][i] = memory;
                    }
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (var j = 0; j < tab__position.length - 1; j++) {
                if (tab__number[j][i] === tab__number[j + 1][i] && tab__number[j + 1][i] != 0) {
                    tab__number[j][i] = 2 * tab__number[j][i];
                    tab__number[j + 1][i] = 0;

                    if (check__move == false) {
                        square__position[tab__position[j][i] - 1].innerHTML = tab__number[j][i];

                        container[0].removeChild(square__position[tab__position[j + 1][i] - 1]);
                    }

                    for (var a = 0; a < tab__position.length; a++) {
                        for (var b = 0; b < tab__position.length; b++) {
                            if (tab__position[j + 1][i] < tab__position[a][b]) {
                                tab__position[a][b] = tab__position[a][b] - 1;
                            }
                        }
                    }

                    tab__position[j + 1][i] = 0;
                }
            }
        }

        for (var i = 0; i < tab__position.length; i++) {
            for (k = 0; k < 6; k++) {
                for (var j = 0; j < tab__position.length - 1; j++) {
                    if (tab__position[j + 1][i] == 0) {
                        memory = tab__position[j + 1][i];

                        tab__position[j + 1][i] = tab__position[j][i];
                        tab__position[j][i] = memory;

                        memory__number = tab__number[j][i];

                        tab__number[j + 1][i] = tab__number[j][i];
                        tab__number[j][i] = memory;
                    }
                }
            }
        }

        if (check__move == false) {
            for (var i = 0; i < tab__position.length; i++) {
                for (var j = 0; j < tab__position.length; j++) {
                    var top__position = 10 + 110 * j;

                    if (tab__position[j][i] != 0) {
                        square__position[tab__position[j][i] - 1].style.top = top__position + "px";
                        change__color();
                    }
                }
            }
        }

        keyword = 1;

        if (square__position.length == 16) {
            keyword = 5;
        }

    }

    if (check__move == false) {
        sum__all(tab__number);
        rand__square();
    }

    if (square__position.length == 16) {
        console.log("Ilość numerów: " + square__position.length + "działa");

        sum__tab1 = 0;
        sum__tab2 = 0;

        if (keyword == 1) {

            tab__number2 = Array(4);
            tab__position2 = Array(4);

            for (var i = 0; i < 4; i++) {
                tab__number2[i] = new Array(4);
                tab__position2[i] = new Array(4);
            }

            for (var i = 0; i < tab__position1.length; i++) {
                for (var j = 0; j < tab__position1.length; j++) {
                    tab__number2[i][j] = tab__number1[i][j];
                    tab__position2[i][j] = tab__position1[i][j];
                }
            }
        }

        for (var i = 1; i <= 4; i++) {

            console.log(keyword);

            if (keyword == 5) {
                break;
            }

            move(keyword, tab__position2, tab__number2, true);
        }

        if (keyword == 5) {
            for (var i = 0; i < tab__number2.length; i++) {
                for (var j = 0; j < tab__number2.length; j++) {
                    if (tab__number2[i][j] == 0) {
                        sum__tab2++;
                    }
                }
            }

            for (var i = 0; i < tab__number1.length; i++) {
                for (var j = 0; j < tab__number1.length; j++) {
                    if (tab__number1[i][j] == 0) {
                        sum__tab1++;
                    }
                }
            }
        }

        if (sum__tab1 == sum__tab2) {
                
             var id = setInterval(fade, 1000);
            document.getElementsByClassName("container__again")[0].style.display = "block"; 
        function fade()
           {            document.getElementsByClassName("container__again")[0].style.opacity = "0.9";
           }
        }

    }
}

//Losowanie dwóch płytek na początku gry
rand__square();
rand__square();


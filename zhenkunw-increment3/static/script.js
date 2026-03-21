function addYear(){
    var year = new Date().getFullYear()
    document.getElementById("copyYear").innerHTML = year;
}

now = new Date();
var hour = now.getHours();

function greeting(x){
    var greeting = document.getElementById("greeting").innerHTML = "Good Night"
    if (!greeting){
        return;
    }
    
    if (x < 5 || x >= 20){
        document.getElementById("greeting").innerHTML = "Good Night";
    }
    else if (x < 12 && x > 5){
        document.getElementById("greeting").innerHTML = "Good Morning"; 
    } else if (x >= 12 && x < 18){
        document.getElementById("greeting").innerHTML = "Good Afternoon";
    } else if (x >= 18 && x < 20){
        document.getElementById("greeting").innerHTML = "Good Evening";
    }
}

greeting(hour);

var x = 5; 
var y = 7; 
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function sumnPrint(x1, x2){
    var sum = x1 + x2;
    console.log(sum);
}

sumnPrint(x, y);
sumnPrint(A, B);

if (C.length > z){
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
L2 = ["Apple", "Banana", "Kiwi", "Orange"];


function findBanana(fruits){
    for (var i = 0; i < fruits.length; i ++){
        var fruit = fruits[i];
        if (fruit == "Banana"){
            alert();
        }
    }
}

// findBanana(L1);
// findBanana(L2);

// L1.forEach(findBananaAgain);
// L2.forEach(findBananaAgain);

function findBananaAgain(fruit){
    if (fruit == "Banana"){
        alert();
    }
}

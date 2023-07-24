var cat;
var catAnims = ["idle", "look", "lick", "rub", "walk", "run", "sleep", "tap", "jump", "arch"];

var character;
var bubble;

var meows = [
    new Audio("sounds/meow1.mp3"), 
    new Audio("sounds/meow2.mp3"), 
    new Audio("sounds/meow3.mp3"), 
    new Audio("sounds/meow4.mp3"), 
    new Audio("sounds/meow5.mp3")];
var hit = new Audio("sounds/hit.mp3");

window.onload = function() {
    cat = document.getElementById("cat");
    cat.addEventListener("click", catClicked);

    character = document.getElementById("character");
    character.addEventListener("click", characterClicked);
    bubble = document.getElementById("bubble");
}

function catClicked()
{
    if(cat.getAttribute("catAnim") != "arch")
    {
        meows[Math.floor(Math.random() * meows.length)].play();
        cat.setAttribute("catAnim", "arch");
        setTimeout(catToIdle, 1000)
    }
}

function catToIdle()
{
    cat.setAttribute("catAnim", "idle");
    setTimeout(catRandomAnim, 1000);
}

function catRandomAnim()
{
    if(Math.random() > 0.5 && cat.getAttribute("catAnim") != "arch")
    {
        cat.setAttribute("catAnim", "idle");
        setTimeout(catRandomAnim, 2000);
    }
    else if(cat.getAttribute("catAnim") != "arch")
    {
        let anims = ["look", "lick", "rub", "tap"];
        cat.setAttribute("catAnim", anims[Math.floor(Math.random() * anims.length)]);
        setTimeout(catRandomAnim, 1000);
    }
}

function characterClicked()
{
    bubble.remove();
    hit.play();
}
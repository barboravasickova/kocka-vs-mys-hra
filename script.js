let cat = document.getElementById("cat");
let mouse = document.getElementById("mouse");
const house = document.getElementById("house");
const housetwo = document.getElementById("housetwo");
const trap = document.getElementById("trap");

let catX = 50;
let catY = 50;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let caught = false;
let points = 0;

function addPoint() {
    points++;
    document.getElementById("score").textContent = "Body: " + points;
}


// kontrola, jestli myš je v domečku
function isInHouse(x, y) {
    const rect = house.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}

// kontrola, jestli kočka by byla v domečku
function catInHouse(x, y) {
    const rect = house.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}


// kontrola, jestli myš je v domečku 2
function isInHouseTwo(x, y) {
    const rect = housetwo.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}

// kontrola, jestli kočka by byla v domečku
function catInHouseTwo(x, y) {
    const rect = housetwo.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}



// pohyb myši podle kurzoru
document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouse.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// reset myši po kliknutí
document.addEventListener("click", () => {
    if (caught) {
        mouse.textContent = "🐁";
        caught = false;
        mouseX = Math.random() * (window.innerWidth - 50);
        mouseY = Math.random() * (window.innerHeight - 50);
    }
});

function loop() {
    requestAnimationFrame(loop);

    let dx = mouseX - catX;
    let dy = mouseY - catY;
    let speed = 0.020;

    let newCatX = catX + dx * speed;
    let newCatY = catY + dy * speed;

    if (!catInHouse(newCatX, newCatY)) {
        catX = newCatX;
        catY = newCatY;
    }

    if (!catInHouseTwo(newCatX, newCatY)) {
        catX = newCatX;
        catY = newCatY;
    }

    cat.style.transform = `translate(${catX}px, ${catY}px)`;

    const distance = Math.hypot(mouseX - catX, mouseY - catY);

    // kolize s myší a vynulování
    if (!caught && distance < 60 && !isInHouse(mouseX, mouseY) && !isInHouseTwo(mouseX, mouseY)) {
    mouse.textContent = "💀";
    caught = true;
    points = 0;               
    score.textContent = "Body: " + points;
    }

    // přičítání bodů
    setInterval(() => {
    if (!caught) {      
        addPoint();
    }
    }, 1000)

}

// spustit smyčku
loop();

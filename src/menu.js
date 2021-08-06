import { changeIndex } from "./solarSystem.js";

//INSTRUCTIONS
var instructX = document.getElementById("exit1");
var instructBox = document.getElementById("instBox");

instructX.addEventListener("click", function(event){
    instructBox.remove();
});

//INFORMATION
var planetButtons = {
    sun : {
        button : document.getElementById("sunB"),
        text :"<b>Name:</b> Sun <br><br> <b>Radius:</b> 696,340 km<br><br><b>Mass:</b>  1.989 × 10^30 kg<br><br> <b>Age:</b> 4.603 billion years <br><br><b>Temperature:</b>  5,500 degrees C<br><br><b>Description:</b> The Sun is the star at the center of the Solar System. It is made out of hot plasma heated by the nuclear fusion reaction in its core, radiating visible, ultraviolet and infrared light."
    },
    mercury : {
        button : document.getElementById("mercuryB"),
        text :" <b>Name:</b> Mercury <br><br> <b>Radius:</b> 2,439.7 km<br><br><b>Mass:</b> 3.285 × 10^23 kg<br><br> <b>Age:</b> 4.503 billion years <br><br><b>Temperature:</b> 167 degrees C<br><br><b>Description:</b> Mercury is the smallest planet in the Solar System and the closest to the Sun. It has a solid surface that is covered with craters like our Moon and is rich in sulfur."
    },
    venus : {
        button : document.getElementById("venusB"),
        text :" <b>Name:</b> Venus <br><br> <b>Radius:</b> 6,051.8 km<br><br><b>Mass:</b> 4.867 × 10^24 kg<br><br> <b>Age:</b> 4.503 billion years <br><br><b>Temperature:</b> 475 degrees C<br><br><b>Description:</b> Venus has a solid surface that is covered with craters like our Moon and is of similar size as Earth. It is covered with a layer of sulfuric acid clouds giving it a thick atmosphere that acts as a greenhouse, heating the surface to above the melting point of lead(471 degrees C)."
    },
    earth : {
        button : document.getElementById("earthB"),
        text :" <b>Name:</b> Earth <br><br> <b>Radius:</b> 6371.1km<br><br><b>Mass:</b> 5.97237×1024 kg<br><br> <b>Age:</b> 4.543 billion years <br><br><b>Temperature:</b> 15 degrees C<br><br><b>Description:</b> Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth's surface is land consisting of continents and islands, the remaining 70.8% is covered with water. Earth's outer layer is divided into rigid tectonic plates, while its interior remains active with a solid iron inner core, a liquid outer core and a convective mantle."
    },
    mars : {
        button : document.getElementById("marsB"),
        text :" <b>Name:</b> Mars <br><br> <b>Radius:</b> 3,389.5 km<br><br><b>Mass:</b>  6.39 × 10^23 kg<br><br> <b>Age:</b> 4.603 billion years <br><br><b>Temperature:</b> -60 degrees C<br><br><b>Description:</b> Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. The effect of the iron oxide prevalent on Mars's surface gives it a reddish appearance distinctive among the astronomical bodies and earning it the nickname 'Red Planet'. Mars is a rocky planet with impact craters reminiscent of the Moon and valleys, deserts and polar ice caps like Earth."
    },
    saturn : {
        button : document.getElementById("saturnB"),
        text :" <b>Name:</b> Saturn <br><br> <b>Radius:</b> 58,232 km<br><br><b>Mass:</b> 5.683 × 10^26 kg<br><br> <b>Age:</b> 4.503 billion years <br><br><b>Temperature:</b> -178 degrees C<br><br><b>Description:</b> Saturn is the second-largest planet in the Solar System, after Jupiter. It is a gas giant with only one-eighth the average density of Earth while still being nine and half time as big and 95 times more massive. Its iron-nickel core is surrounded by a deep layer of metallic hydrogen, an intermediate layer of liquid hydrogen and liquid helium, and finally a gaseous outer layer. Wind speeds on Saturn can reach 1,800 km/h."
    },
    jupiter : {
        button : document.getElementById("jupiterB"),
        text :" <b>Name:</b> Jupiter <br><br> <b>Radius:</b> 69,911 km<br><br><b>Mass:</b> 1.898 × 10^27 kg<br><br> <b>Age:</b> 4.603 billion years <br><br><b>Temperature:</b> -145  degrees C<br><br><b>Description: </b> Jupiter is the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. Jupiter is primarily composed of hydrogen and  like the other giant planets, Jupiter lacks a well-defined solid surface. Surrounding Jupiter is a faint planetary ring system in additiong to 80 known moons."
    },
    uranus : {
        button : document.getElementById("uranusB"),
        text :" <b>Name:</b> Uranus <br><br> <b>Radius:</b> 25,362 km<br><br><b>Mass:</b> 8.681 × 10^25 kg<br><br> <b>Age:</b> 4.503 billion years <br><br><b>Temperature:</b> -195 degrees C<br><br><b>Description:</b> Uranus is similar in composition to Neptune, and both have bulk chemical compositions. Often refered to as 'ice giant' since its atmosphere which is primary composition of hydrogen and helium also containes ices such as water, ammonia, and methane. Uranus has the coldest planetary atmosphere in the Solar System and acomplex, layered cloud structure and and interior made of ice and rock."
    },
    neptune : {
        button : document.getElementById("neptuneB"),
        text :" <b>Name:</b> Neptune <br><br> <b>Radius:</b> 24,622 km<br><br><b>Mass:</b> 1.024 × 10^26 kg<br><br> <b>Age:</b> 4.503 billion years <br><br><b>Temperature:</b> -200 degrees C<br><br><b>Description:</b> Neptune is the eighth and farthest known Solar planet from the Sun. It is similar in composition to Uranus, and both have bulk chemical compositions. Often refered to as 'ice giant' since its atmosphere which is primary composition of hydrogen and helium also containes ices such as water, ammonia, and methane. Uranus has the coldest planetary atmosphere in the Solar System and acomplex, layered cloud structure and and interior made of ice and rock. "
    }
}
//YOU CAN ADD GRAVITY AS WELL
var infoPara = document.getElementById("info");
var infoBox = document.getElementById("infoBox");
var infoTitle = document.getElementById("infoTitle");
var infoX = document.getElementById("exit2");
var planetIndex = 0;
const event = document.createEvent('Event');
event.initEvent('ich', true, true);
var canvas = document.getElementsByName("earth")
console.log(canvas);
clickButton("MERCURY", planetButtons.mercury.button, planetButtons.mercury.text, 1);
clickButton("SUN", planetButtons.sun.button, planetButtons.sun.text, 0);
clickButton("VENUS", planetButtons.venus.button, planetButtons.venus.text, 2);
clickButton("EARTH", planetButtons.earth.button, planetButtons.earth.text, 3);
clickButton("MARS", planetButtons.mars.button, planetButtons.mars.text, 5);
clickButton("SATURN", planetButtons.saturn.button, planetButtons.saturn.text, 6);
clickButton("JUPITER", planetButtons.jupiter.button, planetButtons.jupiter.text, 7);
clickButton("URANUS", planetButtons.uranus.button, planetButtons.uranus.text, 8);
clickButton("NEPTUNE", planetButtons.neptune.button, planetButtons.neptune.text, 9);

function clickButton(planet, button, text, pIndex){
    button.addEventListener("click", function(event){
        infoPara.innerHTML = text;
        infoBox.style.visibility = "visible";
        infoTitle.innerHTML = planet;
        changeIndex(pIndex);
    });
};

infoX.addEventListener("click", function(event){
    infoBox.style.visibility = "hidden";
});

export {planetIndex};
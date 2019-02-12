
function rightClick() {
    ERIC_INSTANCE.reset();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function presentersView(){
    ERIC_STATS.dom.style.visibility = 'hidden';
    dat.GUI.toggleHide();
}

function debugView(){
    ERIC_STATS.dom.style.visibility = 'visible';
    dat.GUI.toggleHide();
}

var vara;

$(document).ready(function () {

    ERIC_STATS = new Stats();
    ERIC_STATS.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( ERIC_STATS.dom );
    
    // idleTimer() takes an optional argument that defines the idle timeout
    // timeout is in milliseconds; defaults to 30000
    $.idleTimer(10000);


    $(document).bind("idle.idleTimer", function () {
        console.log("idle");
        startAnimation();
    });


    $(document).bind("active.idleTimer", function () {
        console.log("active");
        stopAnimation();
    });

    var playing = false;
    
    function startAnimation() {
        if (!playing) {
            var randomInt = getRandomInt(1000000);
            $('div.vara-container').remove();
            $('#container').append('<div class="vara-container" id="v' + randomInt + '"></div>');
            createVara(randomInt);


        }
    }

    function stopAnimation() {
        playing = false;
        for (var i = 1; i < 6; i++) {
            try {
                var textObj = vara.get("t" + i);
                console.log("Got text object: " + JSON.stringify(textObj))
                textObj.container.style.transition = "opacity 1s 1s";
                textObj.container.style.opacity = 0;
            } catch (ex) {

            }
        }


    }



    function createVara(cont) {
        
        vara = new Vara("#v" + cont, "PacificoSLO.json", [{
                text: "Hello!",
                y: 50,
                duration: 1000,
                id: "t1"
        },
            {
                text: "Use the Wii remote to control me!",
                id: "t2"
        },
            {
                text: "Hold down the rear button to draw.",
                id: "t3"
        },
            {
                text: "The A button resets your drawing.",
                id: "t4"
        }
        ], {
            fontSize: 70,
            color: "white",
            strokeWidth: 2,
            textAlign: "center",
            duration: 7000,
            width: 1200,
            autoAnimation: false,
            queued: true,
        });

        vara.ready(function () {
            console.log("vara is ready");
            vara.playAll("t1");
            playing = true;
        });

        vara.animationEnd(function (i, o) {
            console.log("Animation End " + i);
        });

    }






});

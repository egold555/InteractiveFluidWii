function rightClick() {
    ERIC_INSTANCE.reset();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var vara;

$(document).ready(function () {

    // idleTimer() takes an optional argument that defines the idle timeout
    // timeout is in milliseconds; defaults to 30000
    $.idleTimer(5000);


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

            //            for (var i = 1; i < 6; i++) {
            //                var textObj = vara.get("t" + i);
            //                console.log("Got text object: " + JSON.stringify(textObj))
            //                //textObj.container.style.transition = "opacity 1s 1s";
            //                textObj.container.style.opacity = 1;
            //            }

//            if (vara != null) {
//                for (var i = 1; i < 6; i++) {
//                    var textObj = vara.get("t" + i);
//                    console.log("Got text object: " + JSON.stringify(textObj))
//                    textObj.container.style.transition = "opacity 1s 1s";
//                    textObj.container.style.opacity = 0;
//                }
//            }
            var randomInt = getRandomInt(1000000);
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
                text: "Hold down the back button to draw.",
                id: "t3"
        },
            {
                text: "The A button resets your drawing.",
                id: "t4"
        },
            {
                text: "(Move remote to dismiss)",
                id: "t5" + "#v" + cont
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
            if (i.startsWith("t5")) {
                var toRemove = i.substring(2);
                console.log("Removed: " + toRemove);
                $(toRemove).remove();

            }
        });

    }






});

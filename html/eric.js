function rightClick() {
    ERIC_INSTANCE.reset();
}

$(document).ready(function () {
    //  $(document).mousemove(function(event){
    //    console.log("MOUSE: " + event.pageX + ", " + event.pageY)
    //  });

    // idleTimer() takes an optional argument that defines the idle timeout
    // timeout is in milliseconds; defaults to 30000
    $.idleTimer(5000);


    $(document).bind("idle.idleTimer", function () {
        console.log("idle")
    });


    $(document).bind("active.idleTimer", function () {
        console.log("active")
    });

});

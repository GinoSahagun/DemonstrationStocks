$(function() {


    //jQuery methods go here...
    //navbar more links dropdown
    $(".dropdown-button").dropdown();

    //window shrinks into mobile side navbar
    $(".button-collapse").sideNav({
        menuWidth: 225, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

});

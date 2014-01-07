$(document).ready(function () {
    var apiUrl = 'http://localhost:8080';

    var currentPosition = 0;
    var slideWidth = $(".max_width_wrapper").width();
    var slides = $('.slide');
    var numberOfSlides = slides.length;
    var autoscroll = true;
    var autoscrollnum = 0;

    // Wrap all .slides with #slideInner div
    slides
        .wrapAll('<div id="slideInner"></div>')
        // Float left to display horizontally, readjust .slides width
        .css({
            'float': 'left',
            'width': slideWidth
        });

    // Set #slideInner width equal to total width of all slides
    $(window).bind("load", function () {
        slideWidth = $(".max_width_wrapper").width();
        $('#slideInner').css('width', slideWidth * numberOfSlides);
        $('.slide').css('width', slideWidth);
    });

    // Insert left and right arrow controls in the DOM
    $('#slideshow')
        .prepend('<span class="control" id="leftControl">Move left</span>')
        .append('<span class="control" id="rightControl">Move right</span>');

    // Hide left arrow control on first load
    manageControls(currentPosition);

    function scrollDiv(controller) {
        // Determine new position
        console.log(controller);
        currentPosition = ($(controller).attr('id') == 'rightControl')
            ? currentPosition + 1 : currentPosition - 1;

        // Hide / show controls
        manageControls(currentPosition);
        // Move slideInner using margin-left
        $('#slideInner').animate({
            'marginLeft': slideWidth * (-currentPosition)
        });
    }

    // Create event listeners for .controls clicks
    $('.control')
        .bind('click', function () {
            autoscroll = false;
            scrollDiv(this);
        });

    window.setInterval(function () {
        if (autoscroll === true) {
            if (autoscrollnum < numberOfSlides - 1) {
                autoscrollnum = autoscrollnum + 1;
                scrollDiv($('.control#rightControl'));
            }
            else {
                while (autoscrollnum > 0) {
                    autoscrollnum = autoscrollnum - 1;
                    scrollDiv($('.control#leftControl'));
                }
            }
        }
    }, 5000);

    // manageControls: Hides and shows controls depending on currentPosition
    function manageControls(position) {
        // Hide left arrow if position is first slide
        if (position == 0) {
            $('#leftControl').hide()
        }
        else {
            $('#leftControl').show()
        }
        // Hide right arrow if position is last slide
        if (position == numberOfSlides - 1) {
            $('#rightControl').hide()
        }
        else {
            $('#rightControl').show()
        }
    }

    $(function () {
        $('header').data('size', 'big');
        $('header').addClass('big');
    });

    //dropdown menu
    $("header").on("click", ".hamburger_menu", function (event) {
        $("#dropdown_menu").slideToggle();
    });

    $('.submit_button').click(function () {
        $.post(apiUrl + '/customers', {
            name: $('[name=name]').val(),
            email: $('[name=email]').val()
        });

        var data = new FormData()
        var files = $('input[name=images]').get(0).files

        $.each(files, function (index, file) {
            data.append('pictures[]', file, file.name);
        });

        data.append('name', $('[name=productName]').val())
        data.append('condition', $('[name=condition]').val())
        data.append('customer_id', $('[name=email]').val())
        data.append('customer_description', $('[name=customerDescription]').val())


        $.ajax({
            type: 'POST',
            url: apiUrl + '/products',
            data: data,
            success: function (data) {

            },
            error: function () {
                alert('error uploading images')
            },
            xhrFields: {
                onprogress: function (progress) {
                }
            },
            processData: false,
            contentType: false
        });


    })
});
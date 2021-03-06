if ( is_ie() )
{
    $('body').prepend('<div id="notify" role="alert" aria-relevant="all">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</div>');
}

var headings = $('#content article h2');
$('#content-index a').each(function(i, el) {
    var $anchor = $(el);
    var $heading = $(headings[i]);

    var href = $anchor.attr('href');
    var href_split = href.split('#');
    var href_target = href_split[1];

    $heading.wrapInner('<span class="anchor"></span>');
    $heading.html( '#' + $heading.html() );
    $heading.wrapInner('<a name="'+href_target+'" href="'+href+'"></a>');
});

// Button scroller.
$('body').append('<div id="btn-scroller" />');
$('#btn-scroller').append('<div id="btn-scroller-up" />');
$('#btn-scroller').append('<div id="btn-scroller-down" />');
$('#btn-scroller-up').append('<svg viewBox="0 0 24 24"><path d="M8.12 14.71L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.39-.39-1.02-.39-1.41 0L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.38 1.03.39 1.42 0z"/></svg>');
$('#btn-scroller-down').append('<svg viewBox="0 0 24 24"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>');
$('#btn-scroller-up').click(function(e) { window.scrollTo(0,window.pageYOffset-window.innerHeight); });
$('#btn-scroller-down').click(function(e) { window.scrollTo(0,window.pageYOffset+window.innerHeight); });

// Back to top button.
addBackToTop({
    diameter: 50,
    backgroundColor: 'rgb(32, 32, 32)',
    textColor: '#fff'
});

document.addEventListener("DOMContentLoaded", yall);

document.documentElement.classList.remove("no-js");


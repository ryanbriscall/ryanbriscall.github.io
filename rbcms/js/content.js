xhr = null;
xhrMoreContent = null;

function getXmlHttpObject() {
    var xhr = null;
    try { xhr = new XMLHttpRequest(); }
    catch (e) { try { xhr = new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) { xhr = new ActiveXObject('Microsoft.XMLHTTP'); } }
    return xhr;
}

function loadMoreContent() {
    document.getElementById('more-content').className = "loading";

    xhrMoreContent = getXmlHttpObject();
    if (xhrMoreContent == null) { alert ('Browser does not support HTTP Request'); return; }

    var url = 'more.html';

    xhrMoreContent.onreadystatechange = xhrResponseMoreContent;
    xhrMoreContent.open('GET', url, true);
    xhrMoreContent.send(null);
}
function xhrResponseMoreContent() {
    try {
        if (xhrMoreContent.readyState == 4 || xhrMoreContent.readyState == 'complete') {
            if (xhrMoreContent.status == 200) {
                document.getElementById('more-content').innerHTML = xhrMoreContent.responseText;
            }
            else { alert('There was a problem with the request.  Possibly file not found.'); }
            document.getElementById('more-content').className = "";
        }
    }
    catch(e) { alert('Caught Exception: ' + e.description); document.getElementById('more-content').className = ""; }
}


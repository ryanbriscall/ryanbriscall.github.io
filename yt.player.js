function ytclose(el) {
    var pl = el.closest('.player');
    pl.parentNode.removeChild(pl);
    document.body.classList.remove('video');
}
function yt(video, x, y) {
    var el = document.createElement('div');
    el.classList.add('player');
    el.innerHTML = `
    <div><div style="padding-top: ${(y/x)*100}%"><iframe src="https://www.youtube.com/embed/${video}?rel=0&vq=hd720" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div><div class="close" onclick="ytclose(this)"></div>
    `;
    document.body.insertAdjacentElement('afterbegin', el);
    document.body.classList.add('video');
}

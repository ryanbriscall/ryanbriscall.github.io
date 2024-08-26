var cookiesPath = '/';
var cookiesDomain = '';
var cookiesExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

function getCookie(n) {
	var oCrumbles = document.cookie.split(';');
	for(var i=0; i<oCrumbles.length; i++) {
		var oPair= oCrumbles[i].split('=');
		var sKey = decodeURIComponent(oPair[0].trim());
		var sValue = oPair.length>1 ? oPair[1] : '';
		if(sKey == n) {
			return decodeURIComponent(sValue);
		}
	}
	return '';
}

function setCookie(n, v, o) {
	var c = encodeURIComponent(n) + '=' + encodeURIComponent(v);

	if (o && o instanceof Date) {
		o = {
			expires: o
		};
	}

	if (o && typeof o == 'object') {
		if (o.expires) {
			c += '; expires=' + o.expires.toGMTString();
		}
		if (o.path) {
			c += '; path=' + o.path.toString();
		}
		if (o.domain) {
			c += '; domain=' + o.domain.toString();
		}
		if (o.secure) {
			c += '; secure';
		}
	}
	document.cookie= c;
}

function removeCookie(n, o) {
	if (!o) {
		var o = {};
	}
	o.expires = new Date();
	setCookie(n, '', o);
}

function tabs() {
	var c = getCookie('tabs');
	if (c) {
		var ids = c.split(',');
		ids.forEach(function(id) {
			var t = document.querySelector('.tabs [data-id="'+id+'"]');
			if (t) {
				if (t.tagName == 'INPUT') {
					t.checked = true;
				}
				t.classList.add('active');
				document.querySelector('[data-tab="'+id+'"]').classList.add('active');
			}
		});
	}

	document.querySelectorAll('.tabs').forEach(function(nav, idx) {
		var els = nav.querySelectorAll('[data-id]');
		var active = [];
		els.forEach(function(tab) {
			if (tab.classList.contains('active')) {
				active.push(tab.dataset.id);
			}
		});

		for (let i = 0; i < els.length; i++) {
			'click keydown'.split(' ').forEach(function(evt) {
				els[i].addEventListener(evt, function(e) {
					if (evt == 'keydown' && e.which !== 13) {
						return;
					}
					if (!this.classList.contains('disabled')) {
						next(this);
					}
					return false;
				});
			});
		}

		if (active.length == 0) {
			next(els[0]);
		}
	});

	function next(tab) {
		var tabId = tab.dataset.id;

		var parent = tab.closest('.tabs');
		var els = parent.querySelectorAll('[data-id]');

		for (var i = 0; i < els.length; i++) {
			var id = els[i].dataset.id;

			if (id == tabId) {
				els[i].classList.add('active');
				document.querySelector('[data-tab="'+id+'"]').classList.add('active');
			}
			else {
				els[i].classList.remove('active');
				document.querySelector('[data-tab="'+id+'"]').classList.remove('active');
			}
		}

		var active = [];
		els2 = document.querySelectorAll('.tabs [data-id]');
		for (var i = 0; i < els2.length; i++) {
			if (els2[i].classList.contains('active')) {
				active.push(els2[i].dataset.id);
			}
		}
		setCookie('tabs', active.join(','), {
			expires: cookiesExpiry,
			path: cookiesPath
		});
	};
};

function tree() {
	document.querySelectorAll('.clk').forEach(function(el) {
		var li = el.parentNode;
		if (li.dataset.tree !== undefined) {
			return;
		}
		var ul = li.parentNode;
		if (!ul.classList.contains('tree')) {
			ul.classList.add('tree');
		}
		if (!li.classList.contains('show')) { li.classList.add('hide'); }
		el.addEventListener('click', function(e) {
			var p = this.parentNode;
			if (p.classList.contains('hide')) {
				p.classList.remove('hide');
				p.classList.add('show');
			}
			else {
				p.classList.remove('show');
				p.classList.add('hide');
			}
		});
		li.dataset.tree = 1;
	});
}

function popups() {
	document.querySelectorAll('.popup').forEach(function(el) {
		el.popup = {
			open() {
				// Check if the popup content is empty and a URL is provided
				if (!el.innerHTML.trim() && el.dataset.url) {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', el.dataset.url, true);
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4 && xhr.status === 200) {
							el.innerHTML = xhr.responseText;
						}
					};
					xhr.send();
				}

				this.originalParent = el.parentNode;
				this.originalNextSibling = el.nextSibling;

				this.frame = document.createElement('div');
				this.frame.className = 'popup-frame';

				this.backdrop = document.createElement('div');
				this.backdrop.className = 'popup-backdrop';
				this.backdrop.onclick = (e) => {
					el.popup.close();
				};

				document.body.appendChild(this.frame);
				document.body.appendChild(this.backdrop);

				var inner = document.createElement('div');
				inner.className = 'inner';
				this.frame.appendChild(inner);
				inner.appendChild(el);

				el.classList.add('active');
				document.documentElement.dataset.popup = true;
			},
			close() {
				el.classList.remove('active');

				if (this.originalParent && this.frame.contains(el)) {
					this.originalParent.insertBefore(el, this.originalNextSibling);
				}

				if (this.frame && this.frame.parentNode) {
					this.frame.parentNode.removeChild(this.frame);
				}
				if (this.backdrop && this.backdrop.parentNode) {
					this.backdrop.parentNode.removeChild(this.backdrop);
				}

				if (document.querySelectorAll('.popup.active').length === 0) {
					document.documentElement.dataset.popup = false;
				}
			}
		};
	});
}

function selects() {
	var els = document.querySelectorAll('select.select');

	els.forEach(function(select) {
		select.style.display = 'none';

		const customDropdown = document.createElement('div');
		customDropdown.className = 'select';

		const toggle = document.createElement('div');
		toggle.className = 'label';
		toggle.textContent = select.options[select.selectedIndex].textContent || "Select an option";
		customDropdown.appendChild(toggle);

		const dropdownList = document.createElement('ul');
		dropdownList.className = 'options';

		Array.from(select.children).forEach(function(child) {
			if (child.tagName.toLowerCase() === 'optgroup') {
				const group = document.createElement('li');
				group.className = 'optgroup';

				const groupLabel = document.createElement('span');
				groupLabel.className = 'label';
				groupLabel.textContent = child.label;
				group.appendChild(groupLabel);
				
				const groupOptions = document.createElement('ul');
				
				Array.from(child.children).forEach(function(option) {
					const optionItem = document.createElement('li');
					optionItem.className = 'option';
					optionItem.textContent = option.textContent;
					optionItem.dataset.value = option.value;
					
					if (option.selected) {
						optionItem.classList.add('active');
					}

					optionItem.addEventListener('click', function () {
						select.value = option.value;
						toggle.textContent = option.textContent;
						dropdownList.querySelectorAll('.option.active').forEach(function(activeOption) {
							activeOption.classList.remove('active');
						});
						optionItem.classList.add('active');
						dropdownList.style.display = 'none';
					});

					groupOptions.appendChild(optionItem);
				});

				group.appendChild(groupOptions);
				dropdownList.appendChild(group);
			}
			else if (child.tagName.toLowerCase() === 'option') {
				const optionItem = document.createElement('li');
				optionItem.className = 'option';
				optionItem.textContent = child.textContent;
				optionItem.dataset.value = child.value;

				if (child.selected) {
					optionItem.classList.add('active');
				}

				optionItem.addEventListener('click', function () {
					select.value = child.value;
					toggle.textContent = child.textContent;
					dropdownList.querySelectorAll('.option.active').forEach(function(activeOption) {
						activeOption.classList.remove('active');
					});
					optionItem.classList.add('active');
					dropdownList.style.display = 'none';
				});

				dropdownList.appendChild(optionItem);
			}
		});

		customDropdown.appendChild(dropdownList);
		select.parentElement.insertBefore(customDropdown, select.nextSibling);

		toggle.addEventListener('click', function () {
			const isOpen = dropdownList.style.display === 'block';
			dropdownList.style.display = isOpen ? 'none' : 'block';
		});
	});

	document.addEventListener('click', function (event) {
		if (!event.target.closest('.select')) {
			document.querySelectorAll('.options').forEach(function(dropdown) {
				dropdown.style.display = 'none';
			});
		}
	});
}

function dropdowns() {
	const triggers = document.querySelectorAll('[data-dropdown-id]');

	triggers.forEach(function(trigger) {
		const id = trigger.getAttribute('data-dropdown-id');
		const dropdowns = document.querySelectorAll(`[data-dropdown="${id}"]`);
		dropdowns.forEach(function(dropdown) {
			trigger.addEventListener('click', function(e) {
				e.preventDefault();
				dropdown.toggle();
			});

			dropdown.open = function() {
				trigger.classList.add('active');
				this.classList.add('active');
			};

			dropdown.close = function() {
				trigger.classList.remove('active');
				this.classList.remove('active');
			};

			dropdown.toggle = function() {
				if (this.classList.contains('active')) {
					this.close();
				}
				else {
					this.open();
				}
			};
		});
	});
}

function scrollprogress() {
	document.querySelectorAll('[data-scrollprogress-id]').forEach(function(p) {
		let progressId = p.getAttribute('data-scrollprogress-id');
		let main = document.querySelector(`[data-scrollprogress="${progressId}"]`);
		let progressBar = p.querySelector('progress');
		let progressSpan = p.querySelector('span');
	
		if (!main || !progressBar || !progressSpan) {
			return;
		}
	
		function updateProgress() {
			let mainScroll = main.scrollTop;
			let mainHeight = main.scrollHeight - main.clientHeight;
			let scrollPercent = (mainScroll / mainHeight) * 100;
			progressBar.setAttribute('value', scrollPercent);
			progressSpan.style.width = scrollPercent + '%';
		}
	
		updateProgress(); // Set initial progress
		main.addEventListener('scroll', updateProgress);
	});
}

const jrSortTable = Object.create(null);

jrSortTable.tableProp = [];

jrSortTable.sort = function (tblNumber, thElem) {
	const prop = jrSortTable.tableProp[tblNumber];
	const tbody = prop.tbody;
	const column = thElem.cellIndex;
	const th = prop.headerCells[column];
	let sortdir = th.sortdir;
	let sortedTBody = th.sortedTBody;

	if (th.isSorted) {
		sortdir = sortdir === "asc" ? "desc" : "asc";
		sortedTBody.reverse();
	} else {
		sortedTBody = Array.from(tbody.rows).map((row) => [row.cells[column].textContent.trim(), row]);
		sortedTBody.sort(jrSortTable.sortMethods[th.sortfn]);
		jrSortTable.tableProp[tblNumber].headerCells[column].isSorted = true;
	}
	const fragment = new DocumentFragment();
	sortedTBody.forEach(([_, row]) => fragment.appendChild(row));
	tbody.appendChild(fragment);

	Array.from(prop.headerCells).forEach((th) => {
		th.innerHTML = th.innerHTML.replace(/(&nbsp;🠅|&nbsp;🠇)$/g, "");
	});

	th.innerHTML += sortdir === "asc" ? "&nbsp;🠅" : "&nbsp;🠇";

	jrSortTable.tableProp[tblNumber].headerCells[column].sortedTBody = sortedTBody;
	jrSortTable.tableProp[tblNumber].headerCells[column].sortdir = sortdir;
};

jrSortTable.sortMethods = (function (obj) {

	const collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: "base"
	});

	obj.alphaNumeric = (a, b) => {
		let aa = a[0], bb = b[0];
		return collator.compare(aa, bb);
	};

	obj.sortUSDate = (a, b) => {
		let aa = a[0], bb = b[0];
		let dateA = new Date(aa);
		let dateB = new Date(bb);
		return dateA - dateB;
	};

	obj.sortDate = (a, b) => {
		let aa = a[0], bb = b[0];
		let [dayA, monthA, yearA] = aa.split(/\D/).map((num) => parseInt(num, 10));
		let [dayB, monthB, yearB] = bb.split(/\D/).map((num) => parseInt(num, 10));
		let dateA = new Date(yearA, monthA - 1, dayA);
		let dateB = new Date(yearB, monthB - 1, dayB);
		return dateA - dateB;
	};

	obj.sortNumberJS = (a, b) => {
		const re = /[^\d.-]+/g;
		let aa = a[0].replace(re, "");
		let bb = b[0].replace(re, "");
		if (isNaN(aa)) aa = 0;
		if (isNaN(bb)) bb = 0;
		return aa - bb;
	};

	obj.sortNumber_nonJS = (a, b) => {
		const re = /[^\d,-]+/g;
		let aa = a[0].replace(re, "");
		let bb = b[0].replace(re, "");
		aa = aa.replace(/,/, ".");
		bb = bb.replace(/,/, ".");
		if (isNaN(aa)) aa = 0;
		if (isNaN(bb)) bb = 0;
		return aa - bb;
	};

	return obj;
})(Object.create(null));

jrSortTable.setup = () => {

	const prepareTables = (tableElem, tblNumber) => {

		const addOnClickEvt = (e) => {
			jrSortTable.sort(tblNumber, e.currentTarget);
		};

		const addEvent = (row) => {
			const cells = row.cells;
			for (const cell of cells) {
				if (!cell.classList.contains("nosort")) {
					cell.addEventListener("click", addOnClickEvt);
				}
			}
		};

		const guessSortMethod = (txtCell) => {
			if (txtCell.length > 0) {
				if (txtCell.match(/^-?\D*?[\d,.]+[\s%]*?$/)) {
					return "sortNumberJS";
				}
				const testDate = txtCell.match(/^(\d\d?)[/.-](\d\d?)[/.-]((\d\d)?\d\d)$/);
				if (testDate) {
					if (parseInt(testDate[2], 10) > 12) {
						return "sortUSDate"; // mm/dd
					}
					return "sortDate";
				}
			}
			return "alphaNumeric";
		};

		const arr = Object.keys(jrSortTable.sortMethods);
		arr.push("nosort");
		const rxFn = new RegExp(arr.join("|"));

		const getSortMethodName = (className) => {
			const found = rxFn.exec(className);
			return found ? found[0] : "";
		};

		if (tableElem.getElementsByTagName("thead").length === 0) {
			const elem = document.createElement("thead");
			elem.appendChild(tableElem.rows[0]);
			tableElem.insertBefore(elem, tableElem.firstChild);
		}

		const thead = tableElem.tHead;
		const tbody = tableElem.tBodies[0];

		jrSortTable.tableProp[tblNumber] = {
			headerCells: [],
			tbody: tbody
		};

		const arrTh = thead.rows[0].cells;
		Array.from(arrTh).forEach((th) => {
			th.sortdir = "asc";
			th.isSorted = false;
			const fn = getSortMethodName(th.className);
			th.sortfn = fn || guessSortMethod(tbody.rows[0].cells[th.cellIndex].textContent.trim());
		});

		jrSortTable.tableProp[tblNumber].headerCells = arrTh;

		addEvent(thead.rows[0]);
		if (tableElem.tFoot) {
			addEvent(tableElem.tFoot.rows[0]);
		}
	};

	const tables = document.querySelectorAll(".sortable");
	tables.forEach((tbl, idx) => prepareTables(tbl, idx));
};
window.addEventListener("load", jrSortTable.setup, false);

function active() {
	var els = document.querySelectorAll('[data-activatable-id]');

	els.forEach(function(el) {
		var id = el.dataset.activatableId;
		var els2 = document.querySelectorAll('[data-activatable="' + id + '"]');

		els2.forEach(function(el2) {
			el2.addEventListener('click', function() {
				els2.forEach(function(child) {
					child.classList.remove('active');
				});

				el2.classList.add('active');
			});
		});
	});
}

function expand() {
	var els = document.querySelectorAll('[data-expandable-id]');

	els.forEach(function(el) {
		var id = el.dataset.expandableId;
		var els2 = document.querySelectorAll('[data-expandable="' + id + '"]');

		els2.forEach(function(el2) {
			el2.addEventListener('click', function() {
				el.classList.toggle('active');
			});
		});
	});
}

function filters() {
	var filterIds = document.querySelectorAll('[data-filter-id]');

	function updateFilterState(filterId) {
		var isChecked = filterId.checked;

		if (isChecked) {
			filterId.classList.add('active');
		}
		else {
			filterId.classList.remove('active');
		}

		var label = filterId.closest('label');
		if (label == null) {
			label = filterId.nextElementSibling;
			if (label && label.tagName !== 'LABEL') {
				label = null;
			}
		}

		if (label !== null) {
			if (isChecked) {
				label.classList.add('active');
			} else {
				label.classList.remove('active');
			}
		}
	}

	function evaluateFilters() {
		filterIds.forEach(filterId => {
			updateFilterState(filterId);

			var filterIdValue = filterId.getAttribute('data-filter-id');
			var associatedFilters = document.querySelectorAll(`[data-filter="${filterIdValue}"]`);

			associatedFilters.forEach(function(associatedFilter) {
				if (filterId.checked) {
					associatedFilter.classList.add('active');
				}
				else {
					associatedFilter.classList.remove('active');
				}
			});
		});

		document.querySelectorAll('[data-filter-disabled-for]').forEach(disablingElement => {
			var disabledFor = disablingElement.getAttribute('data-filter-disabled-for');
			var idsToDisable = disabledFor.split(',');

			let shouldDisable = false;
			idsToDisable.forEach(id => {
				var targetElement = document.querySelector(`[data-filter-id="${id}"]`);
				if (targetElement && targetElement.checked) {
					shouldDisable = true;
				}
			});

			disablingElement.disabled = shouldDisable;
		});
	}

	// Add event listeners to all filterId elements
	filterIds.forEach(filterId => {
		filterId.addEventListener('change', evaluateFilters);
	});

	// Initial evaluation to set the initial state
	evaluateFilters();
}

function gallery() {
	var curtain = document.createElement("div");
	curtain.className = "curtain";

	var inner = document.createElement("div");
	inner.className = "inner";
	curtain.appendChild(inner);

	var img = document.createElement("img");
	inner.appendChild(img);

	var p = document.createElement("p");
	inner.appendChild(p);

	var controls = document.createElement("div");
	controls.className = "gallery-controls";
	controls.innerHTML = `
		<div class="gallery-prev-container">
			<button class="gallery-prev"><span>⬅</span> <span>Prev</span></button>
		</div>
		<div class="gallery-next-container">
			<button class="gallery-next"><span>➡</span> <span>Next</span></button>
		</div>
		<div class="gallery-zoomin-container">
			<button class="gallery-zoomin"><span>+</span> <span>Zoom</span></button>
		</div>
		<div class="gallery-zoomout-container">
			<button class="gallery-zoomout" disabled><span>-</span> <span>Zoom</span></button>
		</div>
		<div class="gallery-exit-container">
			<button class="gallery-exit"><span>✖</span> <span>Exit</span></button>
		</div>
	`;
	curtain.appendChild(controls);
	document.body.appendChild(curtain);

	var currentGallery = null;
	var currentIndex = 0;
	var zoomLevel = 1;
	var galleries = {};

	function openImage(gallery, index) {
		currentGallery = galleries[gallery];
		currentIndex = index;
		zoomLevel = 1;
		img.src = currentGallery[index].href;
		img.style.transform = `scale(${zoomLevel})`;
		p.textContent = (currentGallery[index].dataset.caption !== undefined) ? currentGallery[index].dataset.caption : "";
		curtain.style.display = "block";
		document.body.style.overflow = "hidden";
		updateButtons();
	}

	function updateButtons() {
		document.querySelector(".gallery-prev").disabled = currentIndex === 0;
		document.querySelector(".gallery-next").disabled = currentIndex === currentGallery.length - 1;
		document.querySelector(".gallery-zoomin").disabled = zoomLevel === 4;
		document.querySelector(".gallery-zoomout").disabled = zoomLevel === 1;
	}

	function zoomIn() {
		if (zoomLevel < 4) {
			zoomLevel *= 2;
			img.style.transform = `scale(${zoomLevel})`;
		}
		updateButtons();
	}

	function zoomOut() {
		if (zoomLevel > 1) {
			zoomLevel /= 2;
			img.style.transform = `scale(${zoomLevel})`;
		}
		updateButtons();
	}

	document.querySelector(".gallery-prev").addEventListener("click", function() {
		if (currentIndex > 0) openImage(currentGallery[0].dataset.gallery, currentIndex - 1);
	});

	document.querySelector(".gallery-next").addEventListener("click", function() {
		if (currentIndex < currentGallery.length - 1) openImage(currentGallery[0].dataset.gallery, currentIndex + 1);
	});

	document.querySelector(".gallery-zoomin").addEventListener("click", zoomIn);
	document.querySelector(".gallery-zoomout").addEventListener("click", zoomOut);

	document.querySelector(".gallery-exit").addEventListener("click", function() {
		curtain.style.display = "none";
		document.body.style.overflow = "visible";
	});

	curtain.addEventListener("click", function(e) {
		if (e.target === curtain) {
			curtain.style.display = "none";
			document.body.style.overflow = "visible";
		}
	});

	document.querySelectorAll("[data-gallery]").forEach(function(box) {
		var galleryName = box.dataset.gallery;
		if (!galleries[galleryName]) {
			galleries[galleryName] = [];
		}
		galleries[galleryName].push(box);
	});

	Object.keys(galleries).forEach(function(gallery) {
		galleries[gallery].forEach(function(box, index) {
			box.addEventListener("click", function(e) {
				e.preventDefault();
				openImage(gallery, index);
			});
		});
	});
}

function particles() {
	var els = document.querySelectorAll('.particles');
	els.forEach(function(container) {
		setInterval(function(container) {
			var containerRect = container.getBoundingClientRect();

			var particleCount = 20;

			for (var i = 0; i < particleCount; i++) {
				var particle = document.createElement('div');
				particle.classList.add('particle');

				particle.style.left = `${containerRect.width / 2}px`;
				particle.style.top = `${containerRect.height / 2}px`;

				var moveX = (Math.random() - 0.5) * containerRect.width;
				var moveY = (Math.random() - 0.5) * containerRect.height;
				particle.style.setProperty('--moveX', `${moveX}px`);
				particle.style.setProperty('--moveY', `${moveY}px`);

				container.appendChild(particle);

				particle.addEventListener('animationend', function() {
					container.removeChild(this);
				});
			}
		}, 1000, container);
	});
}

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

document.addEventListener('DOMContentLoaded', function() {
	tabs();
	tree();
	popups();
	dropdowns();
	scrollprogress();
	filters();
	selects();
	active();
	expand();
	gallery();
	particles();
});




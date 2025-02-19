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
	document.querySelectorAll(".tabs").forEach(function (nav, idx) {
		var els = nav.querySelectorAll("[data-tab-id]");
		var active = [];
		els.forEach(function (tab) {
			if (tab.classList.contains("active")) {
				active.push(tab.dataset.tabId);
			}
		});

		for (let i = 0; i < els.length; i++) {
			"click keydown".split(" ").forEach(function (evt) {
				els[i].addEventListener(evt, function (e) {
					if (evt == "keydown" && e.which !== 13) {
						return;
					}
					if (!this.classList.contains("disabled")) {
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
		var tabId = tab.dataset.tabId;

		var parent = tab.closest(".tabs");
		var els = parent.querySelectorAll("[data-tab-id]");

		for (var i = 0; i < els.length; i++) {
			var id = els[i].dataset.tabId;

			if (id == tabId) {
				els[i].classList.add("active");
				document
					.querySelector('[data-tab="' + id + '"]')
					.classList.add("active");
			} else {
				els[i].classList.remove("active");
				document
					.querySelector('[data-tab="' + id + '"]')
					.classList.remove("active");
			}
		}
	}
}

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
	if (tables.length > 0) {
		tables[0].querySelector('thead th').dispatchEvent(new MouseEvent('click'));
	}
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
	var filtersIds = document.querySelectorAll('[data-filters-id]');

	function updateFiltersState(filtersId) {
		var isChecked = filtersId.checked;

		if (isChecked) {
			filtersId.classList.add('active');
		}
		else {
			filtersId.classList.remove('active');
		}

		var label = filtersId.closest('label');
		if (label == null) {
			label = filtersId.nextElementSibling;
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
		filtersIds.forEach(filtersId => {
			updateFiltersState(filtersId);

			var filtersIdValue = filtersId.getAttribute('data-filters-id');
			var associatedFilters = document.querySelectorAll(`[data-filters="${filtersIdValue}"]`);

			associatedFilters.forEach(function(associatedFilter) {
				if (filtersId.checked) {
					associatedFilter.classList.add('active');
				}
				else {
					associatedFilter.classList.remove('active');
				}
			});
		});

		document.querySelectorAll('[data-filters-disabled-for]').forEach(disablingElement => {
			var disabledFor = disablingElement.getAttribute('data-filters-disabled-for');
			var idsToDisable = disabledFor.split(',');

			let shouldDisable = false;
			idsToDisable.forEach(id => {
				var targetElement = document.querySelector(`[data-filters-id="${id}"]`);
				if (targetElement && targetElement.checked) {
					shouldDisable = true;
				}
			});

			disablingElement.disabled = shouldDisable;
		});
	}

	filtersIds.forEach(filtersId => {
		filtersId.addEventListener('change', evaluateFilters);
	});

	evaluateFilters();
}

function filter() {
	var els = document.querySelectorAll('[data-filter-id]');

	els.forEach(function(el) {
		var id = el.dataset.filterId;
		var els2 = document.querySelectorAll('[data-filter="'+id+'"]');

		'keyup change'.split(' ').forEach(function(evt) {
			el.addEventListener(evt, function(e) {
				els2.forEach(function(el2) {
					let r = new RegExp(el.value.toLowerCase(), "g");
					if (el2.dataset.filterBy.toLowerCase().match(r)) {
						el2.classList.remove('none');
					}
					else {
						el2.classList.add('none');
					}
				});
			});
		});
	});
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

document.addEventListener('DOMContentLoaded', function() {
	(function (window, document) {
		'use strict';

		function Parallax(selector) {
			this.elements = document.querySelectorAll(selector);
			this.init();
		}

		Parallax.prototype.init = function () {
			var self = this;
			this.update();
			window.addEventListener('scroll', function () {
				self.update();
			});
		};

		Parallax.prototype.update = function () {
			var scrollY = window.pageYOffset || document.documentElement.scrollTop;
			for (var i = 0; i < this.elements.length; i++) {
				var el = this.elements[i];
				var speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
				var yPos = -(scrollY * speed);
				el.style.backgroundPosition = '50% ' + yPos + 'px';
			}
		};

		window.Parallax = Parallax;
	})(window, document);
});

function parallax() {
	(new Parallax('.parallax'));
}

document.addEventListener('DOMContentLoaded', function() {
	(function(window, document, undefined) {
		'use strict';

		var NAME = 'Parallax3D';
		var MAGIC_NUMBER = 30;
		var DEFAULTS = {
		relativeInput: false,
		clipRelativeInput: false,
		calibrationThreshold: 100,
		calibrationDelay: 500,
		supportDelay: 500,
		calibrateX: false,
		calibrateY: true,
		invertX: true,
		invertY: true,
		limitX: false,
		limitY: false,
		scalarX: 10.0,
		scalarY: 10.0,
		frictionX: 0.1,
		frictionY: 0.1,
		originX: 0.5,
		originY: 0.5
		};
	
		function Parallax3D(element, options) {
	
		// DOM Context
		this.element = element;
		this.layers = element.getElementsByClassName('layer');
	
		// Data Extraction
		var data = {
			calibrateX: this.data(this.element, 'calibrate-x'),
			calibrateY: this.data(this.element, 'calibrate-y'),
			invertX: this.data(this.element, 'invert-x'),
			invertY: this.data(this.element, 'invert-y'),
			limitX: this.data(this.element, 'limit-x'),
			limitY: this.data(this.element, 'limit-y'),
			scalarX: this.data(this.element, 'scalar-x'),
			scalarY: this.data(this.element, 'scalar-y'),
			frictionX: this.data(this.element, 'friction-x'),
			frictionY: this.data(this.element, 'friction-y'),
			originX: this.data(this.element, 'origin-x'),
			originY: this.data(this.element, 'origin-y')
		};
	
		// Delete Null Data Values
		for (var key in data) {
			if (data[key] === null) delete data[key];
		}
	
		// Compose Settings Object
		this.extend(this, DEFAULTS, options, data);
	
		// States
		this.calibrationTimer = null;
		this.calibrationFlag = true;
		this.enabled = false;
		this.depths = [];
		this.raf = null;
	
		// Element Bounds
		this.bounds = null;
		this.ex = 0;
		this.ey = 0;
		this.ew = 0;
		this.eh = 0;
	
		// Element Center
		this.ecx = 0;
		this.ecy = 0;
	
		// Element Range
		this.erx = 0;
		this.ery = 0;
	
		// Calibration
		this.cx = 0;
		this.cy = 0;
	
		// Input
		this.ix = 0;
		this.iy = 0;
	
		// Motion
		this.mx = 0;
		this.my = 0;
	
		// Velocity
		this.vx = 0;
		this.vy = 0;
	
		// Callbacks
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
		this.onOrientationTimer = this.onOrientationTimer.bind(this);
		this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
		this.onAnimationFrame = this.onAnimationFrame.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	
		// Initialise
		this.initialise();
		}
	
		Parallax3D.prototype.extend = function() {
		if (arguments.length > 1) {
			var master = arguments[0];
			for (var i = 1, l = arguments.length; i < l; i++) {
			var object = arguments[i];
			for (var key in object) {
				master[key] = object[key];
			}
			}
		}
		};
	
		Parallax3D.prototype.data = function(element, name) {
		return this.deserialize(element.getAttribute('data-'+name));
		};
	
		Parallax3D.prototype.deserialize = function(value) {
		if (value === "true") {
			return true;
		} else if (value === "false") {
			return false;
		} else if (value === "null") {
			return null;
		} else if (!isNaN(parseFloat(value)) && isFinite(value)) {
			return parseFloat(value);
		} else {
			return value;
		}
		};
	
		Parallax3D.prototype.camelCase = function(value) {
		return value.replace(/-+(.)?/g, function(match, character){
			return character ? character.toUpperCase() : '';
		});
		};
	
		Parallax3D.prototype.transformSupport = function(value) {
		var element = document.createElement('div');
		var propertySupport = false;
		var propertyValue = null;
		var featureSupport = false;
		var cssProperty = null;
		var jsProperty = null;
		for (var i = 0, l = this.vendors.length; i < l; i++) {
			if (this.vendors[i] !== null) {
			cssProperty = this.vendors[i][0] + 'transform';
			jsProperty = this.vendors[i][1] + 'Transform';
			} else {
			cssProperty = 'transform';
			jsProperty = 'transform';
			}
			if (element.style[jsProperty] !== undefined) {
			propertySupport = true;
			break;
			}
		}
		switch(value) {
			case '2D':
			featureSupport = propertySupport;
			break;
			case '3D':
			if (propertySupport) {
				var documentElement = document.documentElement;
				var documentOverflow = documentElement.style.overflow;
				document.body.appendChild(element);
				element.style[jsProperty] = 'translate3d(1px,1px,1px)';
				propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
				featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
				documentElement.style.overflow = documentOverflow;
				document.body.removeChild(element);
			}
			break;
		}
		return featureSupport;
		};
	
		Parallax3D.prototype.ww = null;
		Parallax3D.prototype.wh = null;
		Parallax3D.prototype.wcx = null;
		Parallax3D.prototype.wcy = null;
		Parallax3D.prototype.wrx = null;
		Parallax3D.prototype.wry = null;
		Parallax3D.prototype.portrait = null;
		Parallax3D.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
		Parallax3D.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
		Parallax3D.prototype.motionSupport = !!window.DeviceMotionEvent;
		Parallax3D.prototype.orientationSupport = !!window.DeviceOrientationEvent;
		Parallax3D.prototype.orientationStatus = 0;
		Parallax3D.prototype.transform2DSupport = Parallax3D.prototype.transformSupport('2D');
		Parallax3D.prototype.transform3DSupport = Parallax3D.prototype.transformSupport('3D');
		Parallax3D.prototype.propertyCache = {};
	
		Parallax3D.prototype.initialise = function() {
	
		// Configure Context Styles
		if (this.transform3DSupport) this.accelerate(this.element);
		var style = window.getComputedStyle(this.element);
		if (style.getPropertyValue('position') === 'static') {
			this.element.style.position = 'relative';
		}
	
		// Setup
		this.updateLayers();
		this.updateDimensions();
		this.enable();
		this.queueCalibration(this.calibrationDelay);
		};
	
		Parallax3D.prototype.updateLayers = function() {
	
		// Cache Layer Elements
		this.layers = this.element.getElementsByClassName('layer');
		this.depths = [];
	
		// Configure Layer Styles
		for (var i = 0, l = this.layers.length; i < l; i++) {
			var layer = this.layers[i];
			if (this.transform3DSupport) this.accelerate(layer);
			layer.style.position = i ? 'absolute' : 'relative';
			layer.style.display = 'block';
			layer.style.left = 0;
			layer.style.top = 0;
	
			// Cache Layer Depth
			this.depths.push(this.data(layer, 'depth') || 0);
		}
		};
	
		Parallax3D.prototype.updateDimensions = function() {
		this.ww = window.innerWidth;
		this.wh = window.innerHeight;
		this.wcx = this.ww * this.originX;
		this.wcy = this.wh * this.originY;
		this.wrx = Math.max(this.wcx, this.ww - this.wcx);
		this.wry = Math.max(this.wcy, this.wh - this.wcy);
		};
	
		Parallax3D.prototype.updateBounds = function() {
		this.bounds = this.element.getBoundingClientRect();
		this.ex = this.bounds.left;
		this.ey = this.bounds.top;
		this.ew = this.bounds.width;
		this.eh = this.bounds.height;
		this.ecx = this.ew * this.originX;
		this.ecy = this.eh * this.originY;
		this.erx = Math.max(this.ecx, this.ew - this.ecx);
		this.ery = Math.max(this.ecy, this.eh - this.ecy);
		};
	
		Parallax3D.prototype.queueCalibration = function(delay) {
		clearTimeout(this.calibrationTimer);
		this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
		};
	
		Parallax3D.prototype.enable = function() {
		if (!this.enabled) {
			this.enabled = true;
			if (this.orientationSupport) {
			this.portrait = null;
			window.addEventListener('deviceorientation', this.onDeviceOrientation);
			setTimeout(this.onOrientationTimer, this.supportDelay);
			} else {
			this.cx = 0;
			this.cy = 0;
			this.portrait = false;
			window.addEventListener('mousemove', this.onMouseMove);
			}
			window.addEventListener('resize', this.onWindowResize);
			this.raf = requestAnimationFrame(this.onAnimationFrame);
		}
		};
	
		Parallax3D.prototype.disable = function() {
		if (this.enabled) {
			this.enabled = false;
			if (this.orientationSupport) {
			window.removeEventListener('deviceorientation', this.onDeviceOrientation);
			} else {
			window.removeEventListener('mousemove', this.onMouseMove);
			}
			window.removeEventListener('resize', this.onWindowResize);
			cancelAnimationFrame(this.raf);
		}
		};
	
		Parallax3D.prototype.calibrate = function(x, y) {
		this.calibrateX = x === undefined ? this.calibrateX : x;
		this.calibrateY = y === undefined ? this.calibrateY : y;
		};
	
		Parallax3D.prototype.invert = function(x, y) {
		this.invertX = x === undefined ? this.invertX : x;
		this.invertY = y === undefined ? this.invertY : y;
		};
	
		Parallax3D.prototype.friction = function(x, y) {
		this.frictionX = x === undefined ? this.frictionX : x;
		this.frictionY = y === undefined ? this.frictionY : y;
		};
	
		Parallax3D.prototype.scalar = function(x, y) {
		this.scalarX = x === undefined ? this.scalarX : x;
		this.scalarY = y === undefined ? this.scalarY : y;
		};
	
		Parallax3D.prototype.limit = function(x, y) {
		this.limitX = x === undefined ? this.limitX : x;
		this.limitY = y === undefined ? this.limitY : y;
		};
	
		Parallax3D.prototype.origin = function(x, y) {
		this.originX = x === undefined ? this.originX : x;
		this.originY = y === undefined ? this.originY : y;
		};
	
		Parallax3D.prototype.clamp = function(value, min, max) {
		value = Math.max(value, min);
		value = Math.min(value, max);
		return value;
		};
	
		Parallax3D.prototype.css = function(element, property, value) {
		var jsProperty = this.propertyCache[property];
		if (!jsProperty) {
			for (var i = 0, l = this.vendors.length; i < l; i++) {
			if (this.vendors[i] !== null) {
				jsProperty = this.camelCase(this.vendors[i][1] + '-' + property);
			} else {
				jsProperty = property;
			}
			if (element.style[jsProperty] !== undefined) {
				this.propertyCache[property] = jsProperty;
				break;
			}
			}
		}
		element.style[jsProperty] = value;
		};
	
		Parallax3D.prototype.accelerate = function(element) {
		this.css(element, 'transform', 'translate3d(0,0,0)');
		this.css(element, 'transform-style', 'preserve-3d');
		this.css(element, 'backface-visibility', 'hidden');
		};
	
		Parallax3D.prototype.setPosition = function(element, x, y) {
		x += 'px';
		y += 'px';
		if (this.transform3DSupport) {
			this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
		} else if (this.transform2DSupport) {
			this.css(element, 'transform', 'translate('+x+','+y+')');
		} else {
			element.style.left = x;
			element.style.top = y;
		}
		};
	
		Parallax3D.prototype.onOrientationTimer = function(event) {
		if (this.orientationSupport && this.orientationStatus === 0) {
			this.disable();
			this.orientationSupport = false;
			this.enable();
		}
		};
	
		Parallax3D.prototype.onCalibrationTimer = function(event) {
		this.calibrationFlag = true;
		};
	
		Parallax3D.prototype.onWindowResize = function(event) {
		this.updateDimensions();
		};
	
		Parallax3D.prototype.onAnimationFrame = function() {
		this.updateBounds();
		var dx = this.ix - this.cx;
		var dy = this.iy - this.cy;
		if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
			this.queueCalibration(0);
		}
		if (this.portrait) {
			this.mx = this.calibrateX ? dy : this.iy;
			this.my = this.calibrateY ? dx : this.ix;
		} else {
			this.mx = this.calibrateX ? dx : this.ix;
			this.my = this.calibrateY ? dy : this.iy;
		}
		this.mx *= this.ew * (this.scalarX / 100);
		this.my *= this.eh * (this.scalarY / 100);
		if (!isNaN(parseFloat(this.limitX))) {
			this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
		}
		if (!isNaN(parseFloat(this.limitY))) {
			this.my = this.clamp(this.my, -this.limitY, this.limitY);
		}
		this.vx += (this.mx - this.vx) * this.frictionX;
		this.vy += (this.my - this.vy) * this.frictionY;
		for (var i = 0, l = this.layers.length; i < l; i++) {
			var layer = this.layers[i];
			var depth = this.depths[i];
			var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
			var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
			this.setPosition(layer, xOffset, yOffset);
		}
		this.raf = requestAnimationFrame(this.onAnimationFrame);
		};
	
		Parallax3D.prototype.onDeviceOrientation = function(event) {
	
		// Validate environment and event properties.
		if (!this.desktop && event.beta !== null && event.gamma !== null) {
	
			// Set orientation status.
			this.orientationStatus = 1;
	
			// Extract Rotation
			var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
			var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180
	
			// Detect Orientation Change
			var portrait = this.wh > this.ww;
			if (this.portrait !== portrait) {
			this.portrait = portrait;
			this.calibrationFlag = true;
			}
	
			// Set Calibration
			if (this.calibrationFlag) {
			this.calibrationFlag = false;
			this.cx = x;
			this.cy = y;
			}
	
			// Set Input
			this.ix = x;
			this.iy = y;
		}
		};
	
		Parallax3D.prototype.onMouseMove = function(event) {
	
		// Cache mouse coordinates.
		var clientX = event.clientX;
		var clientY = event.clientY;
	
		// Calculate Mouse Input
		if (!this.orientationSupport && this.relativeInput) {
	
			// Clip mouse coordinates inside element bounds.
			if (this.clipRelativeInput) {
			clientX = Math.max(clientX, this.ex);
			clientX = Math.min(clientX, this.ex + this.ew);
			clientY = Math.max(clientY, this.ey);
			clientY = Math.min(clientY, this.ey + this.eh);
			}
	
			// Calculate input relative to the element.
			this.ix = (clientX - this.ex - this.ecx) / this.erx;
			this.iy = (clientY - this.ey - this.ecy) / this.ery;
	
		} else {
	
			// Calculate input relative to the window.
			this.ix = (clientX - this.wcx) / this.wrx;
			this.iy = (clientY - this.wcy) / this.wry;
		}
		};
	
		// Expose Parallax3D
		window[NAME] = Parallax3D;
	
	})(window, document);
});

function parallax3d() {
	var scene = document.getElementById('parallax');
	if (scene !== undefined && scene !== null) {
		var parallaxInstance = new Parallax3D(scene, {
			relativeInput: true
		});
		parallaxInstance.friction(0.2, 0.2);
	}
}

function timeuntil() {
	var els = Array.from(document.querySelectorAll("[data-timeuntil]")).map(function(el) {
		return {
			el: el,
			targetTime: parseInt(el.getAttribute("data-timeuntil"), 10),
		};
	});

	function updateCountdowns() {
		var now = Math.floor(Date.now() / 1000);

		els.forEach(function(item) {
			let diff = item.targetTime - now;

			if (diff <= 0) {
				item.el.textContent = "0 " + 'seconds' + ".";
				return;
			}

			var hours = Math.floor(diff / 3600);
			diff %= 3600;
			var minutes = Math.floor(diff / 60);
			var seconds = diff % 60;

			var parts = [];
			var hr = "hour" + (hours !== 1 ? "s" : "");
			if (hours > 0) {
				parts.push(hours + " " + hr);
			}

			var min = "minute" + (minutes !== 1 ? "s" : "");
			var sec = "second" + (seconds !== 1 ? "s" : "");
			
			if (minutes > 0 || hours > 0) {
				parts.push(minutes + " " + min);
			}

			parts.push(seconds + " " + sec);
			item.el.textContent = parts.join(", ");
		});
	}

	if (els.length > 0) {
		updateCountdowns();
		setInterval(updateCountdowns, 1000);
	}
}

function timeamount() {
	var els = Array.from(document.querySelectorAll("[data-timeamount]")).map(function(el) {
		return {
			el: el,
			start: parseFloat(el.getAttribute("data-timestart")),
			rate: parseFloat(el.getAttribute("data-timerate")),
			date: parseInt(el.getAttribute("data-timedate"), 10),
			max: parseFloat(el.getAttribute("data-timemax"))
		};
	});

	function updateAmounts() {
		var currentTime = Math.floor(Date.now() / 1000);

		els.forEach(function(item) {
			var elapsed = currentTime - item.date;
			var hoursElapsed = elapsed / 3600;
			var currentAmount = item.start + (hoursElapsed * item.rate);

			if (item.max !== 0 && currentAmount > item.max) {
				currentAmount = item.max;
			}

			item.el.textContent = currentAmount.toFixed(0);
		});
	}

	if (els.length > 0) {
		updateAmounts();
		setInterval(updateAmounts, 1000);
	}
}

function timeAgo(timestamp) {
	var now = Math.floor(Date.now() / 1000);
	var diff = now - timestamp;

	if (diff < 60) {
		return diff + ' second' + (diff !== 1 ? 's' : '') + ' ago';
	} else if (diff < 3600) {
		var minutes = Math.floor(diff / 60);
		return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
	} else if (diff < 86400) {
		var hours = Math.floor(diff / 3600);
		return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
	} else if (diff < 604800) {
		var days = Math.floor(diff / 86400);
		return days + ' day' + (days !== 1 ? 's' : '') + ' ago';
	} else if (diff < 2592000) {
		var weeks = Math.floor(diff / 604800);
		return weeks + ' week' + (weeks !== 1 ? 's' : '') + ' ago';
	} else if (diff < 31536000) {
		var months = Math.floor(diff / 2592000);
		return months + ' month' + (months !== 1 ? 's' : '') + ' ago';
	} else {
		var years = Math.floor(diff / 31536000);
		return years + ' year' + (years !== 1 ? 's' : '') + ' ago';
	}
}

function timeago() {
	var els = Array.from(document.querySelectorAll("[data-timeago]")).map(function(el) {
		return {
			el: el,
			timestamp: parseInt(el.getAttribute("data-timeago"), 10)
		};
	});

	function updateTimes() {
		var now = Math.floor(Date.now() / 1000);

		els.forEach(function(item) {
			var timeAgoText = timeAgo(item.timestamp);
			item.el.innerHTML = timeAgoText;
		});
	}

	if (els.length > 0) {
		updateTimes();
		setInterval(updateTimes, 1000);
	}
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
	filter();
	particles();
	parallax();
	parallax3d();
	timeuntil();
	timeamount();
	timeago();
});




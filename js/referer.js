function searchText(a, b) {
	return !!(a.search(b) + 1)
}
function paramUrl(a) {
	var h = {
		utm_campaign : "",
		utm_term : "",
		utm_medium : "",
		utm_source : ""
	};
	try {
		var c = a.split("&");
		for (var b = c.length - 1; b >= 0; b--) {
			var g = c[b].split("=");
			h[g[0]] = g[1]
		}
		return h
	} catch (f) {
		return h
	}
	return h
}
var praUrl = paramUrl(location.href.split("?")[1]);
function setCookie(e, g, c) {
	c = c || {};
	var b = c.expires;
	if (typeof b == "number" && b) {
		var i = new Date();
		i.setTime(i.getTime() + b * 1000);
		b = c.expires = i
	}
	if (b && b.toUTCString) {
		c.expires = b.toUTCString()
	}
	g = encodeURIComponent(g);
	var a = e + "=" + g;
	for (var f in c) {
		a += "; " + f;
		var h = c[f];
		if (h !== true) {
			a += "=" + h
		}
	}
	document.cookie = a
}
function referer() {
	engines = [{
			start : "http://www.google.",
			query : "q",
			name : "google"
		}, {
			start : "http://yandex.",
			query : "text",
			name : "yandex"
		}, {
			start : "rambler.ru/search",
			query : "query",
			name : "rambler"
		}, {
			start : "http://go.mail.ru/",
			query : "q",
			name : "mailru",
			cp1251 : true
		}, {
			start : "http://www.bing.com/",
			query : "q",
			name : "bing"
		}, {
			start : "search.yahoo.com/search",
			query : "p",
			name : "yahoo"
		}, {
			start : "http://ru.ask.com/",
			query : "q",
			name : "ask"
		}, {
			start : "http://search.qip.ru/search",
			query : "query",
			name : "qip"
		}
	];
	var c = document.referrer,
	j = "",
	k = "",
	a,
	b;
	for (var g in engines) {
		if (!engines.hasOwnProperty(g)) {
			continue
		}
		if (c.indexOf(engines[g].start) == -1) {
			continue
		}
		a = c.indexOf("?" + engines[g].query + "=");
		if (a == -1) {
			a = c.indexOf("&" + engines[g].query + "=");
			if (a == -1) {
				return false
			}
		}
		k = engines[g].name;
		j = engines[g].query;
		b = engines[g].hasOwnProperty("cp1251")
	}
	if (!k) {
		return false
	}
	c = c.substr(a + j.length + 2);
	var f = c.indexOf("&");
	if (f != -1) {
		c = c.substr(0, f)
	}
	if (b) {
		function l(p) {
			var o = unescape("%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457");
			var n = function (i) {
				if (i >= 192 && i <= 255) {
					return String.fromCharCode(i - 192 + 1040)
				}
				if (i >= 128 && i <= 191) {
					return o.charAt(i - 128)
				}
				return String.fromCharCode(i)
			};
			var m = "";
			for (var e = 0; e < p.length; e++) {
				m = m + n(p.charCodeAt(e))
			}
			return m
		}
		c = unescape(c);
		c = l(c)
	} else {
		c = decodeURIComponent(c)
	}
	c = c.replace(/[+]+/g, " ");
	if (c) {
		try {
			setCookie("reftext", c, {
				expires : 2629743,
				path : "/"
			})
		} catch (h) {
			window.addEventListener("load", function () {
				referer()
			})
		}
	}
	return [c, k]
}
if (document.referrer) {
	var d = document.referrer.split("/");
	if (d[2].indexOf("yandex") != -1) {
		var tw = paramUrl(d[3]);
		setCookie("stext", tw.text, {
			expires : 2629743,
			path : "/"
		})
	}
	console.log(d[2]);
	if (!searchText(window.location.href, d[2])) {
		console.log("true");
		setCookie("ref", d[2], {
			expires : 2629743,
			path : "/"
		})
	}
}
if (praUrl.utm_source) {
	setCookie("source", praUrl.utm_source, {
		expires : 2629743,
		path : "/"
	})
}
if (praUrl.utm_medium) {
	setCookie("medium", praUrl.utm_medium, {
		expires : 2629743,
		path : "/"
	})
}
if (praUrl.utm_term) {
	setCookie("term", praUrl.utm_term, {
		expires : 2629743,
		path : "/"
	})
}
if (praUrl.utm_campaign) {
	setCookie("campaign", praUrl.utm_campaign, {
		expires : 2629743,
		path : "/"
	})
}
referer();

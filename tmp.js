(function() {
	console.log('*****************');
	console.log(
		'The Deletionist, by Amaranth Borsuk, Jesper Juul, and Nick Montfort. 2013-07-09. http://thedeletionist.com'
	);
	var Rule = function(name, regex, target) {
		this.name = name;
		this.regex = regex;
		if (typeof target === 'undefined') {
			target = 150;
		}
		this.target = target;
	};
	String.prototype.nm = function(regexp) {
		var matches = this.match(regexp);
		return matches === null ? 0 : matches.length;
	};
	String.prototype.ml = function(str) {
		var i,
			matches = this.match(str),
			totalLength = 0;
		if (matches === null) {
			return 0;
		}
		for (i = 0; matches.length > i; i = i + 1) {
			totalLength = totalLength + matches[i].length;
		}
		return totalLength / matches.length;
	};
	Rule.prototype.sf = function(z, matches) {
		if (this.target > matches) {
			return (matches * 1000) / this.target;
		}
		return (this.target * 1000) / matches;
	};
	Rule.prototype.getFitness = function(z, matches) {
		return this.sf(z, matches);
	};
	var rules = [];
	function ar(name, regex, target) {
		var r = new Rule(name, regex, target);
		rules.push(r);
		return r;
	}
	var r = ar(
		'Alliterative on A',
		/from|like|since|though|when|(^|\s)a[\w\u00C0-\u017F]+/gi
	);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\sa[\w\u00C0-\u017F]+\s/gi);
		return s * 0.9 * (averageLength / 5.0);
	};
	r = ar(
		'Alliterative on M',
		/from|like|since|though|when|(^|\s)m[\w\u00C0-\u017F]+/gi
	);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\sm[\w\u00C0-\u017F]+\s/gi);
		return s * 0.9 * (averageLength / 5.0);
	};
	r = ar(
		'Alliterative on S',
		/from|like|since|though|when|(^|\s)s[\w\u00C0-\u017F]+/gi
	);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\ss[\w\u00C0-\u017F]+\s/gi);
		return s * 0.9 * (averageLength / 5.5);
	};
	r = ar(
		'Alliterative on T',
		/from|like|since|though|when|(^|\s)t[\w\u00C0-\u017F]+/gi
	);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\st[\w\u00C0-\u017F]+\s/gi);
		return s * 0.9 * (averageLength / 4.5);
	};
	r = ar(
		'And-or catalog',
		/[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F\'\u2019]+\s+(and|or)|(the\s+)?worl/gi,
		120
	);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(
				/[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F\'\u2019]+\s/gi
			);
		return s * 0.9 * (averageLength / 10);
	};
	ar(
		'Argument',
		/[\w\u00C0-\u017F]+\.|(We|I|Indeed|Essentially|Because|With|While|Before|Given|Thus|Therefore|Already|Nevertheless|If|As|But|And|It|Some|All|No|So|In|This|To|Finally|Perhaps|(According|Corresponding|First|Second|Third)(ly)?|Although|Though|Until)\s+[\'\u2019\w\u00C0-\u017F]+|\!|([Tt]he\s+)?[Ww]orl/g,
		80
	);
	ar(
		'Day by day',
		/\s[\w\u00C0-\u017F]+\s+(by|in|of|to)\s+((a|an|the|some|one)\s+)?[\w\u00C0-\u017F]+/gi
	);
	ar('Espain', /que|es(o|to)|como|ya|\ses|\ssi|\sno/gi, 80);
	ar(
		'Germanizer',
		/der|die|das|ich|du|wir|sie|ist|bin|bist|sind|seid|ja|nein|nicht|doch|durch|fur|gegen|ohne|wieder|um|es|ein|eine|einer|mit|sie|sei|von|und|oder|war|\?/gi
	);
	ar('Hesitation', /eh|er|um|no|yes|yeah?|\-|[\u2012-\u2015]|(the\s+)?worl/gi);
	r.getFitness = function(z, matches) {
		return this.sf(z, matches) * 0.9;
	};
	ar(
		'I am interesting',
		/[\w\u00C0-\u017F]+ing\s|\si\s|am|will|was|(the\s+)?worl/gi
	);
	r = ar(
		'I blah blah',
		/\s(I[\'\u2019][\w\u00C0-\u017F]+|I)\s+[\'\u2019\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+(\s+[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F]+)|you\s|([Tt]he\s+)?[Ww]orl/g,
		50
	);
	ar('If it is, is it? So what!', /if|it|is|so|what|\?|\!|(the\s+)?worl/gi);
	ar(
		'Inside and out',
		/\(|\)|\s(in|out)(side)?\s|[\w\u00C0-\u017F]+(acy|ance|ence|al|dom|ity|ty|ment|ness)\s/gi
	);
	ar(
		'Interjections',
		/aha|ah|aw|ha|oho|oh|oo|[\w\u00C0-\u017F]*ion\s|(the\s+)?worl/gi
	);
	ar(
		"It's not you it's me",
		/not|you|it\'s|it\u2019s|it\s+is|me\s|(the\s+)?worl/gi
	);
	ar(
		'I, you',
		/\si\s+[\'\u2019\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+|you|but|(the\s+)?worl/gi,
		50
	);
	ar(
		'Middle bee',
		/[\'\u2019\w\u00C0-\u017F]+\s+be[\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+|(the\s+)?worl/gi,
		90
	);
	r = ar(
		'Non-Latin alliteration',
		/( \u03b1[\u03ac-\u03ce\u1f00-\u1ff7]*| \u0430[\u0430-\u044f\u0450-\u045f]*| \u0561[\u0561-\u0587]*| \u05d0[\u05d0-\u05f2]*| \u0627[\u0621-\u064a\u066e-\u06df]*| \u0710[\u0710-\u074f]*| \u07cb[\u07cb-\u07ea]*| \u0d05[\u0d05-\u0d3a]*| \u0e01[\u0e01-\u0e5b]*| \u13a0[\u13a0-\u13f4]*)/gi
	);
	r.getFitness = function(z) {
		var matches = z.nm(this.regex);
		this.matches = matches;
		return matches / 0.04;
	};
	ar(
		'Party on',
		/\sthe\s+[\'\u2019\w\u00C0-\u017F]+y\s|[\'\u2019\w\u00C0-\u017F]+\s+on\s|(the\s+)?worl/gi,
		120
	);
	r = ar(
		'Poetic O',
		/o\s+((a|an|the|some|one|this|his|her|their|who|what|my|your|our|their)\s+)?[\'\u2019\w\u00C0-\u017F]+|(the\s+)?worl/gi
	);
	r.getFitness = function(z, matches) {
		return this.sf(z, matches) * 1.2;
	};
	ar(
		'Possessive',
		/(your|my|our|his|her|their)\s+[\w\u00C0-\u017F]+(\s+(and|or|with|are|is|has|was|who|which|that))?/gi
	);
	r = ar('Sound of music', /do|re|mi|fa|so|la|ti|(the\s+)?worl/gi);
	r.getFitness = function(z, matches) {
		return this.sf(z, matches) * 0.8;
	};
	ar(
		'Steinian continuous present',
		/(one|I) was|they were|was|were|to be|there|then|[\w\u00C0-\u017F]*ing\s|(the\s+)?worl/gi
	);
	r = ar('Strictly alliterative on K', /\sk[\w\u00C0-\u017F]+\s/gi);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\sk[\w\u00C0-\u017F]+\s/gi);
		console.log(' K average length: ' + averageLength);
		return s * (averageLength / 5.0);
	};
	r = ar('Strictly alliterative on N', /\sn[\w\u00C0-\u017F]+\s/gi);
	r.getFitness = function(z, matches) {
		var s = this.sf(z, matches),
			averageLength = z.ml(/\sn[\w\u00C0-\u017F]+\s/gi);
		console.log(' N average length: ' + averageLength);
		return s * (averageLength / 4.25);
	};
	r = ar('Tears in rain', /[\'\u0021-\u002f]+/g);
	r.getFitness = function(z) {
		return 50;
	};
	ar('Tis oft', /tis|oft|\s[\w\u00C0-\u017F]+(\w)\1ed\s|(the\s+)?worl/g);
	r = ar('To be or not', /(to|be|\sor\s|not|\?)|(the\s+)?worl/gi);
	r.getFitness = function(z, matches) {
		return this.sf(z, matches) * 1.1;
	};
	ar(
		'Wondering',
		/[\w\u00C0-\u017F]+(ish|less|ly)\s|[\'\u2019\w\u00C0-\u017F]+\?|(the\s+)?worl/gi
	);
	var start = new Date();
	var z = '';
	var elements = getArrayByTagName(document, '*'),
		i,
		j,
		e,
		child;
	for (i = 0; elements.length > i; i = i + 1) {
		e = elements[i];
		e.normalize();
		if (
			e.tagName.toLowerCase() == 'script' ||
			e.tagName.toLowerCase() == 'style'
		) {
			continue;
		}
		for (j = 0; e.childNodes.length > j; j = j + 1) {
			child = e.childNodes[j];
			if (child.nodeType == 3) {
				if (child.data.length > 0) {
					if (0 > child.textContent.indexOf('!--')) {
						z = z + child.data;
					}
				}
			}
		}
	}
	console.log(
		'Time to construct z string: ' + (new Date().getTime() - start.getTime())
	);
	console.log('Text length is ' + z.length);
	start = new Date();
	var best = 0,
		i,
		chosen,
		fitness,
		matches;
	for (i = 0; rules.length > i; i = i + 1) {
		matches = z.nm(rules[i].regex);
		fitness = rules[i].getFitness(z, matches);
		console.log(
			rules[i].name + ': ' + matches + ' matches, fitness ' + fitness
		);
		if (fitness > best) {
			best = fitness;
			chosen = rules[i];
		}
	}
	console.log('SELECTED: ' + chosen.name + ', with fitness ' + best);
	var re = chosen.regex;
	console.log(
		'Time used considering the ' +
			rules.length +
			' rules: ' +
			(new Date().getTime() - start.getTime())
	);
	start = new Date();
	function getArrayByTagName(node, tag) {
		var nodes = node.getElementsByTagName(tag),
			to_return = [],
			i;
		for (i = 0; nodes.length > i; i = i + 1) {
			to_return.push(nodes[i]);
		}
		return to_return;
	}
	var pre, post, pretext, keeptext, posttext, discard, retain, rest;
	for (i = 0; elements.length > i; i = i + 1) {
		e = elements[i];
		var tag = e.tagName.toLowerCase();
		if (tag == 'ol' || tag == 'ul') {
			e.style.listStyle = 'none none';
			e.style.listStyleType = 'none';
		}
		if (tag == 'script' || tag == 'style') {
			continue;
		}
		for (j = 0; e.childNodes.length > j; j = j + 1) {
			child = e.childNodes[j];
			if (child.nodeType == 3) {
				if (child.data.length > 0) {
					if (0 > child.textContent.indexOf('!--')) {
						retain = child.data.match(re);
						if (retain === null) {
							pretext = child.data;
							keeptext = '';
							posttext = '';
						} else {
							keeptext = retain[0];
							discard = child.data.split(keeptext);
							pretext = discard.shift();
							rest = child.data.indexOf(keeptext) + keeptext.length;
							posttext = child.data.substring(rest);
							if (posttext === null) {
								throw new Error(discard.length);
							}
						}
						child.replaceData(0, child.data.length, keeptext);
						if (pretext.length > 0) {
							pre = document.createElement('span');
							pre.appendChild(document.createTextNode(pretext));
							pre.style.color = 'transparent';
							e.insertBefore(pre, child);
						}
						if (posttext.length > 0) {
							post = document.createElement('span');
							post.appendChild(document.createTextNode(posttext));
							e.insertBefore(post, child.nextSibling);
							elements.push(post);
						}
					}
				}
			}
		}
	}
	console.log(
		'Time used processing text: ' + (new Date().getTime() - start.getTime())
	);
})();

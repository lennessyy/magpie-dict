function search() {
	var xhttp;
	var searchTerm = document.getElementById('searchbox').value;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			results = JSON.parse(this.responseText);
			createView(results.data);
		}
	};
	xhttp.open('GET', 'search?searchText=' + searchTerm, true);
	xhttp.send();
}

function searchKeyDown(ele) {
	if (event.key === 'Enter') {
		search();
	}
}

function createView(data) {
	const results = document.querySelector('#results');
	results.innerHTML = '';
	if (data.length === 0) {
		return alert('Sorry, we could not find anything matching the searched term');
	}
	for (let d of data) {
		const container = document.createElement('div');
		const metadata = createMetadataView(d);
		container.appendChild(metadata);
		const subs = document.createElement('div');
		const chineseLines = createChineseView(d);
		subs.appendChild(chineseLines);
		const englishLines = createEnglishView(d);
		subs.appendChild(englishLines);
		container.appendChild(subs);
		container.classList.add('returned-item');
		subs.classList.add('subs');
		results.appendChild(container);
	}
}

function createMetadataView(d) {
	const episode = d.episode;
	const timestamp = d.subs.post.a.start;
	const metadataView = document.createElement('div');
	metadataView.innerHTML = `
    <span>Episode: ${episode}</span>
    <span>Timestamp: ${timestamp}</span>
`;
	metadataView.classList.add('meta-data');
	return metadataView;
}

function createChineseView(d) {
	const chineseLines = document.createElement('div');
	const chineseTexts = [];
	for (let key in d.subs) {
		if (d.subs[key]['a'].text.length !== 0) {
			chineseTexts.push(d.subs[key]['a'].text);
		}
	}

	for (let line of chineseTexts) {
		const lineElement = document.createElement('p');
		lineElement.innerHTML = `- ${line}`;
		chineseLines.appendChild(lineElement);
	}
	chineseLines.classList.add('Chinese');
	return chineseLines;
}

function createEnglishView(d) {
	const englishLines = document.createElement('div');
	const englishTexts = [];
	for (let key in d.subs) {
		if (d.subs[key]['b'].text.length !== 0) {
			englishTexts.push(d.subs[key]['b'].text);
		}
	}

	const ul = document.createElement('ul');
	for (let line of englishTexts) {
		const lineElement = document.createElement('li');
		lineElement.innerHTML = `${line}`;
		ul.appendChild(lineElement);
	}
	englishLines.appendChild(ul);
	englishLines.classList.add('English');
	return englishLines;
}

const data = [
	{
		show: 'Empresses in the Palace',
		episode: '25',
		subs: {
			sub: {
				id: 338,
				a: {
					start: '00:17:15.560',
					end: '00:17:17.110',
					text: '是以牡丹和兰花为料'
				},
				b: {
					start: '',
					end: '',
					text: ''
				}
			},
			pre: {
				id: 337,
				a: {
					start: '00:17:11.920',
					end: '00:17:15.270',
					text: '闻出来的味道也清淡典雅'
				},
				b: {
					start: '00:17:13.060',
					end: '00:17:16.240',
					text: 'It smells light and elegant.'
				}
			},
			post: {
				id: 339,
				a: {
					start: '00:17:17.440',
					end: '00:17:18.990',
					text: '配了沈水香和松针'
				},
				b: {
					start: '00:17:16.500',
					end: '00:17:19.960',
					text: 'It contains peony and orchid petals,\nmixed with agarwood and pine needles.'
				}
			}
		}
	},
	{
		show: 'Empresses in the Palace',
		episode: '25',
		subs: {
			sub: {
				id: 342,
				a: {
					start: '00:17:24.040',
					end: '00:17:25.310',
					text: '牡丹那种雍容的底蕴'
				},
				b: {
					start: '',
					end: '',
					text: ''
				}
			},
			pre: {
				id: 341,
				a: {
					start: '00:17:22.720',
					end: '00:17:23.750',
					text: '闻久了'
				},
				b: {
					start: '',
					end: '',
					text: ''
				}
			},
			post: {
				id: 343,
				a: {
					start: '00:17:25.680',
					end: '00:17:28.630',
					text: '才会缓缓渗透出来 沁人心脾呀'
				},
				b: {
					start: '00:17:23.680',
					end: '00:17:28.860',
					text: 'It takes some time to discern the graceful scent\nof peony which seeps into your heart.'
				}
			}
		}
	},
	{
		show: 'Empresses in the Palace',
		episode: '25',
		subs: {
			sub: {
				id: 512,
				a: {
					start: '00:25:54.600',
					end: '00:25:56.710',
					text: '唯有牡丹真国色'
				},
				b: {
					start: '00:25:55.380',
					end: '00:25:57.140',
					text: 'Only mudan, in the color of the nation,'
				}
			},
			pre: {
				id: 511,
				a: {
					start: '00:25:51.600',
					end: '00:25:54.030',
					text: '池上芙蕖净少情'
				},
				b: {
					start: '00:25:52.680',
					end: '00:25:55.120',
					text: 'The lotus on the pond are elegant but unromantic.'
				}
			},
			post: {
				id: 513,
				a: {
					start: '00:25:57.000',
					end: '00:25:59.460',
					text: '花开时节动京城'
				},
				b: {
					start: '00:25:58.120',
					end: '00:26:00.180',
					text: 'draws the city to admire her blossoms.'
				}
			}
		}
	},
	{
		show: 'Empresses in the Palace',
		episode: '22',
		subs: {
			sub: {
				id: 754,
				a: {
					start: '00:39:58.480',
					end: '00:39:59.990',
					text: '牡丹亭的戏文上说'
				},
				b: {
					start: '00:39:58.800',
					end: '00:40:00.700',
					text: 'The Peony Pavilion writes,'
				}
			},
			pre: {
				id: 753,
				a: {
					start: '00:39:52.560',
					end: '00:39:54.470',
					text: '还真算是难得的本事啊'
				},
				b: {
					start: '00:39:51.000',
					end: '00:39:55.260',
					text: "It's almost a talent to have such thick skin."
				}
			},
			post: {
				id: 755,
				a: {
					start: '00:40:00.480',
					end: '00:40:02.470',
					text: '情不知所起一往情深'
				},
				b: {
					start: '00:40:00.800',
					end: '00:40:03.180',
					text: '"Love springs from an unknown origin\nand courses deep to an infinite end. "'
				}
			}
		}
	},
	{
		show: 'Empresses in the Palace',
		episode: '19',
		subs: {
			sub: {
				id: 391,
				a: {
					start: '00:25:30.720',
					end: '00:25:32.070',
					text: '王爷也读牡丹亭'
				},
				b: {
					start: '00:25:32.100',
					end: '00:25:34.440',
					text: 'Your Lordship has also read The Peony Pavilion?'
				}
			},
			pre: {
				id: 390,
				a: {
					start: '00:25:27.800',
					end: '00:25:29.350',
					text: '良辰美景奈何天'
				},
				b: {
					start: '00:25:28.860',
					end: '00:25:32.080',
					text:
						'"What a beautiful scene for a memorable time ...\nto the dullness of  my garden and my mind."'
				}
			},
			post: {
				id: 392,
				a: {
					start: '00:25:33.960',
					end: '00:25:35.390',
					text: '小王最中意这一句'
				},
				b: {
					start: '00:25:35.100',
					end: '00:25:37.220',
					text: 'My favorite line is'
				}
			}
		}
	}
];

let students = [];
const START = 4029720;
const STOP = 4039869;
let i;
let download = true;
let fileName = '';
let loss = [];

// document.querySelector('#divHTMLPrint > div > div > table').innerHTML = null;
chrome.runtime.onMessage.addListener(receiver);

// Handle the message
function receiver(request, sender, sendResponse) {
	if (request.message == 'start') {
		f();
		// chrome.runtime.sendMessage({ message: 'thank you' });
	} else if (request.message == 'save') {
		downloadObjectAsJson(students, fileName);
		i = STOP;
		download = false;
	}
}
async function f() {
	console.log('spider crawling....');

	//setting the exam event to winter 2019
	document.querySelector('#ctl00_ContentPlaceHolder1_ExEv_ID').value = 27;
	for (i = START; i < STOP; i++) {
		let rollInput = document.querySelector('#ctl00_ContentPlaceHolder1_TxtPrn');
		rollInput.value = i;

		let searchButton = document.querySelector(
			'#ctl00_ContentPlaceHolder1_btnSearch'
		);
		searchButton.click();
		let c = 0;
		while (
			!document.querySelector(
				'#ctl00_ContentPlaceHolder1_oGridViewExmdetails > tbody > tr:nth-child(2) > td:nth-child(5) > a'
			) &&
			c < 20
		) {
			c += 1;
			console.log('c: ' + c);
			await new Promise(r => setTimeout(r, 500));
		}
		if (
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_oGridViewExmdetails > tbody > tr:nth-child(2) > td:nth-child(5) > a'
			)
		) {
			let viewResultButton = document.querySelector(
				'#ctl00_ContentPlaceHolder1_oGridViewExmdetails > tbody > tr:nth-child(2) > td:nth-child(5) > a'
			);
			viewResultButton.click();
			while (!document.querySelector('#divHTMLPrint > div > div > table')) {
				await new Promise(r => setTimeout(r, 500));
			}
			if (document.querySelector('#divHTMLPrint > div > div > table')) {
				let resultTable = document.querySelector(
					'#divHTMLPrint > div > div > table'
				);
				addStudent(resultTable);
			}
		} else {
			console.log(`loss: ${i}`);
			continue;
		}
		fileName = `data${START}-${i}`;
	}
	if (download) {
		downloadObjectAsJson(students, fileName);
	}
}

function addStudent(table) {
	let name = document.querySelector(
		'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(1) > tbody > tr:nth-child(2) > td > b'
	).innerText;
	let marks = {
		maths: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(11) > b'
			).innerText
		),
		phy: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(11) > b'
			).innerText
		),
		chem: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(7) > td:nth-child(11) > b'
			).innerText
		),
		mech: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(9) > td:nth-child(11) > b'
			).innerText
		),
		bee: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(12) > td:nth-child(11) > b'
			).innerText
		),
		workshop: parseInt(
			document.querySelector(
				'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(2) > tbody > tr:nth-child(15) > td:nth-child(11) > b'
			).innerText
		),
		cgpa: parseFloat(
			document
				.querySelector(
					'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(4) > b'
				)
				.innerText.split(':')[1]
				.trim()
		),
		sgpa: parseFloat(
			document
				.querySelector(
					'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(4) > b'
				)
				.innerText.split(':')[1]
				.trim()
		)
	};
	let seatNumber = parseInt(
		document.querySelector(
			'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2) > b'
		).innerText
	);
	let branch = document
		.querySelector(
			'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(1) > b'
		)
		.innerText.match(/(?<=CBCS)(.*)(?=\sExamination)/)[0]
		.trim();
	let prn = parseInt(
		document.querySelector(
			'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(1) > b'
		).innerText
	);
	let clg = document.querySelector(
		'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(1) > tbody > tr:nth-child(4) > td > b'
	).innerText;
	let status = document
		.querySelector(
			'#ctl00_ContentPlaceHolder1_lblHTML > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(5) > b'
		)
		.innerText.split(':')[1]
		.trim();
	let tempObj = {
		name: name,
		seatNumber: seatNumber,
		prn: prn,
		branch: branch,
		college: clg,
		marks: marks,
		status: status
	};
	students.push(tempObj);
}

function downloadObjectAsJson(exportObj, exportName) {
	var dataStr =
		'data:text/json;charset=utf-8,' +
		encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', exportName + '.json');
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

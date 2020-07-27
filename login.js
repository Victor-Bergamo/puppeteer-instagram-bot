const puppeteer = require('puppeteer')

const instagram = {
	browser: null,
	page: null,

	initialize: async () => {
		// Setup Inicial
		instagram.browser = await puppeteer.launch({
			headless: false
		});

		instagram.page = await instagram.browser.newPage();

		console.log("Inicializado!")
	},

	login: async () => {
		// Page login
		await instagram.page.goto("https://www.instagram.com/accounts/login/?source=auth_switcher", {
			waitUntil: 'networkidle2'
		})

		await instagram.page.waitForSelector("[name='username']");

		await instagram.page.type("[name='username']", process.env.INSTAGRAM_USER = 'your username');

		//password
		await instagram.page.keyboard.down("Tab");

		await instagram.page.keyboard.type(process.env.INSTAGRAM_PWD = 'your password');

		//the selector of the "Login" button
		await instagram.page.click(".sqdOP.L3NKy.y3zKF");

		console.log("Feito o Login!")

		// Optional
		// check to remember
		try {
			await instagram.page.waitForSelector("section.ABCxa .sqdOP.L3NKy.y3zKF", {
				timeout: 10000
			});
			await instagram.page.click("section.ABCxa .sqdOP.L3NKy.y3zKF")
			console.log("Clicked to remember")
		} catch (err) {

		}

		//Optional
		//check if the app asks for notifications
		try {
			await instagram.page.waitForSelector(".aOOlW.HoLwm", {
				timeout: 10000
			});
			await instagram.page.click(".aOOlW.HoLwm");
			console.log("Yes!")
		} catch (err) {

		}
	},

	goToNewPage: async (url) => {
		await instagram.page.goto(url, {
			waitUntil: 'networkidle2'
		})
	},

	comment: async (comment, count) => {
		for (var i = 0; i < count; i++) {
			await instagram.page.type("textarea", comment, { delay: 100 });
			await instagram.page.waitFor(1000)
			await instagram.page.waitForSelector("[type='submit']")
			await instagram.page.click("[type='submit']")
		}
	}
}

module.exports = instagram;

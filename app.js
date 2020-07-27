const ig = require('./login');

(async () => {

    await ig.initialize();
    await ig.login();
    // url of some publication 
    await ig.goToNewPage("https://www.instagram.com/whatever/")
    // any comment and the number of times you want to comment
    await ig.comment("any comment ", 20)

})()

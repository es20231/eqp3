const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testLogoutButton() {
    // Configurando o driver do selenium para usar o navegador Chrome
    const options = new chrome.Options();
    options.addArguments('--start-maximized'); // Iniciar maximizado em tela cheia
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

try{

    await driver.get('http://localhost:3000/register'); // Abre a página onde o botão está localizado
    
    // Encontra e clica no botão de logout
    const button =  await driver.findElement(By.css('.w-25'))
    await driver.executeScript('arguments[0].click();', button);

    // Aguarda até que a URL atual contenha a URL após o logout
    await driver.wait(until.urlContains('http://localhost:3000/'), 10000);

    // Verifica se a URL corresponde à URL após o logout
    if (await driver.getCurrentUrl() === 'http://localhost:3000/') {
        console.log('Logout realizado com sucesso e redirecionado para a página correta.');
    } else {
        console.log('Logout não redirecionado como esperado.');
    }
    

}

catch (error) {
    console.error('Ocorreu um erro:', error);
} finally {
    // Fecha o navegador
    await driver.quit();
}


})();
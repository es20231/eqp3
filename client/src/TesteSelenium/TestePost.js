const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


(async function Post() {
    // Configuração do driver Chrome
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  
    try {
    

        // Abre a página
        await driver.get('http://localhost:3000/'); 

        // Preenche o formulário
        await driver.findElement(By.id('floatingInput')).sendKeys('aa');
        await driver.findElement(By.id('floatingPassword')).sendKeys('aa');

        // Submete o formulário
        const button =  await driver.findElement(By.css('.w-100'))
        await driver.executeScript('arguments[0].click();', button);


        // Aguarde até que a URL atual contenha a URL do dashboard
        await driver.wait(until.urlContains('http://localhost:3000/private') , 10000)//Se for realizado o login com os dados corretos

                await driver.sleep(1000)
        // Verifique se a URL corresponde à URL do dashboard
        if (await driver.getCurrentUrl() === 'http://localhost:3000/private') {
            console.log('Redirecionado para o Dashboard.');
            console.log('Login bem-sucedido!');
            } else {
            console.log('Não redirecionado para o Dashboard.');
            }        // 
            
            
            // Fazer upload de uma foto

        const buttonUpload = await driver.findElement(By.id("buttonUploadImage"));
        await buttonUpload.click();   

     

     
        const path = require('path');
        const imagePath = path.resolve(__dirname, './dataTest/ImageTest/test.jpg');

        const inputUploadImage = await driver.findElement(By.id("inputUploadImage"));
        inputUploadImage.sendKeys(imagePath);

        const buttonConfirmUpload = await driver.findElement(By.id("buttonConfirmUploadImage"));
        await buttonConfirmUpload.click();
        await driver.sleep(1000)

        // talvez pegar o toast de sucesso do upload pra verificar

        console.log('Upload da imagem realizado com sucesso.');

         //Postar a foto

      
        // await driver.wait(until.urlContains('http://localhost:3000/private') , 10000)    
        await driver.get('http://localhost:3000/Private'); 
        await driver.sleep(1000)


        // Localiza e cliqua no botão que abre o modal de postagem
        const postButton = await driver.findElement(By.css('[data-testid="post-button"]'));
        await postButton.click();

        // Aguarda até que o modal de postagem seja exibido
        await driver.wait(until.elementLocated(By.css('.modal-dialog')), 10000);

 
         
           // Preencha a descrição e escolha um filtro
            const descriptionInput = await driver.findElement(By.css('textarea'));
            await descriptionInput.sendKeys('MENINO NEY');
            await driver.sleep(1000)

        //    const filterSelect = await driver.findElement(By.id('ControlSelect'));
        //    await filterSelect.click();
        //    const invertFilterOption = await driver.findElement(By.css('option[value="invert"]'));
        //    await invertFilterOption.click();


        // Clique no botão "Aplicar Filtro"
        // const applyFilterButton = await driver.findElement(By.xpath('//button[contains(text(), "Aplicar Filtro")]'));
        // await applyFilterButton.click();



        // Clique no botão "Save Changes"
        const saveChangesButton = await driver.findElement(By.xpath('//button[contains(text(), "Save Changes")]'));
        await saveChangesButton.click();

        await driver.sleep(6000)

        
       // Abre a página
         await driver.get('http://localhost:3000/DashboardPerfil'); 
         await driver.sleep(1000)

         //await driver.wait(until.urlContains('http://localhost:3000/DashboardPerfil'), 10000);

         //await driver.sleep(5000)

        
        console.log("Imagem postada com sucesso")


    } catch (error) {
      console.error('Ocorreu um erro:', error);
    } finally {
      // Fecha o navegador
      await driver.quit();
    }
  })();
  
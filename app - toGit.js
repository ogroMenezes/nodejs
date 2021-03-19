const puppeteer = require('puppeteer');
const fs = require('fs');

let lista = fs.readFileSync('path/archive.txt').toString().split("\n");
let datetime = new Date();
let hoje = datetime.toLocaleDateString('pt-br');

function validaTamanho(tam){
    let val = tam.split(' ')

    switch(val[1]){
        case 'P\r': return '1';break;
        case 'M\r': return '2';break;
        case 'G\r': return '3';break;
        case 'GG\r': return '4';break;
        case 'G3\r': return '5';break;
        case 'G4\r': return '6';break;
        case 'G5\r': return '7';break;
        case 'G6\r': return '8';break;
    }   
}

function validaAltura(altura){
    let alt = String(altura);

    if (alt.length === 4){
        alt = alt.split('');
        return `${alt[0]},${alt[1]}${alt[2]}`
    }else{
        return alt.replace(".", ",");
    }
}

function validaCampo(campo){

    //let cmp = campo.toString();
    console.log(campo.toString());
    if (campo.toString() == " _Não informado_ "){
        return '';
    }else{
        return campo;
    }
}

function validaTelefone(campo){
    let stg = campo.slice(0, -1);
    let tam = stg.length;
    if ( tam < 11){
        return stg;
    }else{
        return stg.substring(tam -11);
    }
    
}

async function start(lista) {
    const browser = await puppeteer.launch({
        headless:false
    });

    const page = await browser.newPage();

    await page.goto('page');
    await page.type('#User','user');
    await page.type('#Password','passwd');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.img-circle');
    await page.goto('page');
    await page.waitForSelector('#Nome');
    await page.select("select#pais", "1")
    await page.type('#DtAdmissao',hoje,{delay:100});
    await page.select("select#cargo", "3")
    await page.click('input[name="ColeteNovo"]');

    ////////////////////////////////////////////////////////////////////

    await page.type('#Nome',lista[3].slice(0, -1),{delay:100});
    await page.type('#Email',lista[7].slice(0, -1).toLowerCase());
    let nasc = lista[9].split('/');
    let data = `${nasc[2]}${nasc[1]}${nasc[0]}`;
    await page.type('#DtNascimento',data,{delay:100});
    
    await page.type('#cep',lista[15].slice(0, -1),{delay:100});
   
    await page.type('#nro',lista[19].slice(0, -1),{delay:100});
    await page.type('#complemento',validaCampo(lista[23].slice(0, -1)),{delay:100});
    await page.type('#NomeColete',lista[5].slice(0, -1),{delay:100});
    await page.select("select#TamanhoColeteId", validaTamanho(lista[49]));
    await page.select("select#TamanhoCamisaId", validaTamanho(lista[51]));

    await page.type('#rg',lista[25].slice(0, -1),{delay:100});
    await page.type('#cpf',lista[27].slice(0, -1),{delay:100});
    await page.type('#celphone',validaTelefone(lista[29]),{delay:100});
    await page.type('#phone',validaTelefone(lista[31]),{delay:100});

    await page.type('#AtvProfissional',validaCampo(lista[33].slice(0, -1)),{delay:100});
    await page.type('#AreaAtuacao',validaCampo(lista[35].slice(0, -1)),{delay:100});
    await page.type('#emergencialphone',validaTelefone(lista[37]),{delay:100});
    await page.type('#contatoemergencial',validaCampo(lista[39].slice(0, -1)),{delay:100});

    await page.type('#peso',validaCampo(lista[41].slice(0, -1)),{delay:100});
    await page.type('#altura',validaAltura(lista[43]),{delay:100});
    await page.type('#NroCNH',validaCampo(lista[45].slice(0, -1)),{delay:100});
    await page.type('#CategoriaCNH',validaCampo(lista[47].slice(0, -1)),{delay:100});

    await page.type('#Marca',validaCampo(lista[69].slice(0, -1)),{delay:100});
    await page.type('#Modelo',validaCampo(lista[71].slice(0, -1)),{delay:100});
    await page.type('#Ano',validaCampo(lista[73].slice(0, -1)),{delay:100});
    await page.type('#Placa',validaCampo(lista[75].slice(0, -1)),{delay:100});
    await page.type('input[name="Seguradora"]',validaCampo(lista[77].slice(0, -1)),{delay:100});

    await page.type('#OriundoMC',validaCampo(lista[61].slice(0, -1)));
    await page.type('#CargoOriundoMC',validaCampo(lista[63].slice(0, -1)));

    await page.type('#ComoSoubeInsanosMC',validaCampo(lista[55].slice(0, -1)));
    await page.type('#InteresseInsanosMC',validaCampo(lista[59].slice(0, -1)));

    let obs = lista[1].slice(0, -1)+'\n'+lista[95].slice(0, -1);
    
    await page.type('#Observacao',obs);
    await page.select("select#tipointegrante", '99');

    //await page.keyboard.press('Enter');
    ////////////////////////////////////////////////////////////////////

    
    //browser.close();
}

function list(){
    console.log(lista[53]);
    console.log(lista[81]);
    console.log(lista[83]);
}

list(lista);
start(lista);



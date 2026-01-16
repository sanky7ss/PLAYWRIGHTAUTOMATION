const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');
async function WriteExcelTest(searchText,replaceText,change,filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colchange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText){
    let output = { row: -1, column: -1 };
     worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = columnNumber;
                console.log(output.row);
                console.log(output.column);
            }
        })
    })
    return output; 
}

// 

test('Upload Download EcxcelValidation',async({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloandEventPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    await downloandEventPromise;
    WriteExcelTest('Mango',350,{rowchange:0,colchange:2},"C:/Users/Sanket Soni/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/Sanket Soni/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has:textLocator});
    expect(desiredRow.locator("#cell-4-undefined")).toHaveText(updateValue);
})



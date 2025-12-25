const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert'); 

describe('Tugas Sesi 9 - Web UI Automation Fundamental', function() {
  // Set timeout
  this.timeout(30000); 
  let driver;

  // Setup sebelum test berjalan
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Test Case 1: Login Success 
  it('Harus sukses login dengan standard_user', async function() {
    // 1. Buka Website
    await driver.get('https://www.saucedemo.com');

    // 2. Input Username (Locator ID) 
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');

    // 3. Input Password (Locator ID)
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');

    // 4. Klik Login Button (Locator ID) 
    await driver.findElement(By.id('login-button')).click();

    // 5. Assertion/Validasi: Pastikan masuk ke halaman inventory 
    let titleElement = await driver.findElement(By.className('title'));
    let titleText = await titleElement.getText();
    
    // Validasi text harus "Products"
    assert.strictEqual(titleText, 'Products'); 
  });

// Test Case 2: Urutkan Produk dari Z-A
  it('Harus berhasil mengurutkan produk dari Z-A', async function() {
    // 1. Klik Dropdown Sort (Locator Class)
    let sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.click();

    // 2. Pilih opsi "Name (Z to A)" 
    await driver.findElement(By.css('option[value="za"]')).click();

    // 3. Validasi urutan
    // Ambil nama item pertama setelah di-sort
    let firstItem = await driver.findElement(By.css('.inventory_item_name')).getText();
    
    // Assertion: Item pertama harus "Test.allTheThings() T-Shirt (Red)" 
    assert.strictEqual(firstItem, 'Test.allTheThings() T-Shirt (Red)');
  });

  // Teardown setelah semua test selesai
  after(async function() {
    await driver.sleep(5000);
    await driver.quit();
  });
});
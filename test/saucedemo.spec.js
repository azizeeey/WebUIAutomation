const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert'); // Menggunakan native nodejs assert

describe('Tugas Sesi 9 - Web UI Automation Fundamental', function() {
  // Set timeout lebih lama karena selenium butuh waktu
  this.timeout(30000); 
  let driver;

  // Setup sebelum test berjalan
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Test Case 1: Sukses Login
  it('Harus sukses login dengan standard_user', async function() {
    // 1. Buka Website
    await driver.get('https://www.saucedemo.com');

    // 2. Input Username (Locator ID) [cite: 136]
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');

    // 3. Input Password (Locator ID)
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');

    // 4. Klik Login Button (Locator ID) [cite: 230]
    await driver.findElement(By.id('login-button')).click();

    // 5. Assertion/Validasi: Pastikan masuk ke halaman inventory 
    // Kita cek apakah elemen title "Products" muncul
    let titleElement = await driver.findElement(By.className('title'));
    let titleText = await titleElement.getText();
    
    // Validasi text harus "Products"
    assert.strictEqual(titleText, 'Products'); 
  });

  // Test Case 2: Urutkan Produk dari A-Z
  it('Harus berhasil mengurutkan produk dari A-Z', async function() {
    // 1. Klik Dropdown Sort (Locator Class/CSS) [cite: 142]
    let sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.click();

    // 2. Pilih opsi "Name (A to Z)" (value="az")
    // Menggunakan CSS Selector untuk mencari option spesifik
    await driver.findElement(By.css('option[value="az"]')).click();

    // 3. Validasi urutan (Opsional tapi disarankan untuk memastikan fungsi berjalan)
    // Ambil nama item pertama
    let firstItem = await driver.findElement(By.css('.inventory_item_name')).getText();
    
    // Item pertama di Sauce Demo jika A-Z biasanya "Sauce Labs Backpack"
    assert.strictEqual(firstItem, 'Sauce Labs Backpack');
  });

  // Teardown setelah semua test selesai
  after(async function() {
    await driver.quit();
  });
});
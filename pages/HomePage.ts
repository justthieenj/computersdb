import { expect, Locator, Page } from "@playwright/test";
import { CustomLocator } from "../utils/custom-locator";

class HomePage {
  readonly page: Page;
  readonly btnAddNew: Locator;
  readonly txtSearch: Locator;
  readonly btnSearch: Locator;
  readonly lnkComputerName: Locator;
  readonly rowComputerData: Locator;
  readonly lblWarningMessage: Locator;
  readonly lblNoComputersFound: Locator;
  readonly lblByHeader: CustomLocator;

  constructor(page: Page) {
    this.page = page;
    this.btnAddNew = page.locator("#add");
    this.txtSearch = page.locator("#searchbox");
    this.btnSearch = page.locator("#searchsubmit");
    this.lnkComputerName = page.locator("td>a[href*=computers]");
    this.rowComputerData = page.locator("table.computers>tbody>tr").first();
    this.lblByHeader = new CustomLocator(page, "//tbody/tr[1]/td[count(//th[a[text()='%s']]//preceding-sibling::th)+1]");
    this.lblWarningMessage = page.locator(".alert-message.warning");
    this.lblNoComputersFound = page.getByText("Nothing to display");
  }

  async clickAddNew() {
    await this.btnAddNew.click();
  }

  async findComputer(computerName: string) {
    await this.txtSearch.fill(computerName);
    await this.btnSearch.click();
  }

  /**
   * @param computerName: first computer name in the list
   */
  async findAndSelect(computerName: string) {
    await this.findComputer(computerName);
    await this.lnkComputerName.getByText(computerName).first().click();
  }

  async getRowData() {
    return {
      name: (await this.lblByHeader.setDynamic("Computer name").textContent()).trim(),
      introducedDate: (await this.lblByHeader.setDynamic("Introduced").textContent()).trim(),
      discontinuedDate: (await this.lblByHeader.setDynamic("Discontinued").textContent()).trim(),
      company: (await this.lblByHeader.setDynamic("Company").textContent()).trim(),
    };
  }

  async selectComputerToView() {
    await this.lnkComputerName.first().click();
  }

  async verifyComputerCreated(name: string) {
    await expect(this.lblWarningMessage).toContainText(`Done! Computer ${name} has been created`);
  }

  async verifyComputerUpdated(name: string) {
    await expect(this.lblWarningMessage).toContainText(`Done! Computer ${name} has been updated`);
  }

  async verifyComputerDeletedMessageDisplay() {
    await expect(this.lblWarningMessage).toContainText("Done! Computer has been deleted");
  }

  async verifyNoRecordsFound() {
    await expect(this.lblNoComputersFound).toBeVisible();
  }
}

export default HomePage;

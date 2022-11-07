import { Locator, Page } from "@playwright/test";
import { DropdownLocator } from "../utils/custom-locator";

export class ComputerForm {
  readonly page: Page;
  readonly txtComputerName: Locator;
  readonly txtIntroducedDate: Locator;
  readonly txtDiscontinuedDate: Locator;
  readonly drpCompany: DropdownLocator;

  constructor(page: Page) {
    this.page = page;
    this.txtComputerName = page.locator("#name");
    this.txtIntroducedDate = page.locator("#introduced");
    this.txtDiscontinuedDate = page.locator("#discontinued");
    this.drpCompany = new DropdownLocator(page, "#company");
  }

  async fillComputerInfo(computerInfo: { name: string; introducedDate: string; discontinuedDate: string; company: string }) {
    await this.txtComputerName.fill(computerInfo.name);
    await this.txtIntroducedDate.fill(computerInfo.introducedDate);
    await this.txtDiscontinuedDate.fill(computerInfo.discontinuedDate);
    await this.drpCompany.select(computerInfo.company);
  }
}

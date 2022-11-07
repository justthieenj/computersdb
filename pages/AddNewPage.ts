import { Locator, Page } from "@playwright/test";
import { ComputerForm } from "../components/ComputerForm";

class AddNewPage extends ComputerForm {
  readonly btnCreate: Locator;

  constructor(page: Page) {
    super(page);
    this.btnCreate = page.locator("[value='Create this computer']");
  }

  /**
   *
   * @param computerInfo name: required
   */
  async addComputer(computerInfo: { name: string; introducedDate: string; discontinuedDate: string; company: string }) {
    await this.fillComputerInfo(computerInfo);
    await this.btnCreate.click();
  }
}

export default AddNewPage;

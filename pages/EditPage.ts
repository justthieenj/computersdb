import { expect, Locator, Page } from "@playwright/test";
import { ComputerForm } from "../components/ComputerForm";
import { convertTime } from "../utils/utils";

class EditPage extends ComputerForm {
  readonly btnSave: Locator;
  readonly btnDelete: Locator;

  constructor(page: Page) {
    super(page);
    this.btnSave = page.locator("[value='Save this computer']");
    this.btnDelete = page.locator("[value='Delete this computer']");
  }

  async getComputerName() {
    const name = await this.txtComputerName.getAttribute("value");
    return name !== null ? name : "";
  }

  /**
   *
   * @param computerInfo name: required
   */
  async update(computerInfo: { name: string; introducedDate: string; discontinuedDate: string; company: string }) {
    await this.fillComputerInfo(computerInfo);
    await this.btnSave.click();
  }

  async delete() {
    await this.btnDelete.click();
  }

  async verifyComputerData(computerInfo: { name: string; introducedDate: string; discontinuedDate: string; company: string }) {
    await expect(this.txtComputerName).toHaveValue(computerInfo.name);
    await expect(this.txtIntroducedDate).toHaveValue(computerInfo.introducedDate == "-" ? "" : convertTime(computerInfo.introducedDate));
    await expect(this.txtDiscontinuedDate).toHaveValue(computerInfo.discontinuedDate == "-" ? "" : convertTime(computerInfo.discontinuedDate));
    await expect(this.drpCompany.getLocator()).toContainText(computerInfo.name == "-" ? "" : computerInfo.company);
  }
}

export default EditPage;

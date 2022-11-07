import { test } from "@playwright/test";
import { EditPage, HomePage } from "../pages";
import { URL } from "../utils/constants";

test("User can edit a computer", async ({ page }) => {
  await test.step(`Go to ${URL}`, async () => {
    await page.goto(URL);
  });

  let computerInfo = { name: "AutoTest", introducedDate: "", discontinuedDate: "", company: "" };
  const homePage = new HomePage(page);
  await test.step("Find and click a Computer with name ", async () => {
    await homePage.findComputer(computerInfo.name);
    computerInfo = await homePage.getRowData();
    await homePage.selectComputerToView();
  });

  const updatedData = { name: "ModifiedComputer", introducedDate: "", discontinuedDate: "", company: "" };
  const editPage = new EditPage(page);
  await test.step(`Update computer name to '${updatedData.name}'`, async () => {
    await editPage.update(updatedData);
  });

  await test.step("Verify computer is updated", async () => {
    await homePage.verifyComputerUpdated(updatedData.name);
  });
});

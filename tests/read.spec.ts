import { test } from "@playwright/test";
import { URL } from "../utils/constants";
import { EditPage, HomePage } from "../pages";

test("User can view a computer", async ({ page }) => {
  await test.step(`Go to ${URL}`, async () => {
    await page.goto(URL);
  });

  let computerInfo = { name: "", introducedDate: "", discontinuedDate: "", company: "" };
  const homePage = new HomePage(page);
  await test.step("View a computer", async () => {
    computerInfo = await homePage.getRowData();
    await homePage.selectComputerToView();
  });

  const editPage = new EditPage(page);
  await test.step("Verify computer data in Computer form match with home page", async () => {
    editPage.verifyComputerData(computerInfo);
  });
});

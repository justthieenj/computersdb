import { test } from "@playwright/test";
import { EditPage, HomePage } from "../pages";
import { URL } from "../utils/constants";

test("User can delete a computer", async ({ page }) => {
  await test.step(`Go to ${URL}`, async () => {
    await page.goto(URL);
  });

  let deletedName = "";
  const homePage = new HomePage(page);
  const editPage = new EditPage(page);
  await test.step("Find computer by name and delete it", async () => {
    await homePage.findAndSelect("AutoTest");
    deletedName = await editPage.getComputerName();
    await editPage.delete();
  });

  await test.step("Verify message the computer have been deleted display", async () => {
    await homePage.verifyComputerDeletedMessageDisplay();
  });

  await test.step(`Find the computer by name '${deletedName}' again to make sure no records found`, async () => {
    await homePage.findComputer(deletedName);
    await homePage.verifyNoRecordsFound();
  });
});

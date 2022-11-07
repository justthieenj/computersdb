import { test } from "@playwright/test";
import { AddNewPage, HomePage } from "../pages";
import { URL } from "../utils/constants";
import { getEpoch } from "../utils/utils";

test("User can create a new computer", async ({ page }) => {
  await test.step(`Go to ${URL}`, async () => {
    await page.goto(URL);
  });

  const homePage = new HomePage(page);
  await test.step("Click Add a new computer button", async () => {
    await homePage.clickAddNew();
  });

  const computerInfo = {
    name: `AutoTest-${getEpoch()}`,
    introducedDate: "2021-01-01",
    discontinuedDate: "2021-01-02",
    company: "Apple Inc.",
  };
  const addNewPage = new AddNewPage(page);
  await test.step("Fill data info for the new computer and click Create", async () => {
    await addNewPage.addComputer(computerInfo);
  });

  await test.step("Verify the computer is created", async () => {
    await homePage.verifyComputerCreated(computerInfo.name);
  });
});

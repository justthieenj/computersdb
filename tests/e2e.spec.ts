import { test } from "@playwright/test";
import { AddNewPage, EditPage, HomePage } from "../pages";
import { URL } from "../utils/constants";
import { getGenericData } from "../utils/read-excel";
import { getEpoch } from "../utils/utils";

test("User can create, view, update and then delete a new computer", async ({ page }) => {
  await test.step(`Go to ${URL}`, async () => {
    await page.goto(URL);
  });

  const homePage = new HomePage(page);
  await test.step("Click Add a new computer button", async () => {
    await homePage.clickAddNew();
  });

  const computerInfo = getGenericData()
  const addNewPage = new AddNewPage(page);
  await test.step("Fill data info for the new computer and click Create", async () => {
    await addNewPage.addComputer(computerInfo);
  });

  await test.step("Verify the computer is created", async () => {
    await homePage.verifyComputerCreated(computerInfo.name);
  });

  let tableRowData;
  await test.step("Find and select the created computer to view", async () => {
    await homePage.findComputer(computerInfo.name);
    tableRowData = await homePage.getRowData();
    await homePage.selectComputerToView();
  });

  const editPage = new EditPage(page);
  await test.step("Verify computer data in Computer form match with home page", async () => {
    editPage.verifyComputerData(tableRowData);
  });

  const updatedData = { name: `ModifiedComputer${getEpoch()}`, introducedDate: "", discontinuedDate: "", company: "" };
  await test.step(`Update computer name to '${updatedData.name}'`, async () => {
    await editPage.update(updatedData);
  });

  await test.step("Verify computer is updated", async () => {
    await homePage.verifyComputerUpdated(updatedData.name);
  });

  await test.step("Find and select the updated computer to delete", async () => {
    await homePage.findAndSelect(updatedData.name);
    await editPage.delete();
  });

  await test.step("Verify the computer is deleted", async () => {
    await homePage.verifyComputerDeletedMessageDisplay();
  });

  await test.step(`Find the computer by name '${updatedData.name}' again to make sure no records found`, async () => {
    await homePage.findComputer(updatedData.name);
    await homePage.verifyNoRecordsFound();
  });
});

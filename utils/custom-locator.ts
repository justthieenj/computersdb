import { Locator, Page } from "@playwright/test";
import * as util from "util";

export class CustomLocator {
  readonly selector: string;
  readonly page: Page;

  constructor(page: Page, selector: string) {
    this.page = page;
    this.selector = selector;
  }

  getLocator(): Locator {
    return this.page.locator(this.selector);
  }

  setDynamic(...args: string[] | number[]): Locator {
    const updatedLocator = util.format(this.selector, ...args);
    return this.page.locator(updatedLocator);
  }

  fill(value?: string): Promise<void> {
    return this.getLocator().fill(value === undefined ? "" : value);
  }
}

export class DropdownLocator extends CustomLocator {
  async select(value: string): Promise<void> {
    if (value && value !== "") {
      await this.getLocator().selectOption({ label: value });
    }
  }
}

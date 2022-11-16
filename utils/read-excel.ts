import { parse } from "node-xlsx";
import * as path from "node:path";
import * as util from "node:util";

const filePath = path.resolve(__dirname, "test-data.xlsx");
const workbook = readExcelFile(filePath);

export function readExcelFile(filePath: string) {
  const data = parse(filePath);
  return data;
}

export function getComputerData(): {
  name: string;
  introducedDate: string;
  discontinuedDate: string;
  company: string;
}[] {
  const computerData = [];
  workbook[0].data.map((data, i) => {
    computerData[i] = {
      name: data[0],
      introducedDate: data[1],
      discontinuedDate: data[2],
      company: data[3],
    };
  });
  computerData.shift(); // remove the header row
  return computerData;
}

export function getGenericData(): {
  name: string;
  introducedDate: string;
  discontinuedDate: string;
  company: string;
} {
  const secondRow = workbook[1].data[1];
  return {
    name: util.format(secondRow[0], new Date().getTime()),
    introducedDate: secondRow[1],
    discontinuedDate: secondRow[2],
    company: secondRow[3],
  };
}

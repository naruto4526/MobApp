import { storage } from "./useStore";
import { listSympObjs, listMedObjs, listVitalObjs } from "../src/graphql/queries";

const savePatientData = (userId) => {
  console.log("i am called");
}

export {savePatientData};
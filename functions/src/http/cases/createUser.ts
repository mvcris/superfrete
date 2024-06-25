import {firestore} from "../../index";

type Input = {
    name: string;
}

type Output = {
    name?: string;
    success: boolean;
}

export const createUser = async ({name}: Input): Promise<Output> => {
  await firestore.collection("users").add({name});
  return {name, success: true};
};

import {firestore} from "../../index";

type Input = {
    name: string;
}

type Output = {
    name: string,
    id: string;
}

export const createUser = async ({name}: Input): Promise<Output> => {
  const createdUser = await firestore.collection("users").add({name});
  return {name, id: createdUser.id};
};

import { TTutorial } from "./tutorial.interface";
import { TutorialModel } from "./tutorial.model";

const createTutorialIntroDB = async (payload: TTutorial, userId: string) => {
  const result = await TutorialModel.create({
    ...payload,
    user: userId,
  });

  return result;
};

export const TutorialService = {
  createTutorialIntroDB,
};

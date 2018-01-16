import { CHANGE_LOVED_ONES } from './types';

export const changeLovedOnes = lovedOnes => ({
  type: CHANGE_LOVED_ONES,
  payload: lovedOnes
});

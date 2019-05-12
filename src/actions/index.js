/*
 src/actions/simpleAction.js
*/
export const simpleAction = () => dispatch => {
  dispatch({
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action"
  });
};

export const insertAd = category => {
  return {
    type: "INSERT_AD",
    payload: category
  };
};

export const insertCarAd = () => {
  return {
    type: "INSERT_CAR_AD"
  };
};

export const insertPropAd = () => {
  return {
    type: "INSERT_PROP_AD"
  };
};

export const buyCredits = () => {
  return {
    type: "BUY_CREDITS"
  };
};

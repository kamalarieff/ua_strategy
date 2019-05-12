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

export const buyCredits = () => {
  return {
    type: "BUY_CREDITS"
  };
};

export const enablePostAds = () => {
  return {
    type: "MAKE_ADS_POSTABLE"
  };
};

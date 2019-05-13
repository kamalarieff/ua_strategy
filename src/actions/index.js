/*
 src/actions/simpleAction.js
*/
export const simpleAction = () => dispatch => {
  dispatch({
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action"
  });
};

export const insertFreeAd = category => {
  return {
    type: "INSERT_FREE_AD",
    payload: category
  };
};

export const insertPaidAd = category => {
  return {
    type: "INSERT_PAID_AD",
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

export const chooseStoreType = type => {
  return {
    type: "CHOOSE_STORE_TYPE",
    payload: type
  };
};

import { combineReducers } from "redux";

/*
 src/reducers/simpleReducer.js
*/

const initialState = {
  categories: {
    cars: {
      isNextAdPostable: true,
      currentCount: 0,
      limit: 1
    },
    properties: {
      isNextAdPostable: true,
      currentCount: 0,
      limit: 1
    },
    jobs: {
      isNextAdPostable: true,
      currentCount: 0,
      limit: 1
    },
    mobilePhones: {
      isNextAdPostable: true,
      currentCount: 0,
      limit: 1
    },
    everythingElse: {
      isNextAdPostable: true,
      currentCount: 0,
      limit: Infinity
    }
  },
  credits: 0
};

function isEnoughCredits(credits) {
  if (credits > 0) return true;
  return false;
}

function hasFreeAds(currentCount, freeAdsCount) {
  if (currentCount < freeAdsCount) return true;
  return false;
}

const simpleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload
      };
    case "INSERT_AD": {
      const {
        [action.payload]: { currentCount },
        [action.payload]: { limit }
      } = state.categories;

      const { credits } = state;
      const newCredits = credits >= limit ? credits - 10 : credits;
      const newCount = currentCount + 1;
      const isNextAdPostable =
        isEnoughCredits(newCredits) || hasFreeAds(newCount, limit);

      const result = {
        categories: {
          ...state.categories,
          ...{
            [action.payload]: {
              currentCount: newCount,
              isNextAdPostable,
              limit
            }
          }
        },
        credits: newCredits
      };
      return { ...state, ...result };
    }
    case "MAKE_ADS_POSTABLE": {
      const { categories, credits: tempCredits } = state;
      const categoriesArray = Object.keys(categories);

      const result = categoriesArray.reduce((accumulator, currentValue) => {
        const temp = {
          isNextAdPostable:
            isEnoughCredits(tempCredits) ||
            hasFreeAds(
              categories[currentValue].currentCount,
              categories[currentValue].limit
            )
        };
        return {
          ...accumulator,
          [currentValue]: { ...categories[currentValue], ...temp }
        };
      }, {});
      return { ...state, categories: result };
    }
    case "INSERT_CAR_AD":
      return { ...state, ...state.categories.cars.currentCount++ };
    case "BUY_CREDITS":
      return { ...state, ...{ credits: 50 } };
    default:
      return state;
  }
};

/*
 src/reducers/rootReducer.js
*/
export default combineReducers({
  simpleReducer
});

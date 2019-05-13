import { combineReducers } from "redux";

/*
 src/reducers/simpleReducer.js
*/

const initialState = {
  categories: {
    cars: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      currentCount: 0,
      limit: 1
    },
    properties: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      currentCount: 0,
      limit: 1
    },
    jobs: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      currentCount: 0,
      limit: 1
    },
    mobilePhones: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      currentCount: 0,
      limit: 1
    },
    everythingElse: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
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
    case "INSERT_FREE_AD": {
      const {
        [action.payload]: { currentCount },
        [action.payload]: { limit }
      } = state.categories;

      const newCount = currentCount + 1;
      const isNextAdPostable = hasFreeAds(newCount, limit);

      const result = {
        categories: {
          ...state.categories,
          ...{
            [action.payload]: {
              ...{
                currentCount: newCount,
                isNextAdPostable,
                limit
              }
            }
          }
        }
      };
      return { ...state, ...result };
    }
    case "INSERT_PAID_AD": {
      const {
        [action.payload]: { isNextFreeAdPostable },
        [action.payload]: { currentCount },
        [action.payload]: { limit }
      } = state.categories;
      const { categories, credits } = state;

      const newCredits = credits - 10;
      const newCount = currentCount + 1;
      const isNextPaidAdPostable = isEnoughCredits(newCredits);

      const categoriesArray = Object.keys(categories);
      const recalculateAllCategories = categoriesArray.reduce(
        (accumulator, currentValue) => {
          return {
            ...accumulator,
            [currentValue]: {
              isNextFreeAdPostable:
                categories[currentValue].isNextFreeAdPostable,
              isNextPaidAdPostable,
              currentCount: categories[currentValue].currentCount,
              limit: categories[currentValue].limit
            }
          };
        },
        {}
      );

      const result = {
        categories: {
          ...state.categories,
          ...recalculateAllCategories,
          ...{
            [action.payload]: {
              ...{
                isNextFreeAdPostable,
                isNextPaidAdPostable,
                currentCount: newCount,
                limit
              }
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
          isNextPaidAdPostable:
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

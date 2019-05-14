import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";

/*
 src/reducers/simpleReducer.js
*/

const initialState = {
  categories: {
    cars: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      isProfileActivated: false,
      freeAdsCount: 0,
      paidAdsCount: 0,
      currentCount: 0,
      limit: 1
    },
    properties: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      isProfileActivated: false,
      freeAdsCount: 0,
      paidAdsCount: 0,
      currentCount: 0,
      limit: 1
    },
    jobs: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      isProfileActivated: false,
      freeAdsCount: 0,
      paidAdsCount: 0,
      currentCount: 0,
      limit: 1
    },
    mobilePhones: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      isProfileActivated: false,
      freeAdsCount: 0,
      paidAdsCount: 0,
      currentCount: 0,
      limit: 1
    },
    everythingElse: {
      isNextFreeAdPostable: true,
      isNextPaidAdPostable: false,
      isProfileActivated: false,
      freeAdsCount: 0,
      paidAdsCount: 0,
      currentCount: 0,
      limit: Infinity
    }
  },
  credits: 0,
  me: {
    isCarVerified: false,
    carStoreType: false
  }
};

function isEnoughCredits(credits) {
  if (credits > 0) return true;
  return false;
}

function hasFreeAds(currentCount, freeAdsLimit) {
  if (currentCount < freeAdsLimit) return true;
  return false;
}

const simpleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload
      };
    case "INSERT_FREE_AD": {
      const { [action.payload]: currentAd } = state.categories;
      const { currentCount, limit, freeAdsCount } = currentAd;

      const newCount = currentCount + 1;
      const newFreeAdsCount = freeAdsCount + 1;
      const isNextFreeAdPostable = hasFreeAds(newCount, limit);

      const temp = {
        ...currentAd,
        ...{
          currentCount: newCount,
          freeAdsCount: newFreeAdsCount,
          isNextFreeAdPostable
        }
      };

      const result = {
        categories: {
          ...state.categories,
          ...{
            [action.payload]: {
              ...temp
            }
          }
        }
      };
      return { ...state, ...result };
    }
    case "INSERT_PAID_AD": {
      const { [action.payload]: currentAd } = state.categories;
      const { currentCount, paidAdsCount } = currentAd;

      const { categories, credits } = state;

      const newCredits = credits - 10;
      const newCount = currentCount + 1;
      const newPaidAdsCount = paidAdsCount + 1;
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
              isProfileActivated: categories[currentValue].isProfileActivated,
              freeAdsCount: categories[currentValue].freeAdsCount,
              paidAdsCount: categories[currentValue].paidAdsCount,
              currentCount: categories[currentValue].currentCount,
              limit: categories[currentValue].limit
            }
          };
        },
        {}
      );

      const temp = {
        ...currentAd,
        ...{
          currentCount: newCount,
          paidAdsCount: newPaidAdsCount,
          isNextPaidAdPostable,
          isProfileActivated: true
        }
      };

      const result = {
        categories: {
          ...state.categories,
          ...recalculateAllCategories,
          ...{
            [action.payload]: {
              ...temp
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
    case "CHOOSE_STORE_TYPE": {
      return {
        ...state,
        ...{ me: { isCarVerified: true, carStoreType: action.payload } }
      };
    }
    default:
      return state;
  }
};

/*
 src/reducers/rootReducer.js
*/
export default history =>
  combineReducers({
    simpleReducer,
    toastr: toastrReducer,
    router: connectRouter(history)
  });

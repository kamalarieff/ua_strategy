import { combineReducers } from "redux";

/*
 src/reducers/simpleReducer.js
*/

const initialState = {
  categories: {
    cars: {
      currentCount: 0
    },
    properties: {
      currentCount: 0
    },
    jobs: {
      currentCount: 0
    },
    mobilePhones: {
      currentCount: 0
    },
    everythingElse: {
      currentCount: 0
    }
  },
  credits: 0
};
const simpleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload
      };
    case "INSERT_AD":
      let {
        [action.payload]: { currentCount: newCount }
      } = state.categories;
      newCount++;

      const result = {
        categories: {
          ...state.categories,
          ...{
            [action.payload]: {
              currentCount: newCount
            }
          }
        }
      };

      return { ...state, ...result };
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

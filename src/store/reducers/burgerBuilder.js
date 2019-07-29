import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice += INGREDIENT_PRICES[action.ingredientName],
        building: true
    })

}

const removeIngredient = (state, action) => {
    const ingredientValue = state.ingredients[action.ingredientName] - 1;
            if(ingredientValue < 0) return state;
            const updatedIngs = updateObject(state.ingredients, {  [action.ingredientName]: ingredientValue  });
            return updateObject(state, {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice -= INGREDIENT_PRICES[action.ingredientName],
                building: true
            })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        building: false
    })
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)           
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true})      
        default:
            return state;
    }

};

export default reducer;
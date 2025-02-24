import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CartItem {
    id: number;
    name: string;
}


const slice = createSlice({
    name: 'Cart',
    initialState: {
        cart: [] as CartItem[],
    },
    reducers: {
        AddItemToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
            return state;
        },
        RemoveItemFromCart: (state, action: PayloadAction<{ id: Number }>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        }
    },
});

export const {
    AddItemToCart,
    RemoveItemFromCart,
} = slice.actions;

export default slice.reducer;

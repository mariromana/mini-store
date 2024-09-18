import { Store } from '@/types/store';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { createUserSlice } from './user-slice';
import { createCartSlice } from './cart-slice';

export const useStore = create<Store>()(
    devtools(
        persist(
            subscribeWithSelector(
                immer((...a) => ({
                    ...createUserSlice(...a),
                    ...createCartSlice(...a),
                }))
            ),
            {
                name: 'local-storage',
            }
        )
    )
);

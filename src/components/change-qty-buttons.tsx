import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
type Props = { productId: string };

export function ChangeQtyButton({ productId }: Props) {
    const { getProductById, decQuantity, incQuantity, setTotal } = useStore(
        useShallow((state) => ({
            getProductById: state.getProductById,
            decQuantity: state.decQuantity,
            incQuantity: state.incQuantity,
            setTotal: state.setTotal,
        }))
    );

    const product = getProductById(productId);

    useEffect(() => {
        const unSub = useStore.subscribe(
            (state) => state.products,
            (products) => {
                setTotal(
                    products.reduce(
                        (total, product) =>
                            total + product.price * product.quantity,
                        0
                    )
                );
                {
                    fireImmediately: true;
                }
            }
        );
        return unSub;
    }, [setTotal]);
    return (
        <>
            {product && (
                <div className="flex gap-2 items-center">
                    <Button size="icon" onClick={() => decQuantity(productId)}>
                        <Minus />
                    </Button>
                    <p>{product.quantity}</p>
                    <Button size="icon" onClick={() => incQuantity(productId)}>
                        <Plus />
                    </Button>
                </div>
            )}
        </>
    );
}

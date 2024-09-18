import { Cart } from '@/components/cart';
import { ChangeQtyButton } from '@/components/change-qty-buttons';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { PRODUCTS_DATA } from '@/lib/mockData';
import { useStore } from '@/store/store';
import { User } from '@/components/user';
// import { useShallow } from 'zustand/react/shallow';
export default function App() {
    // const { age, fullName, userName } = useStore(
    //     useShallow((state) => ({
    //         age: state.age,
    //         fullName: state.fullName,
    //         userName: state.userName,

    //     }))
    // );

    const addProduct = useStore((state) => state.addProduct);
    const cartProducts = useStore((state) => state.products);
    return (
        <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
            <div className="flex justify-between">
                <User />
                <Cart />
            </div>

            <h1 className="text-2xl">Products:</h1>
            <div className="space-y-2">
                {PRODUCTS_DATA.map((product) => (
                    <Card key={product.id}>
                        <CardHeader>{product.title}</CardHeader>
                        <CardContent>{product.price}</CardContent>
                        <CardFooter>
                            {cartProducts.find(
                                (item) => item.id === product.id
                            ) ? (
                                <ChangeQtyButton productId={product.id} />
                            ) : (
                                <Button
                                    variant="default"
                                    onClick={() => addProduct(product)}
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}

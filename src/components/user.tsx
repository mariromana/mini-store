import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { UserIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@/store/store';

import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { useEffect } from 'react';

export function User() {
    const { setAddress, address, fullName, userName, fecthUser } = useStore(
        useShallow((state) => ({
            setAddress: state.setAddress,
            fullName: state.fullName,
            userName: state.userName,
            address: state.address,
            fecthUser: state.fecthUser,
        }))
    );

    useEffect(() => {
        async function fetchData() {
            await fecthUser();
        }

        fetchData();
    }, [fecthUser]);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant="secondary">
                    <UserIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="overflow-y-scroll space-y-2 w-96">
                <div className="flex gap-2 items-center">
                    <h1>User</h1>
                    <p>{fullName}</p>
                    <p className="text-sm">{userName}</p>
                </div>
                <Label htmlFor="address"> Your Address:</Label>
                <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></Input>
            </PopoverContent>
        </Popover>
    );
}

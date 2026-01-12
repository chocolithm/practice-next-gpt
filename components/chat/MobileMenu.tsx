'use client';

import { Menu } from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "../ui/sheet";
import {Sidebar} from "@/components/chat/Sidebar";
import {useSheetStore} from "@/store/sheet";

export function MobileMenu() {
    const open = useSheetStore((state) => state.open);
    const setOpen = useSheetStore((state) => state.setOpen);

    return (
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
                <SheetTrigger asChild>
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
}
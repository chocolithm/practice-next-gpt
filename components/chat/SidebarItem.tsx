'use client';

import {ReactNode, useState} from "react";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu";
import {Ellipsis, Pencil, Trash} from "lucide-react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useSheetStore} from "@/store/sheet";

type Props = {
    item: {
        id: string;
        href: string;
        icon: ReactNode;
        label: string;
    }
}

export function SidebarItem({ item }: Props) {
    const { id, href, icon, label } = item;
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const setOpen = useSheetStore((state) => state.setOpen);

    const handleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <Link
            href={href}
            scroll={false}
            className={cn("flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",
                isMenuOpen || pathname === href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
            )}
            onClick={() => setOpen(false)}
        >
            {/*label 영역*/}
            <div className="flex items-center gap-2">
                {icon} <div className="w-[180px] truncate">{label}</div>
            </div>
            {/*드롭다운 영역*/}
            {id !== 'new' && (
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <div onClick={handleMenu}>
                            <Ellipsis
                                className={cn(
                                    "group-hover:block text-gray-400 hover:text-white",
                                    isMenuOpen ? "block text-white" : "md:hidden text-gray-400"
                                )}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="gap-2">
                            <Pencil size={18} />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <Trash size={18} />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </Link>

    );
}
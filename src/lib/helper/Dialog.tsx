'use client';
import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogComponent({
    trigger,
    title,
    description,
    children,
    closeButtons,
    onOpenChange,
}: {
    trigger: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
    closeButtons: React.ReactNode;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <DialogClose asChild>
                        {closeButtons}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
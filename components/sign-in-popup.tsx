'use client'

import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";

export function SignInPopup() {
    return (
        <div>
            <AlertDialog open={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sign in to view the dashboard</AlertDialogTitle>
                        {/* <AlertDialogDescription>
                            Sign in to view the dashboard
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <SignInButton>
                            <Button>Sign in</Button>
                        </SignInButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
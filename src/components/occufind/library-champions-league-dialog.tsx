
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Trophy, Play } from 'lucide-react';
import Image from 'next/image';
import QRCode from 'qrcode';

interface RegistrationData {
    name: string;
    department: string;
    branch: string;
    enrollmentNo: string;
    libraryCardNo: string;
}

export function LibraryChampionsLeagueDialog() {
  const [isLeagueDialogOpen, setIsLeagueDialogOpen] = useState(false);
  const [leagueFormSubmitted, setLeagueFormSubmitted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const { toast } = useToast();

  const handleLeagueSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as RegistrationData;
    
    const generatedId = `LCL-${Date.now()}`;
    setUniqueId(generatedId);

    const qrData = {
        id: generatedId,
        name: data.name,
        enrollmentNo: data.enrollmentNo
    };

    try {
        const url = await QRCode.toDataURL(JSON.stringify(qrData));
        setQrCodeUrl(url);
        setLeagueFormSubmitted(true);
        toast({
            title: "Registration Successful!",
            description: "You are now part of the Library Champions League."
        });
    } catch (err) {
        console.error(err);
        toast({
            variant: "destructive",
            title: "QR Code Generation Failed",
            description: "Could not generate your unique QR code. Please try again."
        });
    }
  }

  const resetLeagueForm = () => {
    setIsLeagueDialogOpen(false);
    setTimeout(() => {
       setLeagueFormSubmitted(false);
       setQrCodeUrl('');
       setUniqueId('');
    }, 300); // Delay to allow dialog to close smoothly
  }

  return (
    <Dialog open={isLeagueDialogOpen} onOpenChange={(open) => {
        setIsLeagueDialogOpen(open);
        if (!open) {
            resetLeagueForm();
        }
    }}>
        <DialogTrigger asChild>
            <Button className="w-full">
                <Play className="mr-2" />
                Participate Now
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            {!leagueFormSubmitted ? (
                <form onSubmit={handleLeagueSubmit}>
                    <DialogHeader>
                        <DialogTitle>Register for Library Champions League</DialogTitle>
                        <DialogDescription>Fill in your details to participate.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="league-name" className="text-right">Name</Label>
                            <Input id="league-name" name="name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="league-department" className="text-right">Department</Label>
                            <Input id="league-department" name="department" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="league-branch" className="text-right">Branch</Label>
                            <Input id="league-branch" name="branch" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="league-enrollment" className="text-right">Enrollment No.</Label>
                            <Input id="league-enrollment" name="enrollmentNo" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="league-card" className="text-right">Library Card No.</Label>
                            <Input id="league-card" name="libraryCardNo" className="col-span-3" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Submit Registration</Button>
                    </DialogFooter>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
                    <Trophy className="h-12 w-12 text-yellow-500" />
                    <h3 className="text-xl font-bold">Welcome to the League, Champion!</h3>
                    <p className="text-muted-foreground px-4">Your registration is complete. Here is your unique ID and QR code for library entry.</p>
                    
                    <Card className="mt-4 p-4 bg-secondary w-full">
                        <p className="text-sm text-muted-foreground">Unique ID</p>
                        <p className="text-lg font-bold font-mono tracking-widest">{uniqueId}</p>
                    </Card>

                    {qrCodeUrl && (
                        <div className="p-4 border rounded-lg bg-white">
                           <Image src={qrCodeUrl} alt="Library Champions League QR Code" width={160} height={160} />
                        </div>
                    )}
                    
                    <div className="text-left text-xs text-muted-foreground space-y-2 mt-4 p-4 bg-secondary rounded-md">
                        <p className="font-bold text-foreground">Instructions:</p>
                        <p>1. You have to show this QR code at the main entrance hall.</p>
                        <p>2. Your entry and exit time will be noted.</p>
                        <p>3. Monthly winners will be announced on the last working day of every month.</p>
                    </div>

                    <Button onClick={resetLeagueForm} className="mt-6 w-full">
                        <Check className="mr-2 h-4 w-4" />
                        Done
                    </Button>
                </div>
            )}
        </DialogContent>
    </Dialog>
  );
}

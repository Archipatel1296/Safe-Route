"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function AccountPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserCircle className="h-20 w-20 text-primary" />
          </div>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Profile Information</h3>
              <p className="text-sm text-muted-foreground">
                Your account details and preferences will be displayed here once you&apos;re logged in.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
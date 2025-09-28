import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { KycFlow } from "./KycFlow";
import { DepositFlow } from "./DepositFlow";
import { WithdrawFlow } from "./WithdrawFlow";

export const ZkPrivacyApp = () => {
  const [activeTab, setActiveTab] = useState("kyc");

  return (
    <div className="min-h-screen bg-gradient-bg relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(45,212,191,0.03),transparent_70%)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elevated border border-glass text-sm font-medium text-muted-foreground mb-6">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
            Privacy-preserving • Regulatory compliant
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 tracking-tight">
            Privacy Pool
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Anonymous transactions with built-in compliance. Deploy your
            identity, generate proofs, and transact privately while maintaining
            regulatory requirements.
          </p>

          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary/70 rounded-full" />
              Zero-knowledge proofs
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-secondary/70 rounded-full" />
              ERC-3643 compliance
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-accent/70 rounded-full" />
              Private transactions
            </div>
          </div>
        </div>

        {/* Interface */}
        <div className="max-w-4xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-glass border border-glass backdrop-blur-sm p-1">
              <TabsTrigger
                value="kyc"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Identity Setup
              </TabsTrigger>
              <TabsTrigger
                value="deposit"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Deposit
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Withdraw
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="kyc" className="space-y-6">
                <KycFlow />
              </TabsContent>

              <TabsContent value="deposit" className="space-y-6">
                <DepositFlow />
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-6">
                <WithdrawFlow />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Pool statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="bg-glass border-glass backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-mono text-foreground">
                12.4K
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Active commitments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-mono text-foreground">
                847
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Verified identities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-glass border-glass backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-mono text-foreground">
                1.2M
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Total value (ETH)
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

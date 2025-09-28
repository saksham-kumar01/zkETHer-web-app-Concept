import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Circle,
  UserCheck,
  FileSignature,
  Shield,
} from "lucide-react";

export const KycFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeployed, setIsDeployed] = useState(false);
  const [signature, setSignature] = useState("");
  const [claimRegistered, setClaimRegistered] = useState(false);
  const { toast } = useToast();

  const handleDeployIdentity = async () => {
    setTimeout(() => {
      setIsDeployed(true);
      setCurrentStep(2);
      toast({
        title: "Identity deployed",
        description: "Your onchain identity is now active.",
      });
    }, 2000);
  };

  const handleGenerateSignature = async () => {
    setTimeout(() => {
      const mockSignature =
        "0x" +
        Array.from({ length: 128 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("");
      setSignature(mockSignature);
      setCurrentStep(3);
      toast({
        title: "Signature generated",
        description: "Ready to register compliance claim.",
      });
    }, 1500);
  };

  const handleRegisterClaim = async () => {
    setTimeout(() => {
      setClaimRegistered(true);
      toast({
        title: "Setup complete",
        description: "Identity verified and ready for transactions.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-glass border-glass backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            Identity Setup
          </CardTitle>
          <CardDescription>
            Complete regulatory compliance through verified identity deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                  ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }
                `}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`
                    w-16 h-0.5 mx-3 transition-colors
                    ${currentStep > step ? "bg-primary" : "bg-border"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="wallet" className="text-sm font-medium">
                  Connected wallet
                </Label>
                <Input
                  id="wallet"
                  value="0x742d35Cc6734C0532925a3b8D97F165b74A8d5a8"
                  readOnly
                  className="font-mono text-sm bg-elevated mt-1"
                />
              </div>
              <Button
                onClick={handleDeployIdentity}
                className="w-full"
                disabled={isDeployed}
              >
                {isDeployed ? "Identity deployed" : "Deploy identity contract"}
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Identity contract</Label>
                <Input
                  value="0x8Ba1f109551bD432803012645Hac136c05Cef4E"
                  readOnly
                  className="font-mono text-sm bg-elevated mt-1"
                />
              </div>
              <Button
                onClick={handleGenerateSignature}
                className="w-full"
                disabled={!!signature}
              >
                {signature ? "Signature generated" : "Generate proof signature"}
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Proof signature</Label>
                <div className="mt-1 p-3 bg-elevated rounded-md border">
                  <code className="text-xs font-mono text-muted-foreground break-all">
                    {signature}
                  </code>
                </div>
              </div>
              <Button
                onClick={handleRegisterClaim}
                className="w-full"
                disabled={claimRegistered}
              >
                {claimRegistered
                  ? "Claim registered"
                  : "Register compliance claim"}
              </Button>
            </div>
          )}

          {/* Completion status */}
          {claimRegistered && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium text-sm">Identity verified</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ready for anonymous transactions with regulatory compliance.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

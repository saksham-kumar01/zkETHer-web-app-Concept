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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownLeft, Key, Hash, Coins } from "lucide-react";

export const DepositFlow = () => {
  const [recipientPublicKey, setRecipientPublicKey] = useState("");
  const [amount, setAmount] = useState("");
  const [commitment, setCommitment] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const { toast } = useToast();

  const generateCommitment = async () => {
    if (!recipientPublicKey || !amount) {
      toast({
        title: "Missing Information",
        description: "Please provide both recipient's public key and amount.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate commitment generation
    setTimeout(() => {
      const mockCommitment =
        "0x" +
        Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("");
      setCommitment(mockCommitment);
      setIsGenerating(false);

      toast({
        title: "Commitment Generated",
        description: "Zero-knowledge commitment has been created successfully.",
      });
    }, 2000);
  };

  const handleDeposit = async () => {
    if (!commitment) {
      toast({
        title: "No Commitment",
        description: "Please generate a commitment first.",
        variant: "destructive",
      });
      return;
    }

    setIsDepositing(true);

    // Simulate deposit
    setTimeout(() => {
      setIsDepositing(false);
      toast({
        title: "Deposit Successful",
        description: `${amount} ETH deposited to privacy pool with commitment.`,
      });

      // Reset form
      setRecipientPublicKey("");
      setAmount("");
      setCommitment("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-glass border-glass backdrop-blur-xl shadow-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-primary" />
            Deposit to Privacy Pool
          </CardTitle>
          <CardDescription>
            Alice's Interface: Generate commitment for Bob and deposit funds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipient Public Key Input */}
          <div className="space-y-2">
            <Label htmlFor="publicKey" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Bob's Public Key
            </Label>
            <Textarea
              id="publicKey"
              placeholder="0x04a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789ab..."
              value={recipientPublicKey}
              onChange={(e) => setRecipientPublicKey(e.target.value)}
              className="font-mono text-sm min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Enter the recipient's public key to generate a commitment for them
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-mono"
            />
          </div>

          {/* Generate Commitment */}
          <div className="space-y-4">
            <Button
              onClick={generateCommitment}
              disabled={isGenerating || !recipientPublicKey || !amount}
              className="w-full bg-gradient-secondary hover:shadow-glow-secondary transition-all duration-300"
            >
              {isGenerating
                ? "Generating Commitment..."
                : "Generate ZK Commitment"}
            </Button>

            {commitment && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Generated Commitment
                </Label>
                <div className="p-3 bg-muted rounded-lg border">
                  <code className="text-xs font-mono break-all text-primary">
                    {commitment}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Zero Knowledge Proof
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Privacy Preserved
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Deposit Action */}
          {commitment && (
            <div className="space-y-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to Deposit</p>
                  <p className="text-sm text-muted-foreground">
                    Amount: {amount} ETH • Recipient:{" "}
                    {recipientPublicKey.slice(0, 16)}...
                  </p>
                </div>
              </div>

              <Button
                onClick={handleDeposit}
                disabled={isDepositing}
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
              >
                {isDepositing
                  ? "Processing Deposit..."
                  : `Deposit ${amount} ETH to Privacy Pool`}
              </Button>
            </div>
          )}

          {/* Pool Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass">
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-primary">
                12,847
              </p>
              <p className="text-xs text-muted-foreground">Total Commitments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-secondary">
                2,847.5
              </p>
              <p className="text-xs text-muted-foreground">Total Pool (ETH)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

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
import { useToast } from "@/hooks/use-toast";
import { ArrowUpRight, Search, Wallet, Eye, EyeOff } from "lucide-react";

interface NoteCommitment {
  id: string;
  amount: string;
  commitment: string;
  timestamp: string;
  status: "available" | "withdrawn";
}

export const WithdrawFlow = () => {
  const [searchKey, setSearchKey] = useState("");
  const [availableNotes, setAvailableNotes] = useState<NoteCommitment[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const { toast } = useToast();

  // Mock data for available commitments
  const mockNotes: NoteCommitment[] = [
    {
      id: "1",
      amount: "0.5",
      commitment:
        "0xa1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789ab",
      timestamp: "2024-01-15T10:30:00Z",
      status: "available",
    },
    {
      id: "2",
      amount: "1.2",
      commitment:
        "0xb2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789abc1",
      timestamp: "2024-01-14T15:45:00Z",
      status: "available",
    },
    {
      id: "3",
      amount: "0.8",
      commitment:
        "0xc3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789abcd2",
      timestamp: "2024-01-13T09:20:00Z",
      status: "available",
    },
  ];

  const searchForNotes = async () => {
    if (!searchKey) {
      toast({
        title: "Missing Private Key",
        description: "Please enter your private key to search for commitments.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    // Simulate search
    setTimeout(() => {
      setAvailableNotes(mockNotes);
      setIsSearching(false);

      toast({
        title: "Notes Found",
        description: `Found ${mockNotes.length} available commitments for withdrawal.`,
      });
    }, 2000);
  };

  const handleWithdraw = async (note: NoteCommitment) => {
    setIsWithdrawing(true);

    // Simulate withdrawal
    setTimeout(() => {
      setAvailableNotes((prev) =>
        prev.map((n) =>
          n.id === note.id ? { ...n, status: "withdrawn" as const } : n
        )
      );
      setIsWithdrawing(false);

      toast({
        title: "Withdrawal Successful",
        description: `${note.amount} ETH withdrawn successfully to your wallet.`,
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-glass border-glass backdrop-blur-xl shadow-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-primary" />
            Withdraw from Privacy Pool
          </CardTitle>
          <CardDescription>
            Bob's Interface: Discover and withdraw note commitments intended for
            you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Private Key Input */}
          <div className="space-y-2">
            <Label htmlFor="privateKey" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Your Private Key
            </Label>
            <div className="relative">
              <Input
                id="privateKey"
                type={showPrivateKey ? "text" : "password"}
                placeholder="Enter your private key to search for commitments..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="font-mono text-sm pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your private key is used locally to decrypt and identify
              commitments intended for you
            </p>
          </div>

          {/* Search Action */}
          <Button
            onClick={searchForNotes}
            disabled={isSearching || !searchKey}
            className="w-full bg-gradient-secondary hover:shadow-glow-secondary transition-all duration-300"
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching
              ? "Searching for Commitments..."
              : "Search for My Commitments"}
          </Button>

          {/* Available Notes */}
          {availableNotes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Available Commitments</h3>
                <Badge variant="secondary" className="font-mono">
                  {
                    availableNotes.filter((n) => n.status === "available")
                      .length
                  }{" "}
                  Available
                </Badge>
              </div>

              <div className="space-y-3">
                {availableNotes.map((note) => (
                  <Card key={note.id} className="bg-muted/50 border-glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                note.status === "available"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {note.amount} ETH
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {note.status === "available"
                                ? "Available"
                                : "Withdrawn"}
                            </Badge>
                          </div>
                          <p className="font-mono text-xs text-muted-foreground">
                            {note.commitment.slice(0, 32)}...
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(note.timestamp).toLocaleDateString()}
                          </p>
                        </div>

                        {note.status === "available" && (
                          <Button
                            onClick={() => handleWithdraw(note)}
                            disabled={isWithdrawing}
                            variant="default"
                            size="sm"
                            className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                          >
                            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Total Available */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Total Available to Withdraw
                  </span>
                  <span className="text-xl font-mono font-bold text-primary">
                    {availableNotes
                      .filter((n) => n.status === "available")
                      .reduce((sum, note) => sum + parseFloat(note.amount), 0)
                      .toFixed(3)}{" "}
                    ETH
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Withdrawal History */}
          {availableNotes.some((n) => n.status === "withdrawn") && (
            <div className="space-y-3 pt-4 border-t border-glass">
              <h4 className="font-medium text-muted-foreground">
                Recent Withdrawals
              </h4>
              {availableNotes
                .filter((n) => n.status === "withdrawn")
                .map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <Badge variant="secondary">{note.amount} ETH</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Withdrawn
                      </p>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {note.commitment.slice(0, 16)}...
                    </p>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

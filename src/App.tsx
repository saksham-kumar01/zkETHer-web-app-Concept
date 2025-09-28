import { Toaster } from "@/components/ui/toaster";
import "@/index.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useAccount, WagmiProvider } from "wagmi";
import { config } from "./config/config.ts";
import { Account } from "./account/account.tsx";
import { WalletOptions } from "./walletOptions/wallet-options.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TransferButton from "./components/transferButton.tsx";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button className="transfer-button">
              <TransferButton />
            </button>

            <div
              style={{
                display: "flex",
                padding: "5px",
              }}
            >
              <ConnectButton />
            </div>
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;

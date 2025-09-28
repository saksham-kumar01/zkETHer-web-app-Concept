import { createConfig, http } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "<WALLETCONNECT_PROJECT_ID>";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId,
  chains: [mainnet, sepolia, base],
  ssr: true, // set true if you use SSR (Next.js). For Vite/CRA, you can remove this.
});

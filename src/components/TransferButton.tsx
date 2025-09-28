import { useWriteContract } from "wagmi";

function TransferButton() {
  const { writeContract } = useWriteContract();

  const abi: any[] = []; // empty for now

  return (
    <button
      onClick={() =>
        writeContract({
          abi,
          address: "0xYourContractAddressHere", // replace later
          functionName: "deposit",
          args: [
            "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            123n,
          ],
        })
      }
    >
      Transfer
    </button>
  );
}

export default TransferButton;

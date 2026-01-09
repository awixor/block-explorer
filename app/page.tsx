import { publicClient } from "@/config/viem";

export default async function Home() {
  const blockNumber = await publicClient.getBlockNumber();

  const latestBlocks = [];

  for (let i = 0; i < 5; i++) {
    const block = await publicClient.getBlock({
      blockNumber: blockNumber - BigInt(i),
    });
    latestBlocks.push(block);
  }

  console.log("Current block number:", latestBlocks);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold">Latest Blocks</h1>
        <div className="flex flex-col gap-4">
          {latestBlocks.map((block) => (
            <table key={block.number}>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Block Number</td>
                  <td className="border border-gray-300 p-2">{block.number}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Block Hash</td>
                  <td className="border border-gray-300 p-2">{block.hash}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    Block Timestamp
                  </td>
                  <td className="border border-gray-300 p-2">
                    {block.timestamp}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </main>
    </div>
  );
}

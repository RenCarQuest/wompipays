"use client";

export default function Home() {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/pay", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      const newWindow = window.open();
      newWindow.document.write(data);
      newWindow.document.close();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Payment failed!");
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-2xl sm:text-3xl h-20 sm:h-24 px-8 sm:px-10"
            onClick={handlePayment}
          >
            Pagar 😈
          </button>
        </div>
      </main>
    </div>
  );
}

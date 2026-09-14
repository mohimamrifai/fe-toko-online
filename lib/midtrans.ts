export function getMidtransSnapScriptUrl() {
  const isProduction =
    process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";

  return isProduction
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
}

export function getMidtransClientKey() {
  return process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
}

export function waitForSnapReady(timeoutMs = 10000) {
  return new Promise<void>((resolve, reject) => {
    if (typeof window !== "undefined" && window.snap?.pay) {
      resolve();
      return;
    }

    const startedAt = Date.now();

    const intervalId = window.setInterval(() => {
      if (window.snap?.pay) {
        window.clearInterval(intervalId);
        resolve();
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        window.clearInterval(intervalId);
        reject(new Error("Midtrans Snap belum siap"));
      }
    }, 100);
  });
}

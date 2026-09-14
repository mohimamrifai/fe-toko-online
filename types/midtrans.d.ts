interface SnapResult {
  status_code: string;
  transaction_status: string;
  order_id: string;
  gross_amount: string;
}

interface SnapPayOptions {
  onSuccess?: (result: SnapResult) => void;
  onPending?: (result: SnapResult) => void;
  onError?: (result: SnapResult) => void;
  onClose?: () => void;
}

interface Snap {
  pay: (token: string, options?: SnapPayOptions) => void;
}

declare global {
  interface Window {
    snap?: Snap;
  }
}

export {};

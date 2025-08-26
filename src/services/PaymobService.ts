import { toast } from 'react-hot-toast';

export interface PaymobConfig {
  apiKey: string;
  secretKey: string;
  publicKey: string;
  integrationId: string;
  hmacSecret: string;
  iframeId: string;
  testMode: boolean;
  webhookUrl: string;
  successUrl: string;
  errorUrl: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderId: string;
  items?: Array<{
    name: string;
    amount: number;
    description?: string;
    quantity?: number;
  }>;
}

export interface PaymentResponse {
  success: boolean;
  paymentKey?: string;
  iframeUrl?: string;
  redirectUrl?: string;
  error?: string;
  transactionId?: string;
}

export interface WebhookPayload {
  amount_cents: number;
  created_at: string;
  currency: string;
  error_occured: boolean;
  has_parent_transaction: boolean;
  id: number;
  integration_id: number;
  is_3d_secure: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_refunded: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  order: {
    amount_cents: number;
    created_at: string;
    currency: string;
    id: number;
    items: Array<{
      name: string;
      amount_cents: number;
      description: string;
      quantity: number;
    }>;
    merchant_order_id: string;
    paid_amount_cents: number;
    shipping_data: any;
  };
  owner: number;
  pending: boolean;
  source_data: {
    pan: string;
    type: string;
    sub_type: string;
  };
  success: boolean;
}

class PaymobService {
  private config: PaymobConfig | null = null;
  private baseUrl = 'https://accept.paymob.com/api';

  setConfig(config: PaymobConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'POST', data?: any) {
    if (!this.config) {
      throw new Error('Paymob configuration not set');
    }

    const url = this.config.testMode
      ? `${this.baseUrl}${endpoint}`
      : `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data && { 'Authorization': `Bearer ${this.config.apiKey}` })
        },
        body: data ? JSON.stringify(data) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Paymob API request failed:', error);
      throw error;
    }
  }

  async authenticate(): Promise<string> {
    if (!this.config) {
      throw new Error('Paymob configuration not set');
    }

    try {
      const response = await this.makeRequest('/auth/tokens', 'POST', {
        api_key: this.config.apiKey
      });

      if (response.token) {
        return response.token;
      } else {
        throw new Error('Authentication failed - no token received');
      }
    } catch (error) {
      throw new Error('Authentication failed: ' + (error as Error).message);
    }
  }

  async createOrder(authToken: string, orderData: {
    amount: number;
    currency: string;
    merchantOrderId: string;
    items?: Array<{
      name: string;
      amount: number;
      description?: string;
      quantity?: number;
    }>;
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/ecommerce/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          auth_token: authToken,
          delivery_needed: false,
          amount_cents: Math.round(orderData.amount * 100),
          currency: orderData.currency,
          merchant_order_id: orderData.merchantOrderId,
          items: orderData.items || []
        })
      });

      if (!response.ok) {
        throw new Error(`Order creation failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error('Order creation failed: ' + (error as Error).message);
    }
  }

  async createPaymentKey(authToken: string, paymentData: {
    amount: number;
    currency: string;
    orderId: number;
    billingData: {
      email: string;
      first_name: string;
      last_name: string;
      phone_number?: string;
      country?: string;
      state?: string;
      city?: string;
      postal_code?: string;
      street?: string;
    };
  }) {
    if (!this.config) {
      throw new Error('Paymob configuration not set');
    }

    try {
      const response = await fetch(`${this.baseUrl}/acceptance/payment_keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auth_token: authToken,
          amount_cents: Math.round(paymentData.amount * 100),
          expiration: 3600,
          order_id: paymentData.orderId,
          billing_data: paymentData.billingData,
          currency: paymentData.currency,
          integration_id: parseInt(this.config.integrationId)
        })
      });

      if (!response.ok) {
        throw new Error(`Payment key creation failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error('Payment key creation failed: ' + (error as Error).message);
    }
  }

  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    if (!this.config) {
      throw new Error('Paymob configuration not set');
    }

    try {
      // Step 1: Authenticate
      const authToken = await this.authenticate();

      // Step 2: Create order
      const order = await this.createOrder(authToken, {
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        merchantOrderId: paymentRequest.orderId,
        items: paymentRequest.items
      });

      // Step 3: Create payment key
      const [firstName, ...lastNameParts] = paymentRequest.customerName.split(' ');
      const lastName = lastNameParts.join(' ') || firstName;

      const paymentKey = await this.createPaymentKey(authToken, {
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        orderId: order.id,
        billingData: {
          email: paymentRequest.customerEmail,
          first_name: firstName,
          last_name: lastName,
          phone_number: paymentRequest.customerPhone || '',
          country: 'EG',
          state: 'Cairo',
          city: 'Cairo',
          postal_code: '11311',
          street: 'N/A'
        }
      });

      // Step 4: Generate iframe URL
      const iframeUrl = this.config.testMode
        ? `https://accept.paymobsolutions.com/api/acceptance/iframes/${this.config.iframeId}?payment_token=${paymentKey.token}`
        : `https://accept.paymob.com/api/acceptance/iframes/${this.config.iframeId}?payment_token=${paymentKey.token}`;

      return {
        success: true,
        paymentKey: paymentKey.token,
        iframeUrl: iframeUrl,
        transactionId: order.id.toString()
      };

    } catch (error) {
      console.error('Payment initiation failed:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.config) {
      return { success: false, error: 'Configuration not set' };
    }

    if (!this.config.apiKey || !this.config.integrationId) {
      return { success: false, error: 'API Key and Integration ID are required' };
    }

    try {
      await this.authenticate();
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  verifyWebhook(payload: WebhookPayload, receivedHmac: string): boolean {
    if (!this.config?.hmacSecret) {
      console.warn('HMAC secret not configured');
      return false;
    }

    try {
      // Create the data string for HMAC verification
      const dataString = [
        payload.amount_cents,
        payload.created_at,
        payload.currency,
        payload.error_occured,
        payload.has_parent_transaction,
        payload.id,
        payload.integration_id,
        payload.is_3d_secure,
        payload.is_auth,
        payload.is_capture,
        payload.is_refunded,
        payload.is_standalone_payment,
        payload.is_voided,
        payload.order.amount_cents,
        payload.order.created_at,
        payload.order.currency,
        payload.order.id,
        payload.order.merchant_order_id,
        payload.order.paid_amount_cents,
        payload.owner,
        payload.pending,
        payload.source_data.pan,
        payload.source_data.sub_type,
        payload.source_data.type,
        payload.success
      ].join('');

      // Note: In a real implementation, you would use crypto.createHmac
      // This is a simplified version for demonstration
      const expectedHmac = this.calculateHmac(dataString, this.config.hmacSecret);
      
      return expectedHmac === receivedHmac;
    } catch (error) {
      console.error('Webhook verification failed:', error);
      return false;
    }
  }

  private calculateHmac(data: string, secret: string): string {
    // This is a placeholder implementation
    // In a real application, you would use a proper HMAC-SHA512 implementation
    // For example: crypto.createHmac('sha512', secret).update(data).digest('hex')
    const encoder = new TextEncoder();
    const dataArray = encoder.encode(data + secret);
    const base64 = btoa(String.fromCharCode(...dataArray));
    return 'simulated_hmac_' + base64.substring(0, 20);
  }

  generateWebhookUrl(storeId: string): string {
    return `${window.location.origin}/webhook/paymob/${storeId}`;
  }

  generateSuccessUrl(storeId: string): string {
    return `${window.location.origin}/store/${storeId}/payment/success`;
  }

  generateErrorUrl(storeId: string): string {
    return `${window.location.origin}/store/${storeId}/payment/error`;
  }

  formatAmount(amount: number, currency: string = 'EGP'): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  getPaymentMethods() {
    return [
      { id: 'card', name: 'بطاقة ائتمانية/مدينة', icon: '💳' },
      { id: 'wallet', name: 'محفظة إلكترونية', icon: '📱' },
      { id: 'bank', name: 'تحويل بنكي', icon: '🏦' },
      { id: 'cash', name: 'الدفع عند الاستلام', icon: '💵' }
    ];
  }

  getCurrencies() {
    return [
      { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
      { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
      { code: 'EUR', name: 'يورو', symbol: '€' },
      { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
      { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' }
    ];
  }
}

export const paymobService = new PaymobService();
export default PaymobService;
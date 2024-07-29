import { logger } from "./logger";

export class ProviderError extends Error {
  code: string;

  constructor({ message, code }: { message: string; code: string }) {
    super(message);
    this.code = this.setCode(code);
  }

  setCode(code: string) {
    switch (code) {
      // Teller
      case "enrollment.disconnected":
      case "enrollment.disconnected.user_action.mfa_required":
      case "enrollment.disconnected.account_locked":
      case "enrollment.disconnected.credentials_invalid":
      case "enrollment.disconnected.enrollment_inactive":
      case "enrollment.disconnected.user_action.contact_information_required":
      case "enrollment.disconnected.user_action.insufficient_permissions":
      case "enrollment.disconnected.user_action.captcha_required":
      case "enrollment.disconnected.user_action.web_login_required":

      // Plaid
      case "ITEM_LOGIN_REQUIRED":
      case "ITEM_LOCKED":
      case "ITEM_CONCURRENTLY_DELETED":
      case "ACCESS_NOT_GRANTED":
        logger("disconnected", this.message);

        return "disconnected";
      default:
        logger("unknown", this.message);

        return "unknown";
    }
  }
}

export function createErrorResponse(error: unknown, requestId: string) {
  if (error instanceof ProviderError) {
    return {
      requestId,
      message: error.message,
      code: error.code,
    };
  }

  return {
    requestId,
    message: String(error),
    code: "unknown",
  };
}

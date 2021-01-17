export enum AlertType {
    success = 'success',
    primary = 'primary',
    warning = 'warning',
    danger = 'danger',
    info = 'info',
}

export class Alert {
  constructor (
        public type: AlertType,
        public message: string,
        public timeout: number = 10
  ) {
    this.type = type
    this.message = message
    this.timeout = timeout
  }

  static success (message: string, timeout?: number): Alert {
    return new Alert(AlertType.success, message, timeout)
  }

  static danger (message: string, timeout?: number): Alert {
    return new Alert(AlertType.danger, message, timeout)
  }

  static warning (message: string, timeout?: number): Alert {
    return new Alert(AlertType.warning, message, timeout)
  }
}

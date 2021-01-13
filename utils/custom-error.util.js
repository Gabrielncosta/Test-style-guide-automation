class CustomErrorUtil extends Error {
  constructor(message, status = '', traceName) {
    super(message);
    this.status = status;
    this.traceName = traceName;
  }

  get type() {
    return this.status.toLowerCase();
  }
}

module.exports = CustomErrorUtil;

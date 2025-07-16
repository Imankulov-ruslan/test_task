export class TimestampComparator {
    static getCompareFunction(operator: string): (timestamp1: number, timestamp2: number) => boolean {
        switch (operator) {
            case "timestamp_eq":
                return this.isEqual;
            case "timestamp_gt":
                return this.isGreaterThan;
            case "timestamp_lt":
                return this.isLessThan;
            case "timestamp_gte":
                return this.isGreaterThanOrEqual;
            case "timestamp_lte":
                return this.isLessThanOrEqual;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }

  static isEqual(timestamp1: number, timestamp2: number): boolean {
    return timestamp1 === timestamp2;
  }

  static isGreaterThan(timestamp1: number, timestamp2: number): boolean {
    return timestamp1 > timestamp2;
  }

  static isLessThan(timestamp1: number, timestamp2: number): boolean {
    return timestamp1 < timestamp2;
  }

  static isGreaterThanOrEqual(timestamp1: number, timestamp2: number): boolean {
    return timestamp1 >= timestamp2;
  }

  static isLessThanOrEqual(timestamp1: number, timestamp2: number): boolean {
    return timestamp1 <= timestamp2;
  }
}
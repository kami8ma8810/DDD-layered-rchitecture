// ValueObjectの例
export class Priority {
  private constructor(private readonly value: 'low' | 'medium' | 'high') {}

  static readonly LOW = new Priority('low');
  static readonly MEDIUM = new Priority('medium');
  static readonly HIGH = new Priority('high');

  static fromString(value: string): Priority {
    switch (value.toLowerCase()) {
      case 'low': return Priority.LOW;
      case 'medium': return Priority.MEDIUM;
      case 'high': return Priority.HIGH;
      default: throw new Error('無効な優先度です');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: Priority): boolean {
    return this.value === other.value;
  }
} 
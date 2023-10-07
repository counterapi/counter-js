export class Counter {
  public ID: number;
  public Name: string;
  public Count: number;
  public CreatedAt: Date;
  public UpdatedAt: Date;

  public constructor(init?: Partial<Counter>) {
    Object.assign(this, init);
  }
}
export class Count {
  public Count: number;
  public Date: Date;

  public constructor(init?: Partial<Count>) {
    Object.assign(this, init);
  }
}

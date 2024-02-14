import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export abstract class DefaultEntity<T> extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  protected id: string;
  public props: T;

  constructor(props: T, id?: string) {
    super();
    this.props = props;
    this.id = id ?? crypto.randomUUID();
  }
}

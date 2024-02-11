import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../core/DefaultEntity";

type SessionProps = {
  createdAt: Date;
};

@Entity()
export class Session extends DefaultEntity<SessionProps> {
  @Column({ type: "timestamp" })
  createdAt: Date;

  private constructor(props: SessionProps, id?: string) {
    super(props, id);
    this.createdAt = props.createdAt;
  }

  static createNew(props: SessionProps, id?: string) {
    return new Session({ ...props, createdAt: props.createdAt ?? new Date() }, id);
  }
}

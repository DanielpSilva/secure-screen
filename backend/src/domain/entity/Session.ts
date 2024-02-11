import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../core/DefaultEntity";

type SessionProps = {
  created_at: Date;
};

@Entity()
export class Session extends DefaultEntity<SessionProps> {
  @Column()
  created_at: Date;

  private constructor(props: SessionProps, id?: string) {
    super(props, id);
    this.created_at = props?.created_at;
  }

  static createNew(props: SessionProps, id?: string) {
    return new Session({ ...props, created_at: props.created_at ?? new Date() }, id);
  }
}

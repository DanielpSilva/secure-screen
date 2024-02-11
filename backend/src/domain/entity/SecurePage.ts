import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../core/DefaultEntity";

type SecurePageProps = {
  sessionId: string;
  path: string;
  acessedAt: Date;
};

@Entity()
export class SecurePage extends DefaultEntity<SecurePageProps> {
  @Column()
  sessionId: string;

  @Column()
  path: string;

  @Column()
  acessedAt: Date;

  private constructor(props: SecurePageProps, id?: string) {
    super(props, id);
    this.sessionId = props.sessionId;
    this.path = props.path;
    this.acessedAt = props.acessedAt;
  }

  static createNew(props: SecurePageProps, id?: string) {
    const page = new SecurePage(props, id);

    return page;
  }
}

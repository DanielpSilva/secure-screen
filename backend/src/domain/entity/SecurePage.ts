import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../core/DefaultEntity";

type SecurePageProps = {
  session_id: string;
  path: string;
  accessed_at: Date;
  active: boolean;
};

@Entity()
export class SecurePage extends DefaultEntity<SecurePageProps> {
  @Column()
  session_id: string;

  @Column()
  path: string;

  @Column()
  accessed_at: Date;

  @Column()
  active: boolean;

  private constructor(props: SecurePageProps, id?: string) {
    super(props, id);
    this.session_id = props?.session_id;
    this.path = props?.path;
    this.accessed_at = props?.accessed_at;
    this.active = props?.active;
  }

  static createNew(props: SecurePageProps, id?: string) {
    return new SecurePage(props, id);
  }
}

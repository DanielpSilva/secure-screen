import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../core/DefaultEntity";

type SecureScreenAccessProps = {
  session_id: string;
  path: string;
};

@Entity()
export class SecureScreenAccess extends DefaultEntity<SecureScreenAccessProps> {
  @Column()
  session_id: string;

  @Column()
  path: string;

  @Column()
  accessed_at: Date;

  @Column()
  active: boolean = true;

  constructor(props: SecureScreenAccessProps, id?: string) {
    super(props, id);
    this.session_id = props?.session_id;
    this.path = props?.path;
    this.accessed_at = new Date();
    this.active = true;
  }

  static createNew(props: SecureScreenAccessProps, id?: string) {
    return new SecureScreenAccess(props, id);
  }

  deactivate() {
    this.active = false;
  }

  toJSON() {
    const { id, path, accessed_at, active, session_id } = this;
    return { id, path, accessed_at, active, session_id };
  }
}

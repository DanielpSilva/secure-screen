import { Entity } from "../core/domain/Entity";

type SecurePageProps = {
  sessionId: string;
  path: string;
  acessedAt: Date;
};

export class SecurePage extends Entity<SecurePageProps> {
  private constructor(props: SecurePageProps, id?: string) {
    super(props, id);
  }

  static create(props: SecurePageProps, id?: string) {
    const page = new SecurePage(props, id);

    return page;
  }
}

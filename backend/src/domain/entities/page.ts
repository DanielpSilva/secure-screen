import { Entity } from "../core/domain/Entity";

type PageProps = {
  sessionId: string;
  path: string;
  acessedAt: Date;
};

export class Page extends Entity<PageProps> {
  private constructor(props: PageProps, id?: string) {
    super(props, id);
  }

  static create(props: PageProps, id?: string) {
    const page = new Page(props, id);

    return page;
  }
}

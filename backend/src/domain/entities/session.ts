import { Entity } from "../core/domain/Entity";

type SessionProps = {
  createdAt: Date;
};

export class Session extends Entity<SessionProps> {
  private constructor(props: SessionProps, id?: string) {
    super(props, id);
  }

  static create(props: SessionProps, id?: string) {
    const session = new Session(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );

    return session;
  }
}

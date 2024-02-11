import { SecurePage } from "../../../entity/secure-page";

export interface CheckActiveSecurePageProps {
  path: string;
}

export class CheckActiveSecurePageUseCase {
  execute({ path }: CheckActiveSecurePageProps): boolean {
    const securePages = [
      SecurePage.create({
        sessionId: "abc123",
        path: "/secure-page",
        accessedAt: new Date(),
        active: true,
      }),
      SecurePage.create({
        sessionId: "def456",
        path: "/secure-page-2",
        accessedAt: new Date(),
        active: false,
      }),
      SecurePage.create({
        sessionId: "ghi789",
        path: "/secure-page-3",
        accessedAt: new Date(),
        active: true,
      }),
    ];

    const activePage = securePages.find((page) => page.props.path === path && page.props.active);

    return !!activePage;
  }
}

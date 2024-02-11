import { SecurePage } from "../../../domain/entity/SecurePage";

export interface CheckActiveSecurePageProps {
  path: string;
}

export class CheckActiveSecurePageUseCase {
  execute({ path }: CheckActiveSecurePageProps): boolean {
    const securePages = [
      SecurePage.createNew({
        session_id: "abc123",
        path: "/secure-page",
        accessed_at: new Date(),
        active: true,
      }),
      SecurePage.createNew({
        session_id: "def456",
        path: "/secure-page-2",
        accessed_at: new Date(),
        active: false,
      }),
      SecurePage.createNew({
        session_id: "ghi789",
        path: "/secure-page-3",
        accessed_at: new Date(),
        active: true,
      }),
    ];

    const activePage = securePages.find((page) => page.props.path === path && page.props.active);

    return !!activePage;
  }
}

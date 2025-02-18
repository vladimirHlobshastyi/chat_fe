import { Outlet } from '@tanstack/react-router';

export function Root() {
  return (
    <div>
      <header></header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from '@tanstack/react-router';

const RootLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

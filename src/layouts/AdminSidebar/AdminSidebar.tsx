import { Link } from '@tanstack/react-router';

const AdminSidebar = () => {
  return (
    <div className='min-w-60 h-full flex flex-col border-neutral-200 border-r-1'>
      <h2 className='p-4 bg-neutral-200'>Admin Menu</h2>
      <nav className='w-full h-full flex flex-col py-6 px-4 overflow-auto'>
        <Link className='navLink' to='/admin/transactions'>
          Transactions
        </Link>
        <Link className='navLink' to='/admin/users'>
          Users Management
        </Link>
        <Link className='navLink' to='/admin/chatters'>
          Chatter Accounts
        </Link>
        <Link className='navLink' to='/admin/gifts'>
          Gift Catalog
        </Link>
        <Link className='navLink' to='/admin/dialogs'>
          User Dialogs
        </Link>
        <Link className='navLink' to='/admin/tariffs'>
          Pricing Models
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;

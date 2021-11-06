import { FC, ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const FullContent: FC = ({ children }) => {
  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <div className="flex-grow-1 overflow-y-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default FullContent;

import { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import { LinkComponent } from 'next/link';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="mb-4">
        <h1 className="text-2xl">AI Doctor Chatbot</h1>
        <nav>
          <LinkComponent href="/">
            <a className="mr-4">Home</a>
          </LinkComponent>
          <LinkComponent href="/chat">
            <a>Chat</a>
          </LinkComponent>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="mt-4">
        <p>© {new Date().getFullYear()} AI Doctor Chatbot</p>
      </footer>
    </div>
  );
};

export default Page;

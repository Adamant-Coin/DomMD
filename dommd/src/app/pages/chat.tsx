import { ChangeEvent, FormEvent, useState } from 'react';
import Page from '../page';
import 'tailwindcss/tailwind.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Page>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="p-2 border rounded mb-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
        <p className="mt-4">{response}</p>
      </div>
    </Page>
  );
};

export default Chat;

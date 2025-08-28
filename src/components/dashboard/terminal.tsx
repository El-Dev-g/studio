
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TerminalSquare } from 'lucide-react';

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `user@skyhost:~$ ${input}`];
      
      // Simulate command execution
      if (input.trim() === 'ls -la') {
        newHistory.push(
          'total 8',
          'drwxr-xr-x 2 user user 4096 Jul 24 10:00 .',
          'drwxr-xr-x 4 user user 4096 Jul 24 09:58 ..',
          '-rw-r--r-- 1 user user  220 Jul 24 09:58 .bash_logout',
          '-rw-r--r-- 1 user user 3771 Jul 24 09:58 .bashrc',
          'drwxr-xr-x 2 user user   60 Jul 24 10:00 public_html',
        );
      } else if (input.trim() === 'pwd') {
          newHistory.push('/home/user');
      } else if (input.trim() === 'help') {
          newHistory.push('Available commands: ls -la, pwd, help, clear');
      } else if (input.trim() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (input.trim() !== '') {
          newHistory.push(`-bash: ${input}: command not found`);
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="bg-[#1e1e1e] text-white font-mono p-4 rounded-lg h-96 overflow-y-auto flex flex-col">
            <div className="flex-grow">
                {history.map((line, index) => (
                    <div key={index}>
                    {line.startsWith('user@skyhost:~$') ? (
                        <span>
                        <span className="text-green-400">user@skyhost</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-gray-400">$</span>
                        {line.substring(line.indexOf('$') + 1)}
                        </span>
                    ) : (
                        <span className="whitespace-pre-wrap">{line}</span>
                    )}
                    </div>
                ))}
                <div ref={endOfHistoryRef} />
            </div>
            <div className="flex items-center">
                <span className="text-green-400">user@skyhost</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-400">$ &nbsp;</span>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="bg-transparent border-none focus:ring-0 flex-1 text-white p-0"
                    autoFocus
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

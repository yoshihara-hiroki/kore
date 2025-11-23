'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isDeciding, setIsDeciding] = useState(false);
  const [displayOption, setDisplayOption] = useState<string>();

  // --- 💧 追加： Hydration Error 回避用 State と Effect 💧 ---
  const [placeholderText, setPlaceholderText] = useState('');

  useEffect(() => {
    // コンポーネントがブラウザで完全にロードされた後、placeholderを設定
    setPlaceholderText("Option A\nOption B\nOption C");
  }, []);

  // ルーレットのアニメーション処理
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isDeciding) {
      const options = inputText.split('\n').filter(line => line.trim() !== '');
      interval = setInterval(() => {
        const randomTemp = options[Math.floor(Math.random() * options.length)];
        setDisplayOption(randomTemp);
      }, 30);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDeciding, inputText]);

  const handleDecide = () => {
    const options = inputText.split('\n').filter(line => line.trim() !== '');
    if (options.length === 0) return;

    setIsDeciding(true);
    setResult(null);

    setTimeout(() => {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      setResult(randomOption);
      setDisplayOption(randomOption);
      setIsDeciding(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 font-sans selection:bg-black selection:text-white">
      <div className="w-full max-w-sm flex flex-col h-[85vh] justify-between">

        {/* ヘッダー */}
        <header className="pt-6 text-center">
          <h1 className="text-4xl font-black tracking-widest text-black">
            コレ。
          </h1>
          <p className="text-xs text-gray-400 font-medium tracking-wider">
            ～ランダム決定ツール～
          </p>
        </header>

        {/* メインエリア */}
        <main className="flex-grow flex flex-col items-center justify-center py-4">
          <AnimatePresence mode="wait">
            {result && !isDeciding ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center w-full"
              >
                <div className="w-full border-t-2 border-b-2 border-black py-12">
                  <p className="text-5xl font-black tracking-tighter break-words leading-tight">
                    {result}
                  </p>
                </div>
              </motion.div>
            ) : isDeciding ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <div className="w-full border-t border-b border-gray-100 py-12">
                  <p className="text-5xl font-bold text-gray-300 blur-[2px] tracking-tighter animate-pulse">
                    {displayOption}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-6xl font-thin text-gray-100 tracking-tighter select-none">
                  READY?
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* 入力とボタンエリア：視認性を向上 */}
        <footer className="space-y-6 pb-4 w-full">

          <div className="relative group">
            {/* ラベルを追加：ここに入力するんだと伝える */}
            <label className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2 ml-1">
              Enter Choices
            </label>

            {/* 枠線を少し強調（border-b-2, border-gray-300） */}
            <Textarea
              className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:border-black rounded-none px-1 py-2 resize-none text-xl text-black placeholder:text-gray-300 transition-all duration-300 min-h-[100px] focus:ring-0"
              // プレースホルダーをシンプルに
              placeholder="選択肢はここに改行区切りで入力してください。"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              spellCheck={false}
            />
          </div>

          <Button
            onClick={handleDecide}
            disabled={isDeciding || !inputText}
            className="w-full h-16 rounded-none bg-black text-white hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-sm font-bold tracking-[0.2em] disabled:opacity-30 disabled:hover:scale-100"
          >
            {isDeciding ? 'PROCESSING...' : 'DECIDE'}
          </Button>
        </footer>
      </div>
    </div>
  );
}
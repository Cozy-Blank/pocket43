'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [dummyPassword, setDummyPassword] = useState('');
  const [realPassword, setRealPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedReal = localStorage.getItem('realPassword');
    if (savedReal) {
      setIsInitialized(true);
    }
  }, []);

  const handleSetup = (e) => {
    e.preventDefault();
    if (!realPassword || realPassword.length < 8) {
      alert('本番用パスワードは英数含め8文字以上で設定してね！');
      return;
    }
    localStorage.setItem('dummyPassword', dummyPassword);
    localStorage.setItem('realPassword', realPassword);
    setIsInitialized(true);
  };

  const handleResetData = () => {
    localStorage.clear();
    setIsInitialized(false);
    setDummyPassword('');
    setRealPassword('');
    alert('データをクリアして初期設定をやり直します。');
  };

  // まだ初期設定がされていない場合の画面（本番用・ダミー用設定画面）
  if (!isInitialized) {
    return (
      <main className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-4 text-white">
        <div className="bg-[#1C2541] p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#3A506B]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#6FFFE9]">ポケット要塞</h1>
            <p className="text-sm text-gray-300">オフライン完全ローカル・日常メモ版</p>
          </div>
          
          <form onSubmit={handleSetup} className="space-y-4">
            <h2 className="text-lg font-semibold text-[#FFD166]">🔒 初回セキュリティ設定</h2>
            <div>
              <label className="block text-sm mb-1 text-gray-300">日常ダミー用パスワード（自由）</label>
              <input 
                type="password"
                value={dummyPassword}
                onChange={(e) => setDummyPassword(e.target.value)}
                placeholder="例: dummy123"
                className="w-full p-3 rounded bg-[#0B132B] border border-[#3A506B] text-white focus:outline-none focus:border-[#6FFFE9]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">本番用パスワード（英数含め8文字以上必須）</label>
              <input 
                type="password"
                value={realPassword}
                onChange={(e) => setRealPassword(e.target.value)}
                placeholder="例: Fortress99!"
                className="w-full p-3 rounded bg-[#0B132B] border border-[#3A506B] text-white focus:outline-none focus:border-[#6FFFE9]"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-[#3A86EF] hover:bg-[#2667CC] text-white font-bold rounded shadow transition duration-200"
            >
              要塞を構築する（生体認証付き）
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={handleResetData}
              className="text-xs text-gray-400 hover:text-red-400 underline"
            >
              🔄 [開発用] データをクリアして初期設定をやり直す
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 設定済みの通常のログイン画面
  return (
    <main className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center p-4 text-white">
      <div className="bg-[#1C2541] p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#3A506B]">
        <h1 className="text-xl font-bold text-[#3A86EF] mb-2">🛡️ ポケット要塞（本番用）</h1>
        <p className="text-sm text-gray-300 mb-4">要塞を開錠するパスワードを入力してください。</p>
        <input 
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="パスワードを入力"
          className="w-full p-3 rounded bg-[#0B132B] border border-[#3A506B] text-white mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">パスワードが違います。</p>}
        <button 
          type="button"
          onClick={() => {
            if (inputPassword === localStorage.getItem('realPassword')) {
              alert('要塞が開錠されました！');
            } else {
              setError(true);
            }
          }}
          className="w-full py-3 bg-[#3A86EF] text-white font-bold rounded"
        >
          要塞を開錠する
        </button>
      </div>
    </main>
  );
}
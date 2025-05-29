import React, { useState } from 'react';

function KeywordReplacer() {
    const [keyword1, setKeyword1] = useState('');
    const [keyword2, setKeyword2] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const handleReplace = () => {
        // Dùng RegExp để thay tất cả (g: global), không phân biệt hoa thường (i: insensitive)
        const regex = new RegExp(keyword1, 'gi');
        const replacedText = text.replace(regex, keyword2);
        setResult(replacedText);
    };

    return (
        <div className="w-full mx-auto mt-10 p-4 border rounded shadow space-y-4">
            <h1 className="text-xl font-bold">Thay thế từ khóa trong đoạn văn</h1>

            <div>
                <label className="block font-medium">Từ khóa 1 (cần tìm):</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={keyword1}
                    onChange={(e) => setKeyword1(e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium">Từ khóa 2 (thay thế):</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={keyword2}
                    onChange={(e) => setKeyword2(e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium">Đoạn văn bản:</label>
                <textarea
                    className="w-full p-2 border rounded"
                    rows="5"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleReplace}
            >
                Run
            </button>

            {result && (
                <div className="mt-4">
                    <h2 className="font-semibold">Kết quả:</h2>
                    <div className="whitespace-pre-wrap p-2 border rounded bg-gray-100">{result}</div>
                </div>
            )}
        </div>
    );
}

export default KeywordReplacer;

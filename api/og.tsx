import React from 'react';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '20px',
          }}
        >
          DDD学習用Todoアプリ
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#64748b',
          }}
        >
          ドメイン駆動設計を実践的に学ぶ
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 
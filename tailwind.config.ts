import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#2563eb",        // メインの青
        "primary-content": "#ffffff",
        "secondary": "#0ea5e9",      // 明るい青
        "secondary-content": "#ffffff",
        "accent": "#3b82f6",         // アクセントの青
        "neutral": "#1e293b",        // ダークグレー
        "base-100": "#ffffff",
        "base-200": "#f1f5f9",
        "base-300": "#e2e8f0",
        "success": "#10b981",        // 緑
        "warning": "#f59e0b",        // オレンジ
        "error": "#ef4444",          // 赤
        "info": "#3b82f6",           // 情報用の青

        "--rounded-box": "1.5rem",
        "--rounded-btn": "1.5rem",
        "--rounded-badge": "2rem",
        "--animation-btn": "0.3s",
        "--animation-input": "0.3s",
        "--btn-focus-scale": "0.95",
        "--border-btn": "2px",
        "--tab-border": "2px",
        "--tab-radius": "1.5rem",
      },
    }],
  },
} satisfies Config; 
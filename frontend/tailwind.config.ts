@custom-variant dark (&:is(.dark *));

:root {
  --bg-primary: #f8fafc;
  --bg-header-start: #6366f1;
  --bg-header-end: #8b5cf6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #6366f1;
  --user-bubble: #6366f1;
  --agent-bubble: #ffffff;
  --border-color: #e2e8f0;
}

@theme inline {
  --color-background: var(--bg-primary);
  --color-header-start: var(--bg-header-start);
  --color-header-end: var(--bg-header-end);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-accent: var(--accent);
  --color-user-bubble: var(--user-bubble);
  --color-agent-bubble: var(--agent-bubble);
  --color-border: var(--border-color);
}

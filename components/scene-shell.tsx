import type { SignalState } from '@/lib/motion';

type SceneShellProps = Readonly<{
  id: string;
  state: SignalState;
  children: React.ReactNode;
  className?: string;
}>;

export function SceneShell({ id, state, children, className = '' }: SceneShellProps) {
  return (
    <section id={id} className={`scene-shell ${className}`} data-scene={id} data-signal-state={state}>
      <div className="scene-shell__inner">{children}</div>
    </section>
  );
}

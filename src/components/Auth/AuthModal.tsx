import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Crown } from 'lucide-react';
import ModalShell from '@/components/UI/ModalShell';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setSubmitting(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    if (error) {
      setError(error);
      setSubmitting(false);
      return;
    }
    reset();
    onClose();
  };

  const switchMode = (m: 'signin' | 'signup') => {
    setMode(m);
    setError(null);
  };

  return (
    <ModalShell
      open={open}
      onClose={handleClose}
      title={mode === 'signin' ? 'Sign In' : 'Create Account'}
      subtitle={
        mode === 'signin'
          ? 'Enter the royal court to manage your events'
          : 'Join the realm to save events and host your own'
      }
      maxWidth="max-w-md"
    >
      {/* Mode toggle */}
      <div className="mb-6 flex rounded-xl border border-royal-gold/30 bg-royal-black/40 p-1">
        <button
          type="button"
          onClick={() => switchMode('signin')}
          className={`flex-1 rounded-lg px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
            mode === 'signin'
              ? 'bg-gradient-to-r from-royal-gold-deep to-royal-gold text-royal-black'
              : 'text-royal-beige hover:text-royal-ivory'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => switchMode('signup')}
          className={`flex-1 rounded-lg px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
            mode === 'signup'
              ? 'bg-gradient-to-r from-royal-gold-deep to-royal-gold text-royal-black'
              : 'text-royal-beige hover:text-royal-ivory'
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          icon={Mail}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@realm.com"
          required
        />
        <Field
          icon={Lock}
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="At least 6 characters"
          required
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-2.5 font-serif text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-royal-gold-deep via-royal-gold to-royal-gold-bright px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.15em] text-royal-black shadow-gold-glow disabled:opacity-60"
        >
          <Crown className="h-4 w-4" />
          {submitting
            ? 'Entering the realm…'
            : mode === 'signin'
              ? 'Enter the Court'
              : 'Join the Realm'}
        </motion.button>
      </form>

      <p className="mt-5 text-center font-serif text-xs italic text-royal-beige">
        {mode === 'signin' ? (
          <>
            No royal title yet?{' '}
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className="text-royal-gold-bright underline-offset-2 hover:underline"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already a noble of the court?{' '}
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className="text-royal-gold-bright underline-offset-2 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </ModalShell>
  );
}

function Field({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: typeof Mail;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-serif text-sm italic text-royal-beige">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-royal-gold/30 bg-royal-black/40 px-4 py-3 focus-within:border-royal-gold/60">
        <Icon className="h-4 w-4 shrink-0 text-royal-gold" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-transparent font-serif text-base text-royal-ivory placeholder:font-serif placeholder:italic placeholder:text-royal-beige/50 focus:outline-none"
        />
      </div>
    </label>
  );
}

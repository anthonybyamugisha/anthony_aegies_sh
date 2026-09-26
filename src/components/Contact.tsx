import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  ArrowUpRight,
  Lock,
  Terminal,
  AlertCircle,
} from 'lucide-react';
import Reveal from './ui/Reveal';
import ActionButton from './ui/ActionButton';
import { site, contactChannels } from '../config/site.data';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAILJS_SERVICE_ID = String(import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '');
const EMAILJS_TEMPLATE_ID = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '');
const EMAILJS_PUBLIC_KEY = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '');

const isEmailJsConfigured =
  EMAILJS_SERVICE_ID !== '' && EMAILJS_TEMPLATE_ID !== '' && EMAILJS_PUBLIC_KEY !== '';

/**
 * Vite inlines VITE_* at build time, so a malformed value ships silently and
 * only fails when a real visitor submits the form. These checks catch the two
 * mistakes that actually happen: pasting a project/folder name instead of the
 * service ID, and truncating the public key.
 */
const EMAILJS_ID_ISSUES: string[] = [
  EMAILJS_SERVICE_ID !== '' && !EMAILJS_SERVICE_ID.startsWith('service_')
    ? `VITE_EMAILJS_SERVICE_ID ("${EMAILJS_SERVICE_ID}") does not start with "service_". ` +
      'Copy the Service ID from EmailJS > Email Services, not the project name.'
    : '',
  EMAILJS_TEMPLATE_ID !== '' && !EMAILJS_TEMPLATE_ID.startsWith('template_')
    ? `VITE_EMAILJS_TEMPLATE_ID ("${EMAILJS_TEMPLATE_ID}") does not start with "template_".`
    : '',
  EMAILJS_PUBLIC_KEY !== '' && EMAILJS_PUBLIC_KEY.length < 40
    ? `VITE_EMAILJS_PUBLIC_KEY is only ${EMAILJS_PUBLIC_KEY.length} characters; ` +
      'EmailJS public keys are around 64. Copy the whole key from EmailJS > Account.'
    : '',
].filter(Boolean);

if (import.meta.env.DEV && EMAILJS_ID_ISSUES.length > 0) {
  console.error(
    '[contact] EmailJS configuration looks invalid:\n' +
      EMAILJS_ID_ISSUES.map((issue) => `  - ${issue}`).join('\n'),
  );
}

const isLocal = (href: string) => /^(mailto:|tel:)/.test(href);

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
};

interface ContactProps {
  index?: string;
}

const Contact = ({ index = '07' }: ContactProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!isEmailJsConfigured) {
      setSubmitStatus('error');
      return;
    }

    // Honeypot: bots fill hidden fields, humans never see this one.
    const honeypot = formRef.current.elements.namedItem('company_website') as HTMLInputElement | null;
    if (honeypot && honeypot.value !== '') {
      setSubmitStatus('success');
      formRef.current.reset();
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitStatus('success');
      setValues({ name: '', email: '', message: '' });
      formRef.current.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoHref = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry from ${site.name}`)}`
    : '';

  const field =
    'w-full bg-base-800 border border-neon/15 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-700 focus:outline-none focus:border-neon/60 focus:shadow-neon';

  return (
    <section id="contact" className="py-24">
      <div className="px-6 sm:px-9">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <p className="flex items-center gap-2 text-xs text-neon">
              <span className="text-gray-600">{index}</span>
              <span className="w-6 h-px bg-neon/40" />
              <span>contact</span>
              <span className="animate-blink">_</span>
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gray-100">
              Get In Touch
            </h2>

            <p className="mt-3 max-w-xl text-sm text-gray-500">
              Open to security operations, log analysis and data reporting work. Send a message and
              I&apos;ll get back to you.
            </p>
          </Reveal>

          <div className="grid items-start gap-6 md:grid-cols-2">
            <Reveal>
              <div className="hud-panel flex h-full flex-col">
                <div className="flex items-center gap-3 border-b border-neon/10 px-5 py-3">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neon/30" />
                    <span className="w-1.5 h-1.5 bg-neon/20" />
                    <span className="w-1.5 h-1.5 bg-neon/10" />
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-neon/60" strokeWidth={1.5} />
                  <span className="text-xs text-neon truncate">
                    &gt;_ ./contact.sh --list
                  </span>
                </div>

                <div className="flex-1 px-5 py-2">
                  {contactChannels.map(({ id, label, value, href, icon: Icon }) => (
                    <a
                      key={id}
                      href={href}
                      {...(isLocal(href)
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group flex items-center gap-3 border-b border-neon/5 py-3.5 last:border-0"
                    >
                      <span className="flex w-8 h-8 shrink-0 items-center justify-center border border-neon/20 text-neon transition-colors duration-300 group-hover:bg-neon/10">
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </span>

                      <span className="min-w-0">
                        <span className="block hud-label">{label}</span>
                        <span className="block truncate text-sm text-gray-300 transition-colors duration-300 group-hover:text-neon">
                          {value}
                        </span>
                      </span>

                      <ArrowUpRight
                        className="ml-auto w-3.5 h-3.5 shrink-0 text-neon opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-neon/10 px-5 py-3">
                  <Lock className="w-3.5 h-3.5 text-neon/70" strokeWidth={1.5} />
                  <span className="text-[11px] text-gray-500">
                    Secure Communication
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {isEmailJsConfigured ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="hud-panel p-6 space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="hud-label block mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="your name"
                      aria-invalid={Boolean(errors.name)}
                      className={`${field} ${errors.name ? 'border-red-500/60' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="hud-label block mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`${field} ${errors.email ? 'border-red-500/60' : ''}`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="hud-label block mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      placeholder="what is this about?"
                      rows={5}
                      aria-invalid={Boolean(errors.message)}
                      className={`${field} resize-none ${
                        errors.message ? 'border-red-500/60' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor="company_website">Company website</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <ActionButton
                    type="submit"
                    label={isSubmitting ? 'sending' : 'send message'}
                    icon={Send}
                    disabled={isSubmitting}
                    className="w-full"
                  />

                  {submitStatus === 'success' && (
                    <p className="text-center text-xs text-neon">
                      &gt;_ message sent successfully
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-center text-xs text-red-400">
                      &gt;_ transmission failed, try again
                    </p>
                  )}

                  <p className="pt-1 text-center text-[11px] leading-relaxed text-gray-600">
                    Your details are only used to reply to this message. Nothing is stored or
                    shared.
                  </p>
                </form>
              ) : (
                <div className="hud-panel flex h-full flex-col p-6">
                  <div className="flex flex-1 flex-col justify-center gap-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="w-4 h-4 shrink-0 mt-0.5 text-amber-400/80"
                        strokeWidth={1.5}
                      />
                      <p className="text-sm leading-relaxed text-gray-500">
                        This site was built without the contact form credentials, so
                        messages can't be sent from here. Email{' '}
                        <span className="text-gray-400">{site.firstName}</span> directly
                        instead.
                      </p>
                    </div>

                    {mailtoHref ? (
                      <ActionButton
                        label={`email ${site.firstName.toLowerCase()}`}
                        href={mailtoHref}
                        icon={Mail}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-xs text-gray-700">
                        &gt;_ add an email address in src/config/site.data.ts
                      </p>
                    )}
                  </div>

                  <p className="pt-5 text-center text-[11px] leading-relaxed text-gray-600">
                    Your details are only used to reply to this message. Nothing is stored or
                    shared.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

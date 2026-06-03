import { useCallback, useId, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '../ui/Button'
import { getEmailJsConfig } from '../../lib/emailjs'
import { cn } from '../../lib/cn'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validators = {
  from_name: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Name is required.'
    if (trimmed.length < 2) return 'Name must be at least 2 characters.'
    return ''
  },
  reply_to: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Email is required.'
    if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address.'
    return ''
  },
  message: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Message is required.'
    if (trimmed.length < 10) return 'Message must be at least 10 characters.'
    return ''
  },
}

const inputClassName =
  'w-full min-h-11 rounded-lg border border-border bg-[var(--surface)] px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60'

function FormField({
  id,
  label,
  name,
  type = 'text',
  value,
  error,
  disabled,
  onChange,
  onBlur,
  as = 'input',
  rows = 5,
}) {
  const errorId = `${id}-error`
  const describedBy = error ? errorId : undefined
  const sharedProps = {
    id,
    name,
    value,
    disabled,
    onChange,
    onBlur,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: cn(inputClassName, error && 'border-red-400/60 focus:border-red-400/60 focus:ring-red-400/30'),
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea {...sharedProps} rows={rows} />
      ) : (
        <input {...sharedProps} type={type} autoComplete={name === 'reply_to' ? 'email' : name === 'from_name' ? 'name' : undefined} />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const formId = useId()
  const statusId = `${formId}-status`
  const formRef = useRef(null)
  const [values, setValues] = useState({
    from_name: '',
    reply_to: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  const validateField = useCallback((name, value) => validators[name]?.(value) ?? '', [])

  const validateAll = useCallback(() => {
    const next = {}
    for (const key of Object.keys(validators)) {
      const message = validateField(key, values[key])
      if (message) next[key] = message
    }
    setErrors(next)
    setTouched({ from_name: true, reply_to: true, message: true })
    return Object.keys(next).length === 0
  }, [validateField, values])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
    if (formError) setFormError('')
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return

    const { serviceId, templateId, publicKey } = getEmailJsConfig()
    setStatus('submitting')
    setFormError('')

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      })
      setStatus('success')
      setValues({ from_name: '', reply_to: '', message: '' })
      setErrors({})
      setTouched({})
      formRef.current?.reset()
    } catch {
      setStatus('error')
      setFormError('Something went wrong. Please try again or email directly.')
    }
  }

  const isSubmitting = status === 'submitting'
  const isSuccess = status === 'success'

  if (isSuccess) {
    return (
      <div
        className="surface-card p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-medium text-foreground">Message sent</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thanks for reaching out. I will get back to you soon.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="surface-card space-y-5 p-6 sm:p-8"
      aria-describedby={formError ? statusId : undefined}
    >
      <FormField
        id={`${formId}-name`}
        label="Name"
        name="from_name"
        value={values.from_name}
        error={touched.from_name ? errors.from_name : ''}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormField
        id={`${formId}-email`}
        label="Email"
        name="reply_to"
        type="email"
        value={values.reply_to}
        error={touched.reply_to ? errors.reply_to : ''}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormField
        id={`${formId}-message`}
        label="Message"
        name="message"
        as="textarea"
        value={values.message}
        error={touched.message ? errors.message : ''}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {formError ? (
        <p id={statusId} className="text-sm text-red-400" role="alert">
          {formError}
        </p>
      ) : null}

      <div aria-live="polite" className="sr-only">
        {isSubmitting ? 'Sending message…' : ''}
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}

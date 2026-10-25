'use client';

import { useState } from 'react';
import contact from '@/config/contact.json';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function TelegramInvitation() {
  const [message, setMessage] = useState('Copy the handle and find the artist in Telegram.');

  async function copyHandle() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(contact.handle);
      copied = true;
    } catch {
      try {
        const field = document.createElement('textarea');
        field.value = contact.handle;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand('copy');
        field.remove();
      } catch {
        copied = false;
      }
    }

    setMessage(copied
      ? `${contact.handle} copied. Open Telegram and search for this handle.`
      : `Select ${contact.handle} above and search for it in Telegram.`);
  }

  return (
    <section className="invitation" id="contact" aria-labelledby="invitation-title">
      <div className="invitation-image" aria-hidden="true">
        <ResponsiveImage image={{ id: 'one', alt: '' }} sizes="(max-width: 560px) 70vw, 34vw" />
      </div>
      <div className="invitation-copy">
        <p className="overline">After the looking</p>
        <h2 id="invitation-title">If something<br /><em>stays with you,</em><br />let’s talk.</h2>
        <button className="telegram-link" type="button" onClick={copyHandle}>
          <span>Copy Telegram handle</span><b aria-hidden="true">↗</b>
        </button>
        <p className="telegram-handle">{contact.handle}</p>
        <p className="telegram-fallback" role="status" aria-live="polite">{message}</p>
      </div>
      <footer className="footer">
        <span>RESILIENT EXPLORATIONS / 2026</span>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
    </section>
  );
}

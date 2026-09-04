import { useEffect } from 'react';

/**
 * Custom hook to update document title and description meta tag on route mount.
 * Pure DOM implementation without third-party helmet dependencies.
 *
 * @param {string} title - Page title
 * @param {string} [description] - Meta description
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const formattedTitle = title ? `${title} — FINDIA` : 'FINDIA — India Urban Telemetry & Navigation';
    document.title = formattedTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [title, description]);
}

export default usePageMeta;

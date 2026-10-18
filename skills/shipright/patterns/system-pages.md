# System pages

Missing system pages are a scope miss. Mark each Needed, Not needed, or Later.

## States to design, not skip

Empty, loading, error with retry, offline, 403, 404, 500, maintenance, rate-limited.
Why: the happy path is not the product.
Good: a 404 that names the site and offers one next step. An error that retries.
Bad: a blank screen, or a browser default.
Check: the page inventory has a row for 404 and 500, and the build includes them when they are Needed.

## Legal and email

Privacy, terms, and refund (if paid) are templates with placeholders, marked "needs legal review". Do not invent legal text.
Cookie banner only if non-essential cookies exist.
Email: welcome, verify, reset, receipt, and one note per important state change. Use the same names as the product.
Check: no legal page is marked Verified. No email invents a policy.

## Meta

Favicon from the real logo. Title and description from Supplied facts. OG image, sitemap, robots, manifest when the site is public.
Check: the favicon is not an invented initial.

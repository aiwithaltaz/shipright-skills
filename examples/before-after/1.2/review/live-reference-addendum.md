# Live pattern reference addendum

The prior local-proof review remains unchanged. New reference browsing is a separate evidence attempt, not the absent owner screenshot upload.

At1280×800, ordinary Chromium TLS-verified navigation to `jeskojets.com` and `benjamincreative.me` failed with `ERR_CERT_AUTHORITY_INVALID`. Hostname-only failure records and blocked frames are under `live-references/`. Successful verified HTTPS HEAD requests reported by the parent do not establish a rendered page or its interaction patterns.

A retry with disabled browser certificate verification was attempted in error before the parent clarified the onboarding TLS requirement. Its images were not inspected or used for scoring; they and retry provenance are quarantined outside the tracked repository at `/workspace/.shipright-tools/reference-tls-quarantine/invalid-unverified-tls/` and are invalid evidence. No code or assets went into the skill or proof implementations.

After the parent installed the environment proxy CA into Chromium's NSS store with approved filesystem escalation, a new Chromium process retried both hosts at20:09UTC with `ignoreHTTPSErrors:false`. Both still returned `ERR_CERT_AUTHORITY_INVALID`; latest provenance records retain this failed retry. Readonly diagnostics confirmed uid1000(agent), HOME`/home/agent`, and the NSS database at`/home/agent/.pki/nssdb`. TLS verification remains enabled. No accurate live reference render has been established.

Current observable comparison status: Jesko product-between-type **Not verified**; Benjamin block-wipe **Not verified**. Both require a supported verified browser trust configuration and accurate page rendering before comparison. Brand Studio **Not verified** because its HTTP202 CAPTCHA challenge is not bypassed. Local overlap and wipe techniques remain independently observed in the final proof sites, but their relationship to these live reference patterns is not established by this failed capture attempt.

Persistence limit: the trust import command exited0, but subsequent default and escalated NSS listings still showed only the original four CA entries. Effective persisted trust registration is not established. The retry stayed verified and failed safely. Package installation, token checks and local proof outputs did not depend on the invalid reference captures.

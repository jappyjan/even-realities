import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import QRCode from 'qrcode';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Select,
  Text,
  Textarea,
} from '@jappyjan/even-realities-ui';

import { supabase } from '../lib/supabaseClient';

type AppRecord = {
  id: string;
  owner_id: string;
  name: string;
  url: string;
  description: string;
  thumbnail_path: string;
  tags: string[] | null;
  created_at: string;
};

type AppItem = AppRecord & {
  thumbnail_url: string;
  tags: string[];
};

const legalDisclaimer =
  'Uneven Hub is an independent community project and is not affiliated with Even Realities. We do not review, control, or take responsibility for third-party app content, and all app content is the responsibility of its creators.';

export function App() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [session, setSession] = useState<Session | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appName, setAppName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appTags, setAppTags] = useState('');
  const [appThumbnail, setAppThumbnail] = useState<File | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<{ id: string; message: string } | null>(
    null,
  );

  const loadApps = async () => {
    setIsLoading(true);
    setLoadError(null);
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setLoadError(error.message);
      setIsLoading(false);
      return;
    }

    const normalizedApps: AppItem[] = (data ?? []).map((app) => {
      const thumbnailUrl = supabase.storage
        .from('app-thumbnails')
        .getPublicUrl(app.thumbnail_path).data.publicUrl;

      return {
        ...app,
        thumbnail_url: thumbnailUrl,
        tags: (app.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
      };
    });

    setApps(normalizedApps);
    setIsLoading(false);
  };

  useEffect(() => {
    loadApps();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    apps.forEach((app) => {
      app.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [apps]);

  const filteredApps = useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();
    return apps.filter((app) => {
      const matchesSearch =
        !searchLower ||
        app.name.toLowerCase().includes(searchLower) ||
        app.description.toLowerCase().includes(searchLower);

      const matchesTag =
        tagFilter === 'all' || app.tags.some((tag) => tag === tagFilter);

      return matchesSearch && matchesTag;
    });
  }, [apps, searchTerm, tagFilter]);

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthStatus(null);

    const email = authEmail.trim();
    if (!email) {
      setAuthStatus('Please enter an email address.');
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setAuthStatus(error.message);
      return;
    }

    setAuthStatus('Magic link sent. Check your inbox to sign in.');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthStatus('Signed out.');
  };

  const handleSubmitApp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) {
      setFormError('Sign in to submit an app.');
      return;
    }

    setFormError(null);
    setFormSuccess(null);

    const trimmedName = appName.trim();
    const trimmedUrl = appUrl.trim();
    const trimmedDescription = appDescription.trim();
    const tags = appTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!trimmedName || !trimmedUrl || !trimmedDescription) {
      setFormError('Name, URL, and description are required.');
      return;
    }

    if (!appThumbnail) {
      setFormError('Please upload a thumbnail image.');
      return;
    }

    setIsSubmitting(true);
    const fileExt = appThumbnail.name.split('.').pop() || 'png';
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${session.user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('app-thumbnails')
      .upload(filePath, appThumbnail, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      setIsSubmitting(false);
      setFormError(uploadError.message);
      return;
    }

    const { data, error } = await supabase
      .from('apps')
      .insert({
        owner_id: session.user.id,
        name: trimmedName,
        url: trimmedUrl,
        description: trimmedDescription,
        thumbnail_path: filePath,
        tags,
      })
      .select('*')
      .single();

    if (error || !data) {
      setIsSubmitting(false);
      setFormError(error?.message ?? 'Unable to create app.');
      return;
    }

    const thumbnailUrl = supabase.storage
      .from('app-thumbnails')
      .getPublicUrl(filePath).data.publicUrl;

    setApps((current) => [
      {
        ...data,
        thumbnail_url: thumbnailUrl,
        tags: (data.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
      },
      ...current,
    ]);

    setAppName('');
    setAppUrl('');
    setAppDescription('');
    setAppTags('');
    setAppThumbnail(null);
    setFormSuccess('App submitted. Thanks for sharing!');
    setIsSubmitting(false);
  };

  const handleOpenInstall = async (app: AppItem) => {
    setSelectedApp(app);
    setQrLoading(true);
    setQrDataUrl(null);
    try {
      const url = await QRCode.toDataURL(app.url, { margin: 1, width: 220 });
      setQrDataUrl(url);
    } finally {
      setQrLoading(false);
    }
  };

  const handleCloseInstall = () => {
    setSelectedApp(null);
    setQrDataUrl(null);
  };

  const handleDeleteApp = async (app: AppItem) => {
    if (!session) {
      setDeleteError({ id: app.id, message: 'Sign in to delete your app.' });
      return;
    }

    const confirmed = window.confirm(
      `Delete "${app.name}"? This removes the app listing and thumbnail.`,
    );
    if (!confirmed) {
      return;
    }

    setDeletingId(app.id);
    setDeleteError(null);

    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', app.id)
      .eq('owner_id', session.user.id);

    if (error) {
      setDeletingId(null);
      setDeleteError({ id: app.id, message: error.message });
      return;
    }

    const { error: storageError } = await supabase.storage
      .from('app-thumbnails')
      .remove([app.thumbnail_path]);

    if (storageError) {
      setDeleteError({
        id: app.id,
        message: `App deleted, but thumbnail cleanup failed: ${storageError.message}`,
      });
    }

    setApps((current) => current.filter((item) => item.id !== app.id));
    if (selectedApp?.id === app.id) {
      handleCloseInstall();
    }
    setDeletingId(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__title">
          <Text as="h1" variant="title-xl">
            Uneven Hub
          </Text>
          <Text as="p" variant="body-2" className="app-subtitle">
            A community app store for Even Realities-compatible web apps.
          </Text>
        </div>
        <div className="app-auth">
          {session ? (
            <div className="auth-signed-in">
              <Text as="p" variant="detail">
                Signed in as {session.user.email ?? 'user'}
              </Text>
              <Button variant="default" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
              {authStatus && (
                <Text as="p" variant="detail" className="status-text">
                  {authStatus}
                </Text>
              )}
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <Input
                type="email"
                placeholder="Email for magic link"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
                aria-label="Email address"
              />
              <Button variant="primary" size="sm" type="submit">
                Send magic link
              </Button>
              {authStatus && (
                <Text as="p" variant="detail" className="status-text">
                  {authStatus}
                </Text>
              )}
            </form>
          )}
        </div>
      </header>

      <Card>
        <CardContent>
          <div className="toolbar">
            <Input
              placeholder="Search apps"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search apps"
            />
            <Select
              value={tagFilter}
              onChange={(event) => setTagFilter(event.target.value)}
              aria-label="Filter by tag"
            >
              <option value="all">All tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
            <Button variant="accent" size="sm" onClick={loadApps}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      <Divider />

      <section className="app-grid-section">
        <div className="section-header">
          <Text as="h2" variant="title-1">
            Apps
          </Text>
          <Text as="p" variant="detail">
            {filteredApps.length} of {apps.length} apps
          </Text>
        </div>
        {isLoading ? (
          <Text as="p" variant="body-2">
            Loading apps...
          </Text>
        ) : loadError ? (
          <Text as="p" variant="body-2" className="status-error">
            {loadError}
          </Text>
        ) : filteredApps.length === 0 ? (
          <Text as="p" variant="body-2">
            No apps match your search yet.
          </Text>
        ) : (
          <div className="app-grid">
            {filteredApps.map((app) => (
              <Card key={app.id} className="app-card">
                <CardHeader>
                  <Text as="h3" variant="title-2">
                    {app.name}
                  </Text>
                </CardHeader>
                <CardContent className="app-card__content">
                  {app.thumbnail_url ? (
                    <img
                      src={app.thumbnail_url}
                      alt={`${app.name} thumbnail`}
                      className="app-thumbnail"
                      loading="lazy"
                    />
                  ) : (
                    <div className="app-thumbnail app-thumbnail--empty">
                      <Text as="span" variant="detail">
                        No thumbnail
                      </Text>
                    </div>
                  )}
                  <Text as="p" variant="body-2" className="app-description">
                    {app.description}
                  </Text>
                  <div className="app-tags">
                    {app.tags.length === 0 ? (
                      <Text as="span" variant="detail">
                        No tags
                      </Text>
                    ) : (
                      app.tags.map((tag) => (
                        <Chip key={`${app.id}-${tag}`} size="sm">
                          {tag}
                        </Chip>
                      ))
                    )}
                  </div>
                </CardContent>
                <CardFooter className="app-card__footer">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenInstall(app)}
                  >
                    Install
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(app.url, '_blank', 'noopener')}
                  >
                    Open
                  </Button>
                  {session?.user.id === app.owner_id && (
                    <Button
                      variant="negative"
                      size="sm"
                      onClick={() => handleDeleteApp(app)}
                      disabled={deletingId === app.id}
                    >
                      {deletingId === app.id ? 'Deleting...' : 'Delete'}
                    </Button>
                  )}
                </CardFooter>
                {deleteError?.id === app.id && (
                  <CardFooter>
                    <Text as="p" variant="detail" className="status-error">
                      {deleteError.message}
                    </Text>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      <Divider />

      <section className="submit-section">
        <div className="section-header">
          <Text as="h2" variant="title-1">
            Submit an app
          </Text>
          <Text as="p" variant="detail">
            Share a web app that works great with Even Realities glasses.
          </Text>
        </div>
        <Card>
          <CardContent>
            {session ? (
              <form className="submit-form" onSubmit={handleSubmitApp}>
                <Input
                  placeholder="App name"
                  value={appName}
                  onChange={(event) => setAppName(event.target.value)}
                />
                <Input
                  placeholder="App URL"
                  type="url"
                  value={appUrl}
                  onChange={(event) => setAppUrl(event.target.value)}
                />
                <Textarea
                  placeholder="Short description"
                  value={appDescription}
                  onChange={(event) => setAppDescription(event.target.value)}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={appTags}
                  onChange={(event) => setAppTags(event.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setAppThumbnail(event.target.files?.[0] ?? null)}
                  aria-label="Upload thumbnail"
                />
                <div className="submit-actions">
                  <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit app'}
                  </Button>
                  {formError && (
                    <Text as="p" variant="detail" className="status-error">
                      {formError}
                    </Text>
                  )}
                  {formSuccess && (
                    <Text as="p" variant="detail" className="status-success">
                      {formSuccess}
                    </Text>
                  )}
                </div>
              </form>
            ) : (
              <div className="submit-locked">
                <Text as="p" variant="body-2">
                  Sign in with a magic link to add your own apps.
                </Text>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Text as="p" variant="detail" className="legal-text">
              {legalDisclaimer}
            </Text>
          </CardFooter>
        </Card>
      </section>

      <footer className="app-footer">
        <Text as="p" variant="detail" className="legal-text">
          {legalDisclaimer}
        </Text>
      </footer>

      {selectedApp && (
        <div className="modal-backdrop" onClick={handleCloseInstall}>
          <Card className="modal-card" onClick={(event) => event.stopPropagation()}>
            <CardHeader>
              <Text as="h3" variant="title-2">
                Install {selectedApp.name}
              </Text>
            </CardHeader>
            <CardContent className="modal-content">
              {qrLoading ? (
                <Text as="p" variant="body-2">
                  Generating QR code...
                </Text>
              ) : qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${selectedApp.name}`}
                  className="qr-image"
                />
              ) : (
                <Text as="p" variant="body-2">
                  Unable to generate QR code.
                </Text>
              )}
              <Text as="p" variant="detail" className="qr-url">
                {selectedApp.url}
              </Text>
            </CardContent>
            <CardFooter className="modal-footer">
              <Button variant="default" size="sm" onClick={handleCloseInstall}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(selectedApp.url, '_blank', 'noopener')}
              >
                Open
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;

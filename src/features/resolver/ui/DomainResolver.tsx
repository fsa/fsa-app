import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

interface ResolveResult {
  domain: string;
  ips: string[];
}

interface DomainResolverProps {
  title?: string;
  onResolve?: (result: ResolveResult) => void;
}

const DomainResolver: React.FC<DomainResolverProps> = ({ title, onResolve }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResolveResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractDomain = (input: string): string | null => {
    try {
      const u = new URL(input.startsWith('http') ? input : `https://${input}`);
      return u.hostname;
    } catch {
      return null;
    }
  };

  const resolveDomain = async () => {
    setError(null);
    setResult(null);

    const domain = extractDomain(url);
    if (!domain) {
      setError('Неверный URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();

      if (!data.Answer) {
        throw new Error('IP-адреса не найдены');
      }

      const ips = data.Answer.filter((a: any) => a.type === 1).map((a: any) => a.data);

      const res = { domain, ips };

      setResult(res);

      if (onResolve) {
        onResolve(res);
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при разрешении DNS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '2rem auto', padding: '1rem' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title ?? "DNS Resolver (DoH)"}
        </Typography>

        <TextField
          fullWidth
          label="Введите URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={resolveDomain}
          disabled={loading || !url}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Разрешить'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Card sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1">Домен: {result.domain}</Typography>
            <Typography variant="subtitle2">IPv4 адреса:</Typography>
            <ul>
              {result.ips.map((ip) => (
                <li key={ip}>{ip}</li>
              ))}
            </ul>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export { DomainResolver };

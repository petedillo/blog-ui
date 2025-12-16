import { useState } from 'react';

export default function AdminMediaManagerPage() {
  const [media] = useState<any[]>([]);
  const [loading] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neon-cyan mb-8">Media Manager</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan"></div>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No media uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="bg-surface-dark border border-neon-blue/30 rounded-lg overflow-hidden">
                <img src={item.url} alt={item.filename} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-sm text-text-primary truncate">{item.filename}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

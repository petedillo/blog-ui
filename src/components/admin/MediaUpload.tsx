import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

interface Props {
  postId: number;
  onUploadComplete: () => void;
}

export function MediaUpload({ postId, onUploadComplete }: Props) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('files', file));
      formData.append('postId', String(postId));

      try {
        const response = await fetch('/api/v1/admin/media/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        toast.success(`Uploaded ${acceptedFiles.length} file(s)`);
        onUploadComplete();
      } catch (error) {
        toast.error('Upload failed');
        console.error('Upload error:', error);
      }
    },
    [postId, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
        ${isDragActive ? 'border-neon-cyan bg-neon-cyan/10' : 'border-neon-blue hover:border-neon-cyan'}`}
    >
      <input {...getInputProps()} />
      <p className="text-text-primary">
        {isDragActive ? 'Drop files here' : 'Drag & drop images, or click to select'}
      </p>
      <p className="text-text-secondary text-sm mt-2">
        Max 10MB per file • JPG, PNG, WebP, GIF
      </p>
    </div>
  );
}

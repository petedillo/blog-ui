import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface Media {
  id: number;
  url: string;
  altText: string;
  caption?: string;
  displayOrder: number;
}

interface Props {
  media: Media[];
  postId: number;
  onUpdate: () => void;
}

function SortableMediaItem({ media, onDelete }: { media: Media; onDelete: (id: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: media.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative border border-neon-blue rounded-lg p-2 bg-surface-dark hover:border-neon-cyan transition-colors cursor-move group"
    >
      <img
        src={media.url}
        alt={media.altText}
        className="w-full h-32 object-cover rounded"
        draggable={false}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(media.id);
        }}
        className="absolute top-3 right-3 bg-error/90 hover:bg-error text-white rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {media.caption && (
        <p className="text-xs text-text-secondary mt-1 truncate">{media.caption}</p>
      )}
    </div>
  );
}

export function MediaGallery({ media, postId, onUpdate }: Props) {
  const [items, setItems] = useState(media);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      try {
        const mediaIds = newItems.map((item) => item.id);
        await api.put(`/admin/media/posts/${postId}/reorder`, mediaIds);
        toast.success('Media reordered');
        onUpdate();
      } catch (error) {
        toast.error('Failed to reorder media');
        setItems(items); // Revert on error
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;

    try {
      await api.delete(`/admin/media/${id}`);
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success('Media deleted');
      onUpdate();
    } catch (error) {
      toast.error('Failed to delete media');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-text-secondary py-8">
        No media files yet. Upload some above!
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((m) => m.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((media) => (
            <SortableMediaItem key={media.id} media={media} onDelete={handleDelete} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

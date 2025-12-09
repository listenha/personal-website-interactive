"use client";

import { useState, useMemo } from "react";
import { MusicEntry } from "@/lib/music-types";
import TagFilter from "./TagFilter";
import MusicGrid from "./MusicGrid";

interface MusicPageClientProps {
  entries: MusicEntry[];
  tags: string[];
}

export default function MusicPageClient({ entries: allEntries, tags: allTags }: MusicPageClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    if (!activeTag) return allEntries;
    return allEntries.filter((entry) => entry.tags.includes(activeTag));
  }, [activeTag, allEntries]);

  return (
    <>
      {allTags.length > 0 && (
        <TagFilter
          tags={allTags}
          activeTag={activeTag}
          onTagClick={setActiveTag}
          entries={allEntries}
        />
      )}

      <MusicGrid entries={filteredEntries} timelineOrientation="vertical" />
    </>
  );
}


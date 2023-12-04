'use client';

import { Player } from '@/components/player/player';
import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';

export default function Home() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  return (
    <div className="mx-auto flex h-[100dvh] items-center justify-center">
      <Sidebar isOpen={sideBarIsOpen} handleToggleOpen={setSideBarIsOpen} />
      <Player />
    </div>
  );
}

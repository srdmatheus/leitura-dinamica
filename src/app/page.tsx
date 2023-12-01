'use client';

import { Player } from '@/components/player';
import { SideBar } from '@/components/side-bar';
import { useState } from 'react';

export default function Home() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  return (
    <div className="mx-auto flex h-[100dvh] items-center justify-center">
      <SideBar isOpen={sideBarIsOpen} handleToggleOpen={setSideBarIsOpen} />
      <Player />
    </div>
  );
}

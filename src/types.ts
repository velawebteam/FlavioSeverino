/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  imageUrl: string;
  description: string;
  gallery: string[];
  specs: {
    client?: string;
    area?: string;
    status?: string;
    team?: string;
  };
}

export type View = 'home' | 'about' | 'services' | 'projects' | 'contact';

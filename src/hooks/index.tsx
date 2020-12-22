import React from 'react';

import { AuthProvider } from './auth';

import { ToastProvider } from './toast';
import { TreesProvider } from './trees';
import { SpeciesProvider } from './species';
import { TreeGroupsProvider } from './treesGroups';

const AppProvider: React.FC = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <TreesProvider>
            <SpeciesProvider>
              <TreeGroupsProvider>
                {children}
              </TreeGroupsProvider>
            </SpeciesProvider>
          </TreesProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
};

export default AppProvider;
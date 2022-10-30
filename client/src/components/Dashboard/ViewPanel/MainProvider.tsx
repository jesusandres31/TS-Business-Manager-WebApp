// context
import { PageProvider } from './common/context/PageContext';
import { FilterProvider } from './common/context/FilterContext';
import { CollapsedProvider } from './common/context/CollapsedContext';

interface MainProviderProps {
  children: React.ReactNode;
}

const MainProvider = ({ children }: MainProviderProps) => {
  const renderMainProvider = () => {
    return (
      <PageProvider>
        <CollapsedProvider>
          <FilterProvider>
            <>{children}</>
          </FilterProvider>
        </CollapsedProvider>
      </PageProvider>
    );
  };

  return <>{renderMainProvider()}</>;
};

export default MainProvider;

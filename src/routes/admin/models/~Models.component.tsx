import { useModels } from './~useModels';
import { MODELS_TABLE_HEADER } from './~Models.data';
import AddNewModelModal from '@/features/Admin/Models/AddNewModelModal';
import EditModelModal from '@/features/Admin/Models/EditModelModal';
import Table from '@/components/Table/Table.component';
import TableActions from '@/components/Table/TableActions';
import { H3 } from '@/components/Typography/Typography.component';
import { convertUtcToLocal } from '@/utils/date';
import ErrorPage from '@/components/ErrorPage';
import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { getCountryValue } from '@/utils/common';

export const Models = () => {
  const {
    models,
    isLoading,
    error,
    page,
    isAddModelModalOpen,
    selectedModel,
    addNewModelError,
    editModelError,
    sort,
    total,
    totalPages,
    searchValue,
    setSearchValue,
    onSort,
    setPerPage,
    onDeleteModel,
    setPage,
    handleCreateModel,
    handleUpdateModel,
    setIsAddModelModalOpen,
    setSelectedModel,
    onEditModelClose,
    onAddNewModelClose,
  } = useModels();

  if (error) return <ErrorPage label='Error loading models' />;

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Models</H3>
        </div>

        <div className='w-full h-full overflow-hidden p-6'>
          <Table
            onPerPageChange={setPerPage}
            headers={MODELS_TABLE_HEADER}
            newItemLabel='Add New Model'
            onAddNewItem={() => setIsAddModelModalOpen(true)}
            onSearch={(searchTerm) => setSearchValue(searchTerm)}
            onPageChange={(page) => setPage(page)}
            onSort={onSort}
            inputDelay={500}
            searchValue={searchValue}
            data={models.map((model) => {
              return {
                avatar: (
                  <Avatar
                    src={model.avatar}
                    alt={model.name}
                    initials={getInitials(model.name)}
                  />
                ),
                name: model.name,
                geo: getCountryValue(model.geo),
                about: model.about || 'Empty field...',
                created_by: model.createdBy,
                created_at: convertUtcToLocal(model.createdAt),
                updated_at: convertUtcToLocal(model.updatedAt),
                action: (
                  <TableActions
                    deleteDisabled
                    onDelete={() => onDeleteModel(/* model.id */)} //TODO will change
                    onEdit={() => setSelectedModel(model)}
                  />
                ),
              };
            })}
            sortProps={sort}
            isLoading={isLoading}
            totalPages={totalPages}
            totalItems={total}
            currentPage={page}
          />
        </div>
      </div>

      {isAddModelModalOpen && (
        <AddNewModelModal
          isOpen={isAddModelModalOpen}
          onClose={onAddNewModelClose}
          onSubmit={handleCreateModel}
          errorMessage={addNewModelError}
        />
      )}

      {selectedModel && (
        <EditModelModal
          isOpen={!!selectedModel}
          currentModel={selectedModel}
          errorMessage={editModelError}
          onSubmit={handleUpdateModel}
          onClose={onEditModelClose}
        />
      )}
    </div>
  );
};

export default Models;

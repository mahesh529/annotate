import React from 'react';
import { WorkflowBuilder } from '../../components/WorkflowBuilder';
import { FormBuilder } from '../../components/FormBuilder';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProjectById, updateProject } from '../../api/admin';

export function ProjectBuilder() {
  const { projectId } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId!),
  });

  const { mutate: saveProject } = useMutation({
    mutationFn: updateProject,
    // Add success/error handling
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-4 border-b">Workflow Builder</h2>
          <WorkflowBuilder />
        </div>
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-4 border-b">Form Builder</h2>
          <FormBuilder />
        </div>
      </div>
    </div>
  );
}
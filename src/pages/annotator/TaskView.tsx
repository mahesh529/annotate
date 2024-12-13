import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTaskById, updateTaskAnnotations } from '../../api/annotator';
import { FormPreview } from '../../components/FormBuilder/FormPreview';

export function TaskView() {
  const { taskId } = useParams();
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId!),
  });

  const { mutate: saveAnnotations } = useMutation({
    mutationFn: updateTaskAnnotations,
    // Add success/error handling
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Task Annotation</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Project: {task?.project.name}</h2>
          <p className="text-gray-600">{task?.project.description}</p>
        </div>
        <div className="border-t pt-6">
          <FormPreview
            config={task?.form}
            onSubmit={(data) => saveAnnotations({ taskId: taskId!, annotations: data })}
          />
        </div>
      </div>
    </div>
  );
}
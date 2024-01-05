import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
  IoReorderTwoOutline,
} from "react-icons/io5";
import { Task, TaskStatus } from "../../interfaces";
import { useTaskStore } from "../../stores";

interface Props {
  title: string;
  value: TaskStatus;
  task: Task[];
}

export const JiraTasks = ({ title, task, value }: Props) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const clearDraggingTaskId = useTaskStore(
    (state) => state.clearDraggingTaskId
  );

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("dragover");
  };
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("dragLeave");
  };
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTaskDrop(value);
    console.log("drop", value);
  };

  return (
    <div
      onDragLeave={(e) => onDragOver(e)}
      onDragOver={(e) => onDragLeave(e)}
      onDrop={(e) => onDrop(e)}
      className="!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]"
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {task.map((item) => (
          <div
            onDragStart={() => setDraggingTaskId(item.id)}
            onDragEnd={() => clearDraggingTaskId()}
            draggable
            className="mt-5 flex items-center justify-between p-2"
            key={item.id}
          >
            <div className="flex items-center justify-center gap-2">
              <p className="text-base font-bold text-navy-700">{item.title}</p>
            </div>
            <span className=" h-6 w-6 text-navy-700 cursor-pointer">
              <IoReorderTwoOutline />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
